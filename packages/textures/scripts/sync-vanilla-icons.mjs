// Generates packages/textures/src/pixel-icons.generated.ts and
// src/block-icons.generated.ts from the official Minecraft Java client jar.
// Run: pnpm --filter @tennantite/textures sync:icons
//
// 平面精灵（gui/item 贴图）原样入库；方块贴成"等轴三可见面"入库——原版物品渲染
// 用 block/block.json 的 gui display（rotateX 30° · rotateY 225° · scale 0.625），
// 逐面亮度取 Direction.getShade()：顶 1.0、north/south 0.8、east/west 0.6。
// 故可见的 +Y/+X/-Z 三面分别按 1.0 / 0.6 / 0.8 乘算，与客户端逐字节一致。
//
// `--check` 重新生成并与已提交文件比较，供 verify:assets 使用。
import { unzipSync } from "fflate";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { pngSize, readPng, writePng } from "./png.mjs";

const CLIENT_JAR_URL
  = "https://piston-data.mojang.com/v1/objects/e877b6a07acd633fb3bb475002175cec036e7b87/client.jar";
const CLIENT_JAR_SHA1 = "e877b6a07acd633fb3bb475002175cec036e7b87";
const TEXTURE_ROOT = "assets/minecraft/textures/";

/**
 * key → [client.jar path, expected square size]
*/
const ICON_SOURCES = {
  "air": ["assets/minecraft/textures/gui/sprites/hud/air.png", 9],
  "air-empty": ["assets/minecraft/textures/gui/sprites/hud/air_empty.png", 9],
  "apple": ["assets/minecraft/textures/item/apple.png", 16],
  "armor": ["assets/minecraft/textures/gui/sprites/hud/armor_full.png", 9],
  "armor-empty": ["assets/minecraft/textures/gui/sprites/hud/armor_empty.png", 9],
  "armor-half": ["assets/minecraft/textures/gui/sprites/hud/armor_half.png", 9],
  "baked-potato": ["assets/minecraft/textures/item/baked_potato.png", 16],
  "blaze-powder": ["assets/minecraft/textures/item/blaze_powder.png", 16],
  "blue-dye": ["assets/minecraft/textures/item/blue_dye.png", 16],
  "bone": ["assets/minecraft/textures/item/bone.png", 16],
  "bone-meal": ["assets/minecraft/textures/item/bone_meal.png", 16],
  "bowl": ["assets/minecraft/textures/item/bowl.png", 16],
  "bread": ["assets/minecraft/textures/item/bread.png", 16],
  "brown-mushroom": ["assets/minecraft/textures/block/brown_mushroom.png", 16],
  "charcoal": ["assets/minecraft/textures/item/charcoal.png", 16],
  "clay-ball": ["assets/minecraft/textures/item/clay_ball.png", 16],
  "coal": ["assets/minecraft/textures/item/coal.png", 16],
  "copper-ingot": ["assets/minecraft/textures/item/copper_ingot.png", 16],
  "diamond": ["assets/minecraft/textures/item/diamond.png", 16],
  "diamond-chestplate": ["assets/minecraft/textures/item/diamond_chestplate.png", 16],
  "emerald": ["assets/minecraft/textures/item/emerald.png", 16],
  "experience-bottle": ["assets/minecraft/textures/item/experience_bottle.png", 16],
  "filled-map": ["assets/minecraft/textures/item/filled_map.png", 16],
  "flint": ["assets/minecraft/textures/item/flint.png", 16],
  "glass-bottle": ["assets/minecraft/textures/item/glass_bottle.png", 16],
  "gold-ingot": ["assets/minecraft/textures/item/gold_ingot.png", 16],
  "gunpowder": ["assets/minecraft/textures/item/gunpowder.png", 16],
  "heart": ["assets/minecraft/textures/gui/sprites/hud/heart/full.png", 9],
  "heart-empty": ["assets/minecraft/textures/gui/sprites/hud/heart/container.png", 9],
  "heart-half": ["assets/minecraft/textures/gui/sprites/hud/heart/half.png", 9],
  "honeycomb": ["assets/minecraft/textures/item/honeycomb.png", 16],
  "hunger": ["assets/minecraft/textures/gui/sprites/hud/food_full.png", 9],
  "hunger-empty": ["assets/minecraft/textures/gui/sprites/hud/food_empty.png", 9],
  "hunger-half": ["assets/minecraft/textures/gui/sprites/hud/food_half.png", 9],
  "iron-chestplate": ["assets/minecraft/textures/item/iron_chestplate.png", 16],
  "iron-horse-armor": ["assets/minecraft/textures/item/iron_horse_armor.png", 16],
  "iron-ingot": ["assets/minecraft/textures/item/iron_ingot.png", 16],
  "lapis-lazuli": ["assets/minecraft/textures/item/lapis_lazuli.png", 16],
  "mushroom-stew": ["assets/minecraft/textures/item/mushroom_stew.png", 16],
  "nether-wart": ["assets/minecraft/textures/item/nether_wart.png", 16],
  "netherite-chestplate": ["assets/minecraft/textures/item/netherite_chestplate.png", 16],
  "netherite-ingot": ["assets/minecraft/textures/item/netherite_ingot.png", 16],
  "netherite-upgrade-smithing-template": ["assets/minecraft/textures/item/netherite_upgrade_smithing_template.png", 16],
  "paper": ["assets/minecraft/textures/item/paper.png", 16],
  "potato": ["assets/minecraft/textures/item/potato.png", 16],
  "potion": ["assets/minecraft/textures/item/potion.png", 16],
  "red-mushroom": ["assets/minecraft/textures/block/red_mushroom.png", 16],
  "redstone": ["assets/minecraft/textures/item/redstone.png", 16],
  "saddle": ["assets/minecraft/textures/item/saddle.png", 16],
  "sugar-cane": ["assets/minecraft/textures/item/sugar_cane.png", 16],
  "sword": ["assets/minecraft/textures/item/iron_sword.png", 16],
  "wheat": ["assets/minecraft/textures/item/wheat.png", 16],
  "wheat-seeds": ["assets/minecraft/textures/item/wheat_seeds.png", 16],
};

