import { unzipSync } from "fflate";
// Generates the Create sprite registry + CSS from one pinned upstream commit.
// Run: pnpm --filter @tennantite/textures sync:create-sprites
//
// The commit is pinned so the generated files are reproducible. `--check`
// re-renders and compares against the committed files.
//
// Create 1.21.1 的 GUI 贴图是少数整图 atlas（256×256，索引色），没有 .mcmeta
// nine_slice/tile 声明——因此整文件入库，组件用 ModSprite 的 src 矩形裁剪。
// 唯一的合成图是 machineBackground：Create 磨石/粉碎机没有上游 Screen 类
// （原版无 GUI，见 MillstoneBlockEntity），按 IC2 machineBackground 先例用
// player_inventory.png 的平整横带拼出 176×166 原版风格机器窗口。
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { pngSize, readPng, writePng } from "./png.mjs";

const COMMIT = "4148fd8d5b05c85d88947edc00fb495a5074f57d";
const ZIP_URL = `https://codeload.github.com/Creators-of-Create/Create/zip/${COMMIT}`;
const ASSET_ROOT = "assets/create/textures/gui/";

// 生成名 → [上游文件名]。atlas 整图入库，键名去下划线走 kebab-case。
const SPRITES = {
  "assemble": "assemble.png",
  "factory-gauge": "factory_gauge.png",
  "filters": "filters.png",
  "filters-2": "filters_2.png",
  "icons": "icons.png",
  "player-inventory": "player_inventory.png",
  "requester": "requester.png",
  "schedule": "schedule.png",
  "schedule-2": "schedule_2.png",
  "schematics": "schematics.png",
  "schematics-2": "schematics_2.png",
  // stock_keeper.png / stock_keeper_categories.png 已核实存在于 pinned 提交。
  "stock-keeper": "stock_keeper.png",
  "stock-keeper-categories": "stock_keeper_categories.png",
  "toolbox": "toolbox.png",
  "value-settings": "value_settings.png",
};

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT_TS = `${ROOT}src/create-sprites.generated.ts`;
const OUT_CSS = `${ROOT}css/create-sprites.generated.css`;
const OUT_TEXTURES = `${ROOT}css/create-textures.css`;

const check = process.argv.includes("--check");

/**
 * source-over 合成；源 alpha 为 0 的像素跳过，越界像素丢弃。
 */
function blit(target, source, dy, sy, height, shouldFlipY = false) {
  for (let row = 0; row < height; row += 1) {
    const ty = dy + row;
    if (ty < 0 || ty >= target.height) {
      continue;
    }
    const syRow = shouldFlipY ? sy + height - 1 - row : sy + row;
    for (let column = 0; column < 176; column += 1) {
      const tx = 0 + column;
      if (tx < 0 || tx >= target.width) {
        continue;
      }
      const sourceIndex = (syRow * source.width + 0 + column) * 4;
      const sourceAlpha = source.rgba[sourceIndex + 3];
      if (sourceAlpha === 0) {
        continue;
      }
      const targetIndex = (ty * target.width + tx) * 4;
      target.rgba.set(source.rgba.subarray(sourceIndex, sourceIndex + 4), targetIndex);
    }
  }
}

