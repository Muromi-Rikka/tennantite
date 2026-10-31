/**
 * shadcn registry 生成器。
 * 产出：
 * 1. registry/registry.json：全量索引（@tennantite/ui + 各 mod 包），供目录/文档引用。
 * 2. apps/website/public/r/<name>.json：核心组件（primitives/containers/screens 各组）的可安装
 *    registry item，shadcn CLI 经 namespace registry `https://tennantite.pages.dev/r/{name}.json`
 *    或直接 URL 消费。mod 包组件保持 npm 安装模式，不进入拷贝范围。
 * 运行：node registry/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const REGISTRY_ITEM_SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";

/**
 * 拷贝范围：ui 包内 5 组组件目录（每组件一目录，index.tsx 为入口）。
 */
const copyGroups = [
  "primitives",
  "containers",
  "screens/containers",
  "screens/hud",
  "screens/menus",
];

/**
 * mod 包分组（仅进 registry.json 索引，不改写）。
 */
const indexOnlyGroups = [
  ["packages/mods-core/src/shared", ""],
  ["packages/mekanism/src", ""],
  ["packages/ic2/src", ""],
  ["packages/ae2/src", ""],
  ["packages/create/src", ""],
  ["packages/thermal/src", ""],
  ["packages/ie/src", ""],
  ["packages/enderio/src", ""],
  ["packages/industrialforegoing/src", ""],
  ["packages/farmersdelight/src", ""],
];

const copyRoot = path.join(root, "packages/ui/src");

/**
 * 共享 lib item：多组件共用的基础文件，target 统一进 components/tennantite/lib/。
 * name → { source, target }
 */
const sharedItems = [
  { name: "tennantite-utils", source: "lib/utils.ts", target: "lib/tennantite-utils.ts" },
  { name: "screen-types", source: "screens/containers/types.ts", target: "lib/screen-types.ts" },
  { name: "screen-parts", source: "screens/containers/screen-parts.tsx", target: "lib/screen-parts.tsx" },
  { name: "screen-slot", source: "screens/containers/screen-slot.tsx", target: "lib/screen-slot.tsx" },
];

/**
 * 源文件绝对路径 → 归属 item 的导入别名（`@/components/tennantite/...`）。
 * 目录型组件用目录名，共享文件用 lib/<basename>。
 */
const fileOwner = new Map();

function registerCopyFiles() {
  for (const group of copyGroups) {
    const groupDir = path.join(copyRoot, group);
    for (const entry of fs.readdirSync(groupDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const componentDir = path.join(groupDir, entry.name);
      if (!fs.existsSync(path.join(componentDir, "index.tsx"))) {
        continue;
      }
      for (const file of collectFiles(componentDir)) {
        fileOwner.set(file, `@/components/tennantite/${entry.name}`);
      }
    }
  }
  for (const shared of sharedItems) {
    fileOwner.set(path.join(copyRoot, shared.source), `@/components/tennantite/${shared.target.replace(/\.tsx?$/, "")}`);
  }
}

function collectFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter(
      file =>
        file !== "index.test.tsx"
        && file !== "demo.tsx"
        && (file.endsWith(".tsx") || file.endsWith(".ts")),
    )
    .map(file => path.join(dir, file));
}