/**
 * 原版默认（plains）草方块色
*/
const GRASS_TINT = "#91bd59";
/**
 * 面槽 → Direction.getShade()：左 = +X(east)、右 = -Z(north)、顶 = +Y
*/
const FACE_SHADE = { left: 0.6, right: 0.8, top: 1 };

function blockTexture(name) {
  return `${TEXTURE_ROOT}block/${name}.png`;
}

/**
 * 六面同贴图
*/
function uniform(path) {
  return { left: { path }, right: { path }, top: { path } };
}

/**
 * 草方块侧面：泥土底 + 按温度着色的 overlay
*/
const GRASS_SIDE = {
  overlay: blockTexture("grass_block_side_overlay"),
  path: blockTexture("grass_block_side"),
  tint: GRASS_TINT,
};

/**
 * 方块名 → 三可见面。面描述：{ path, tint?, overlay? }
 * 蘑菇是 cross 模型，原版就是平面渲染，留在 ICON_SOURCES。
 */
const BLOCK_SOURCES = {
  "crafting-table": {
    left: { path: blockTexture("crafting_table_side") },
    right: { path: blockTexture("crafting_table_front") },
    top: { path: blockTexture("crafting_table_top") },
  },
  "dirt-block": uniform(blockTexture("dirt")),
  "grass-block": {
    left: GRASS_SIDE,
    right: GRASS_SIDE,
    top: { path: blockTexture("grass_block_top"), tint: GRASS_TINT },
  },
  "gravel": uniform(blockTexture("gravel")),
  "ice": uniform(blockTexture("ice")),
  "iron-block": uniform(blockTexture("iron_block")),
  "iron-ore": uniform(blockTexture("iron_ore")),
  "oak-log": {
    left: { path: blockTexture("oak_log") },
    right: { path: blockTexture("oak_log") },
    top: { path: blockTexture("oak_log_top") },
  },
  "oak-planks": uniform(blockTexture("oak_planks")),
  "sand": uniform(blockTexture("sand")),
  "stone-block": uniform(blockTexture("stone")),
  "stone-bricks": uniform(blockTexture("stone_bricks")),
};

const FACES = ["left", "right", "top"];

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT_FLAT = `${ROOT}src/pixel-icons.generated.ts`;
const OUT_BLOCKS = `${ROOT}src/block-icons.generated.ts`;
const PNG_SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];
const check = process.argv.includes("--check");