function cssVar(name) {
  return `--mc-create-${name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
}

async function download(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return new Uint8Array(await response.arrayBuffer());
    }
    catch (error) {
      lastError = error;
      if (attempt < 4) {
        await new Promise(resolve => setTimeout(resolve, attempt * 500));
      }
    }
  }
  throw new Error(`cannot download ${url}`, { cause: lastError });
}

/**
 * 复刻原版容器窗口（176×166）：player_inventory.png 顶带 + 平整横带平铺 +
 * 倒置顶带收底。player_inventory 的中段烘焙了背包槽框，不能用；顶带 0..3
 * （黑边/白高光/灰面）与其下方 4..11 的平整灰带不含任何槽框。
 */
function machineBackground(playerInventory) {
  const target = { height: 166, rgba: new Uint8Array(176 * 166 * 4), width: 176 };
  blit(target, playerInventory, 0, 0, 4);
  for (let y = 4; y < 162; y += 8) {
    blit(target, playerInventory, y, 4, Math.min(8, 162 - y));
  }
  blit(target, playerInventory, 162, 0, 4, true);
  return target;
}

const zip = await download(ZIP_URL);
const files = unzipSync(zip, {
  filter(file) {
    return file.name.includes(ASSET_ROOT) && file.name.endsWith(".png")
      && Object.values(SPRITES).includes(file.name.slice(file.name.indexOf(ASSET_ROOT) + ASSET_ROOT.length));
  },
});

const sources = new Map();
for (const [name, sprite] of Object.entries(SPRITES)) {
  const fullName = Object.keys(files).find(key => key.endsWith(`/${sprite}`));
  if (!fullName) {
    throw new Error(`missing ${sprite} in upstream zip`);
  }
  sources.set(name, files[fullName]);
}

const images = new Map();
for (const [name, bytes] of sources) {
  images.set(name, readPng(bytes));
}

const composed = {
  "machine-background": machineBackground(images.get("player-inventory")),
};

const entries = [
  ...Object.keys(SPRITES).map((name) => {
    const bytes = sources.get(name);
    const { height, width } = pngSize(bytes);
    return { bytes, height, name, width };
  }),
  ...Object.entries(composed).map(([name, image]) => {
    const bytes = writePng(image.width, image.height, image.rgba);
    return { bytes, height: image.height, name, width: image.width };
  }),
]
  .map(entry => ({
    ...entry,
    base64: Buffer.from(entry.bytes).toString("base64"),
    cssVar: cssVar(entry.name),
    sha256: createHash("sha256").update(entry.bytes).digest("hex"),
  }))
  .toSorted((a, b) => a.name.localeCompare(b.name));

if (entries.length < 8) {
  throw new Error(`expected at least 8 Create sprites, got ${entries.length}`);
}

const metaLines = entries.map(entry => `  ${/^[a-z][\w$]*$/i.test(entry.name) ? entry.name : JSON.stringify(entry.name)}: {
    cssVar: ${JSON.stringify(entry.cssVar)},
    height: ${entry.height},
    sha256: ${JSON.stringify(entry.sha256)},
    width: ${entry.width},
  },`);

const ts = `// Generated by scripts/sync-create-sprites.mjs — DO NOT EDIT.
// Source: Create ${COMMIT} (code MIT; textures/gui assets © The Create Team, all rights reserved).
// See LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @tennantite/textures sync:create-sprites

// Create 1.21.1 GUI 贴图没有 .mcmeta 缩放声明，全部为整图 atlas。
export type CreateSpriteScaling = null;

export interface CreateSpriteMeta {
  cssVar: string;
  height: number;
  sha256: string;
  width: number;
}

export const createSpriteMeta = {
${metaLines.join("\n")}
} as const;

export type CreateSpriteName = keyof typeof createSpriteMeta;
`;

const cssLines = entries.map(
  entry => `  ${entry.cssVar}: url("data:image/png;base64,${entry.base64}");`,
);

const css = `/*
 * Generated by scripts/sync-create-sprites.mjs — DO NOT EDIT.
 * Source: Create ${COMMIT} (code MIT; textures/gui assets © The Create Team, all rights reserved).
 * See LICENSE-ASSETS.md.
 */
:root {
${cssLines.join("\n")}
}
`;

const textures = `/*
 * Create（机械动力）sprite 层。Import after the vanilla sprite CSS.
 * Generated data URIs live in create-sprites.generated.css.
 *
 * Create 的 GUI 贴图是整图 atlas：组件用 ModSprite 的 src 矩形从 atlas 裁剪，
 * 这里只放整图窗口背景与通用基础类。
 */
@import "./create-sprites.generated.css";

.mc-create-sprite {
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

/* ---- 机器窗口（磨石/粉碎机）：player_inventory 平整横带合成图（176×166） ---- */
.mc-create-machine {
  background-image: var(--mc-create-machine-background);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  image-rendering: pixelated;
}

/* ---- Create 通用窗口底色（catnip Window 深灰底，toolbox/筛选器等窗口外围可见） ---- */
.mc-create-window {
  background-color: #373737;
}

/* ---- 数值配置浮层面板（上游 UIRenderHelper.drawStretched 深色半透明底） ---- */
.mc-create-value-panel {
  background-color: rgb(20 20 22 / 0.9);
  box-shadow: 0 0 0 calc(var(--mc-gui) * 2) #565656;
  image-rendering: pixelated;
}

/* ---- 磨石/粉碎机竖向进度条：无上游贴图，照 IC2 先例程序化绘制 ---- */
.mc-create-progress-track {
  background-color: #8b8b8b;
  box-shadow: inset calc(var(--mc-gui) * 1) calc(var(--mc-gui) * 1) 0 0 #373737,
    inset calc(var(--mc-gui) * -1) calc(var(--mc-gui) * -1) 0 0 #ffffff;
  image-rendering: pixelated;
}

.mc-create-progress-fill {
  background-color: #ffeb8c;
  image-rendering: pixelated;
}

/* ---- 数值配置浮层区间条填充（Create 主题高亮色，取样自 toolbox 标题带） ---- */
.mc-create-value-fill {
  background-color: #ffeb8c;
}

/* ---- 数值配置浮层区间条轨道：value_settings.png (7,0) 249×8 ---- */
.mc-create-value-track {
  background-image: var(--mc-create-value-settings);
  background-position: calc(var(--mc-gui) * -7) 0;
  background-repeat: no-repeat;
  background-size: calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256);
  image-rendering: pixelated;
}
`;

if (check) {
  let isStale = false;
  for (const [file, expected] of [
    [OUT_TS, ts],
    [OUT_CSS, css],
    [OUT_TEXTURES, textures],
  ]) {
    let actual = "";
    try {
      actual = readFileSync(file, "utf8");
    }
    catch {
      isStale = true;
      continue;
    }
    if (actual === expected) {
      continue;
    }
    isStale = true;
    console.error(`out of date: ${file}`);
  }
  if (isStale) {
    process.exit(1);
  }
  console.log(`Create sprites up to date (${entries.length})`);
}
else {
  writeFileSync(OUT_TS, ts);
  writeFileSync(OUT_CSS, css);
  writeFileSync(OUT_TEXTURES, textures);
  console.log(`wrote ${entries.length} Create sprites`);
}