const importPattern = /(from\s*)(["'])(\.\.?\/[^"']+)\2/g;

function stripIndexSuffix(specifier) {
  return specifier.replace(/\/index$/, "");
}

/**
 * 解析相对导入到真实文件；返回 null 表示解析失败。
 */
function resolveRelative(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
  return candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) ?? null;
}

const errors = [];

/**
 * 导入改写：相对导入指向自身目录内保持不变；否则改写为归属 item 的别名。
 * 失败记录错误（防止静默产出坏 item）。
 */
function rewriteContent(sourceFile, content, selfDir) {
  return content.replace(importPattern, (match, from, quote, specifier) => {
    const resolved = resolveRelative(sourceFile, specifier);
    if (!resolved) {
      errors.push(`${sourceFile}: 无法解析相对导入 "${specifier}"`);
      return match;
    }
    if (resolved.startsWith(selfDir + path.sep)) {
      return match;
    }
    const owner = fileOwner.get(resolved);
    if (!owner) {
      errors.push(`${sourceFile}: 相对导入 "${specifier}" 指向拷贝范围外的文件 ${path.relative(root, resolved)}`);
      return match;
    }
    return `${from}${quote}${stripIndexSuffix(owner)}${quote}`;
  });
}

/**
 * 依赖推断：基础依赖 + 共享 lib（cn/gui）+ 纹理资产包。
 */
function inferDependencies(content) {
  const dependencies = new Set();
  if (content.includes("@base-ui/react")) {
    dependencies.add("@base-ui/react");
  }
  if (content.includes("class-variance-authority")) {
    dependencies.add("class-variance-authority");
  }
  if (content.includes("cn(") || content.includes("tennantite-utils")) {
    dependencies.add("cn");
  }
  if (content.includes("@tennantite/textures")) {
    dependencies.add("@tennantite/textures");
  }
  return [...dependencies].sort();
}

function titleCase(name) {
  return name
    .split("-")
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

registerCopyFiles();

// ---------------------------------------------------------------------------
// 拷贝范围 item（primitives/containers/screens 各组 + 共享 lib）
// ---------------------------------------------------------------------------
const copyRegistryItems = [];

// base item：首次 add 任一组件时一并装上两个 L0 资产包。
// 注意：registry:style 类型会被 CLI 解析到官方 styles 目录而非本 registry，因此用 registry:component。
copyRegistryItems.push({
  $schema: REGISTRY_ITEM_SCHEMA,
  dependencies: ["@tennantite/tokens", "@tennantite/textures"],
  files: [
    {
      content: [
        "/* @tennantite base：L0 资产包 @tennantite/tokens 与 @tennantite/textures 已随本条目作为 npm 依赖安装。",
        " * 在 Tailwind 入口 CSS 中按顺序引入：",
        " *   @import \"tailwindcss\";",
        " *   @import \"@tennantite/tokens/css/tokens.css\";",
        " *   @import \"@tennantite/textures/css/textures.css\";",
        " * 让 Tailwind 扫描拷贝的组件目录：",
        " *   @source \"../../components/tennantite\";（路径相对当前 CSS 文件）",
        " */",
        "",
        ":root {",
        "  --mc-scale: 2;",
        "}",
      ].join("\n"),
      path: "registry/base/base.css",
      target: "components/tennantite/base.css",
      type: "registry:component",
    },
  ],
  name: "tennantite-base",
  registryDependencies: [],
  title: "Tennantite Base",
  type: "registry:component",
});

for (const shared of sharedItems) {
  const sourceFile = path.join(copyRoot, shared.source);
  const content = rewriteContent(sourceFile, fs.readFileSync(sourceFile, "utf8"), path.dirname(sourceFile));
  // 共享 lib 同目录内的兄弟共享文件（如 screen-slot 引 ./types）改写为 lib 内的邻居文件名。
  const rewritten = content.replace(
    /(from\s*)(["'])\.\/(types|screen-slot|screen-parts|utils)\2/g,
    (match, from, quote, name) => {
      const sibling = sharedItems.find(item => path.basename(item.source) === `${name}.ts` || path.basename(item.source) === `${name}.tsx`);
      if (!sibling) {
        return match;
      }
      return `${from}${quote}./${path.basename(sibling.target, path.extname(sibling.target))}${quote}`;
    },
  );
  copyRegistryItems.push({
    $schema: REGISTRY_ITEM_SCHEMA,
    dependencies: inferDependencies(rewritten),
    files: [{ content: rewritten, path: `packages/ui/src/${shared.source}`, target: `components/tennantite/${shared.target}`, type: "registry:component" }],
    name: shared.name,
    registryDependencies: [],
    title: titleCase(shared.name),
    type: "registry:component",
  });
}

for (const group of copyGroups) {
  const groupDir = path.join(copyRoot, group);
  for (const entry of fs.readdirSync(groupDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }
    const componentDir = path.join(groupDir, entry.name);
    if (!fs.existsSync(path.join(componentDir, "index.tsx"))) {
      continue;
    }
    const files = collectFiles(componentDir).map(file => ({
      content: rewriteContent(file, fs.readFileSync(file, "utf8"), componentDir),
      path: path.relative(root, file).replaceAll("\\", "/"),
      // 保留组件目录结构，维持 ./types、./styles 相对导入可用
      target: `components/tennantite/${entry.name}/${path.basename(file)}`,
      type: "registry:component",
    }));
    // index.tsx 是入口，排在首位
    files.sort((a, b) => (a.target.endsWith("index.tsx") ? -1 : (b.target.endsWith("index.tsx") ? 1 : 0)));
    const content = files.map(file => file.content).join("\n");
    const registryDependencies = new Set(["@tennantite/tennantite-base"]);
    for (const owner of content.matchAll(/@\/components\/tennantite\/(?:lib\/)?([\w-]+)/g)) {
      const ownerName = owner[1];
      if (ownerName !== entry.name && ownerName !== "index") {
        // 未限定名称会被 CLI 解析到官方 registry，跨 item 依赖必须带 namespace
        registryDependencies.add(`@tennantite/${ownerName}`);
      }
    }
    copyRegistryItems.push({
      $schema: REGISTRY_ITEM_SCHEMA,
      dependencies: inferDependencies(content),
      files,
      name: entry.name,
      registryDependencies: [...registryDependencies].sort(),
      title: titleCase(entry.name),
      type: "registry:component",
    });
  }
}

// ---------------------------------------------------------------------------
// 全量索引 registry.json（mod 包维持现状结构不改）
// ---------------------------------------------------------------------------
function inferIndexDependencies(source) {
  const dependencies = [];
  if (source.includes("@base-ui/react")) {
    dependencies.push("@base-ui/react");
  }
  if (source.includes("class-variance-authority")) {
    dependencies.push("class-variance-authority");
  }
  if (source.includes("cn(")) {
    dependencies.push("cn");
  }
  return dependencies;
}

const indexItems = [];
for (const [groupRoot, group] of [
  ...copyGroups.map(group => ["packages/ui/src", group]),
  ...indexOnlyGroups,
]) {
  const groupDir = path.join(root, groupRoot, group);
  const entries = fs.existsSync(groupDir)
    ? fs.readdirSync(groupDir, { withFileTypes: true })
    : [];
  for (const entry of entries.filter(candidate => candidate.isDirectory())) {
    const componentDir = path.join(groupDir, entry.name);
    const indexFile = path.join(componentDir, "index.tsx");
    if (!fs.existsSync(indexFile)) {
      continue;
    }
    const source = fs.readFileSync(indexFile, "utf8");
    const siblings = fs
      .readdirSync(componentDir)
      .filter(
        file =>
          file !== "index.test.tsx"
          && file !== "demo.tsx"
          && (file.endsWith(".tsx") || file.endsWith(".ts")),
      );
    const files = siblings.map(file => ({
      path: path.join(groupRoot, group, entry.name, file).replaceAll("\\", "/"),
      type: "registry:component",
    }));
    files.sort((a, b) => (a.path.endsWith("index.tsx") ? -1 : (b.path.endsWith("index.tsx") ? 1 : 0)));
    indexItems.push({
      $schema: REGISTRY_ITEM_SCHEMA,
      dependencies: inferIndexDependencies(source),
      files,
      name: entry.name,
      registryDependencies: [],
      title: titleCase(entry.name),
      type: "registry:component",
    });
  }
}

if (errors.length > 0) {
  process.stderr.write(`registry build failed:\n${[...new Set(errors)].map(error => `  - ${error}`).join("\n")}\n`);
  process.exit(1);
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  homepage: "https://github.com/Muromi-Rikka/verdigris",
  items: indexItems,
  name: "tennantite",
};

const outFile = path.join(root, "registry", "registry.json");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(registry, null, 2)}\n`);
process.stdout.write(`registry.json written: ${indexItems.length} items\n`);

const rDir = path.join(root, "apps/website/public/r");
fs.rmSync(rDir, { force: true, recursive: true });
fs.mkdirSync(rDir, { recursive: true });
for (const item of copyRegistryItems) {
  fs.writeFileSync(
    path.join(rDir, `${item.name}.json`),
    `${JSON.stringify({ $schema: REGISTRY_ITEM_SCHEMA, ...item }, null, 2)}\n`,
  );
}
process.stdout.write(`public/r written: ${copyRegistryItems.length} installable items\n`);