/**
 * 烘焙一个可见面；无需改动时直接复用 jar 原始字节
 *
 * @throws {Error} 贴图缺失、尺寸非 16×16 或烘焙后全透明
*/
function bakeFace(face, slot, files) {
  const png = files[face.path];
  if (!png) {
    throw new Error(`unknown texture path: ${face.path}`);
  }
  const image = readPng(png);
  if (image.width !== 16 || image.height !== 16) {
    throw new Error(`${face.path}: expected 16×16, got ${image.width}×${image.height}`);
  }
  if (!face.tint && !face.overlay && FACE_SHADE[slot] === 1) {
    return { bytes: Buffer.from(png), image };
  }
  if (face.tint) {
    tint(image, face.tint);
  }
  if (face.overlay) {
    const overlayPng = files[face.overlay];
    if (!overlayPng) {
      throw new Error(`unknown texture path: ${face.overlay}`);
    }
    const overlayImage = readPng(overlayPng);
    if (overlayImage.width !== 16 || overlayImage.height !== 16) {
      throw new Error(`${face.overlay}: expected 16×16, got ${overlayImage.width}×${overlayImage.height}`);
    }
    over(image, face.tint ? tint(overlayImage, face.tint) : overlayImage);
  }
  if (FACE_SHADE[slot] !== 1) {
    shade(image, FACE_SHADE[slot]);
  }
  const isOpaque = image.rgba.some((value, index) => index % 4 === 3 && value !== 0);
  if (!isOpaque) {
    throw new Error(`${face.path}: baked face is fully transparent`);
  }
  return { bytes: writePng(image.width, image.height, image.rgba), image };
}

async function downloadJar() {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const response = await fetch(CLIENT_JAR_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return new Uint8Array(await response.arrayBuffer());
    }
    catch (error) {
      lastError = error;
      process.stderr.write(
        `download attempt ${attempt} failed: ${error instanceof Error ? error.message : String(error)}\n`,
      );
    }
  }
  throw new Error(`cannot download ${CLIENT_JAR_URL}`, { cause: lastError });
}

function meanLuminance({ rgba }) {
  let total = 0;
  let weight = 0;
  for (let index = 0; index < rgba.length; index += 4) {
    const alpha = rgba[index + 3] / 255;
    if (alpha === 0) {
      continue;
    }
    total += alpha * (0.212_6 * rgba[index] + 0.715_2 * rgba[index + 1] + 0.072_2 * rgba[index + 2]);
    weight += alpha;
  }
  return weight === 0 ? 0 : total / weight;
}

/**
 * source-over 合成，`target` 为底层
*/
function over(target, source) {
  const destination = target.rgba;
  const top = source.rgba;
  for (let index = 0; index < destination.length; index += 4) {
    const topAlpha = top[index + 3] / 255;
    if (topAlpha === 0) {
      continue;
    }
    const bottomAlpha = destination[index + 3] / 255;
    const alpha = topAlpha + bottomAlpha * (1 - topAlpha);
    for (let channel = 0; channel < 3; channel += 1) {
      destination[index + channel] = Math.round(
        (top[index + channel] * topAlpha + destination[index + channel] * bottomAlpha * (1 - topAlpha)) / alpha,
      );
    }
    destination[index + 3] = Math.round(alpha * 255);
  }
  return target;
}

function readPngSize(png, name) {
  if (png.length < 24) {
    throw new Error(`${name}: PNG too short (${png.length} bytes)`);
  }
  for (const [index, byte] of PNG_SIGNATURE.entries()) {
    if (png[index] !== byte) {
      throw new Error(`${name}: invalid PNG signature`);
    }
  }
  return pngSize(png);
}

/**
 * 逐面亮度（Direction.getShade()），alpha 不变
*/
function shade(image, factor) {
  const { rgba } = image;
  for (let index = 0; index < rgba.length; index += 4) {
    for (let channel = 0; channel < 3; channel += 1) {
      rgba[index + channel] = Math.round(rgba[index + channel] * factor);
    }
  }
  return image;
}

/**
 * 乘法着色（原版顶点色 × 纹理），alpha 不变
*/
function tint(image, hex) {
  const channels = [1, 3, 5].map(index => Number.parseInt(hex.slice(index, index + 2), 16));
  const { rgba } = image;
  for (let index = 0; index < rgba.length; index += 4) {
    for (let channel = 0; channel < 3; channel += 1) {
      rgba[index + channel] = Math.round((rgba[index + channel] * channels[channel]) / 255);
    }
  }
  return image;
}

const jar = await downloadJar();
const jarSha1 = createHash("sha1").update(jar).digest("hex");
if (jarSha1 !== CLIENT_JAR_SHA1) {
  throw new Error(`client.jar SHA-1 mismatch: expected ${CLIENT_JAR_SHA1}, got ${jarSha1}`);
}

const wanted = new Set(Object.values(ICON_SOURCES).map(([path]) => path));
for (const faces of Object.values(BLOCK_SOURCES)) {
  for (const face of Object.values(faces)) {
    wanted.add(face.path);
    if (face.overlay) {
      wanted.add(face.overlay);
    }
  }
}
const files = unzipSync(jar, { filter: file => wanted.has(file.name) });

