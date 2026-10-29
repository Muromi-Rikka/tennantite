/**
 * shadcn registry 生成器（规格 §1 registry/，标注可选，最小可用实现）
 * 产出 registry/registry.json：覆盖 @tennantite/ui 与各 mod 包全部组件目录。
 * 运行：node registry/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * 依赖推断：组件源码中出现的基础依赖
*/
function inferDependencies(source) {
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

const groups = [
  ["packages/ui/src", "primitives", "registry:component"],
  ["packages/ui/src", "containers", "registry:component"],
  ["packages/ui/src", "screens/containers", "registry:component"],
  ["packages/ui/src", "screens/hud", "registry:component"],
  ["packages/ui/src", "screens/menus", "registry:component"],
  ["packages/mods-core/src/shared", "", "registry:component"],
  ["packages/mekanism/src", "", "registry:component"],
  ["packages/ic2/src", "", "registry:component"],
  ["packages/ae2/src", "", "registry:component"],
  ["packages/create/src", "", "registry:component"],
  ["packages/thermal/src", "", "registry:component"],
  ["packages/ie/src", "", "registry:component"],
  ["packages/enderio/src", "", "registry:component"],
];

const items = [];
for (const [groupRoot, group, type] of groups) {
  const groupDir = path.join(root, groupRoot, group);
  const entries = fs.existsSync(groupDir)
    ? fs.readdirSync(groupDir, { withFileTypes: true })
    : [];
  const componentDirs = entries.filter(entry => entry.isDirectory());
  for (const entry of componentDirs) {
    const componentDir = path.join(groupDir, entry.name);
    const indexFile = path.join(componentDir, "index.tsx");
    if (!fs.existsSync(indexFile)) {
      continue;
    }
    const source = fs.readFileSync(indexFile, "utf8");
    // 组件内部相对导入的兄弟文件一并打包
    const siblings = fs
      .readdirSync(componentDir)
      .filter(
        file =>
          file !== "index.test.tsx"
          && file !== "demo.tsx"
          && (file.endsWith(".tsx") || file.endsWith(".ts")),
      );
    const files = siblings.map(file => ({
      path: path
        .join(groupRoot, group, entry.name, file)
        .replaceAll("\\", "/"),
      type,
    }));
    // index.tsx 是入口，排在首位
    files.sort((a, b) =>
      a.path.endsWith("index.tsx") ? -1 : (b.path.endsWith("index.tsx") ? 1 : 0),
    );
    items.push({
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      dependencies: inferDependencies(source),
      files,
      name: entry.name,
      registryDependencies: [],
      title: entry.name
        .split("-")
        .map(part => part[0].toUpperCase() + part.slice(1))
        .join(" "),
      type,
    });
  }
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  homepage: "https://github.com/Muromi-Rikka/verdigris",
  items,
  name: "tennantite",
};

const outFile = path.join(root, "registry", "registry.json");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(registry, null, 2)}\n`);
process.stdout.write(`registry.json written: ${items.length} items\n`);