const errors = [];
const entries = [];

for (const [name, [path, expected]] of Object.entries(ICON_SOURCES)) {
  const png = files[path];
  if (!png) {
    errors.push(`${name}: missing ${path}`);
    continue;
  }
  const { height, width } = readPngSize(png, name);
  if (width !== expected || height !== expected) {
    errors.push(`${name}: expected ${expected}×${expected}, got ${width}×${height} (${path})`);
    continue;
  }
  entries.push({
    base64: Buffer.from(png).toString("base64"),
    bytes: png.length,
    name,
    path,
    sha1: createHash("sha1").update(png).digest("hex"),
  });
}

if (errors.length > 0) {
  throw new Error(`icon extraction failed:\n${errors.join("\n")}`);
}

const blockEntries = Object.entries(BLOCK_SOURCES)
  .map(([name, faces]) => {
    const baked = {};
    for (const slot of FACES) {
      baked[slot] = bakeFace(faces[slot], slot, files);
    }
    if (faces.left.path === faces.right.path) {
      const ratio = meanLuminance(baked.left.image) / meanLuminance(baked.right.image);
      if (Math.abs(ratio - 0.75) > 0.01) {
        throw new Error(`${name}: left/right shade ratio ${ratio.toFixed(4)}, expected 0.75`);
      }
    }
    return { baked, name };
  })
  .toSorted((left, right) => left.name.localeCompare(right.name));

if (blockEntries.length !== 12) {
  throw new Error(`expected 12 block icons, got ${blockEntries.length}`);
}

const body = entries
  .map(entry => `  "${entry.name}": "data:image/png;base64,${entry.base64}",`)
  .join("\n");

const VERSION = "26.3";

const flatContent = `// Generated by scripts/sync-vanilla-icons.mjs — DO NOT EDIT.
// Source: Minecraft Java ${VERSION} client.jar (sha1 ${CLIENT_JAR_SHA1})
// Textures © Mojang Synergies AB; see LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @tennantite/textures sync:icons

export const pixelIcons = {
${body}
} as const;

export type FlatIconName = keyof typeof pixelIcons;
`;

const blockBody = blockEntries
  .map(
    entry => `  ${JSON.stringify(entry.name)}: {
${FACES.map(slot => `    ${slot}: "data:image/png;base64,${entry.baked[slot].bytes.toString("base64")}",`).join("\n")}
  },`,
  )
  .join("\n");

const blockContent = `// Generated by scripts/sync-vanilla-icons.mjs — DO NOT EDIT.
// Source: Minecraft Java ${VERSION} client.jar (sha1 ${CLIENT_JAR_SHA1})
// 原版物品渲染烘焙：顶面 shade 1.0 / 左面 +X(east) 0.6 / 右面 -Z(north) 0.8。
// Textures © Mojang Synergies AB; see LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @tennantite/textures sync:icons

export const blockFaces = {
${blockBody}
} as const;

export type BlockIconName = keyof typeof blockFaces;
`;

if (check) {
  let isStale = false;
  for (const [file, content] of [[OUT_FLAT, flatContent], [OUT_BLOCKS, blockContent]]) {
    let current = null;
    try {
      current = readFileSync(file, "utf8");
    }
    catch {
      current = null;
    }
    if (current === content) {
      continue;
    }

    process.stderr.write(`out of date: ${file}\n`);
    isStale = true;
  }
  if (isStale) {
    process.exit(1);
  }
  process.stdout.write("vanilla icons up to date\n");
}
else {
  writeFileSync(OUT_FLAT, flatContent, "utf8");
  writeFileSync(OUT_BLOCKS, blockContent, "utf8");

  for (const entry of entries) {
    process.stdout.write(
      `${entry.name.padEnd(18)} ${String(entry.bytes).padStart(5)}B sha1=${entry.sha1.slice(0, 12)} ${entry.path}\n`,
    );
  }
  for (const entry of blockEntries) {
    const bytes = FACES.map(slot => entry.baked[slot].bytes.length);
    process.stdout.write(
      `${entry.name.padEnd(18)} 3 faces ${bytes.map(size => `${size}B`).join(" / ")}\n`,
    );
  }
  process.stdout.write(`\n${entries.length} icons → ${OUT_FLAT}\n`);
  process.stdout.write(`${blockEntries.length} blocks × ${FACES.length} faces → ${OUT_BLOCKS}\n`);
}
