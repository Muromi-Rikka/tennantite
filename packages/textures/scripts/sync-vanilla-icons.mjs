// Generates packages/textures/src/pixel-icons.generated.ts from the official
// Minecraft Java client jar. Run: pnpm --filter @verdigris/textures sync:icons
import { unzipSync } from "fflate";
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const CLIENT_JAR_URL
  = "https://piston-data.mojang.com/v1/objects/e877b6a07acd633fb3bb475002175cec036e7b87/client.jar";
const CLIENT_JAR_SHA1 = "e877b6a07acd633fb3bb475002175cec036e7b87";

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
  "blaze-powder": ["assets/minecraft/textures/item/blaze_powder.png", 16],
  "charcoal": ["assets/minecraft/textures/item/charcoal.png", 16],
  "crafting-table": ["assets/minecraft/textures/block/crafting_table_front.png", 16],
  "diamond": ["assets/minecraft/textures/item/diamond.png", 16],
  "dirt-block": ["assets/minecraft/textures/block/dirt.png", 16],
  "emerald": ["assets/minecraft/textures/item/emerald.png", 16],
  "experience-bottle": ["assets/minecraft/textures/item/experience_bottle.png", 16],
  "gold-ingot": ["assets/minecraft/textures/item/gold_ingot.png", 16],
  "grass-block": ["assets/minecraft/textures/block/grass_block_side.png", 16],
  "gunpowder": ["assets/minecraft/textures/item/gunpowder.png", 16],
  "heart": ["assets/minecraft/textures/gui/sprites/hud/heart/full.png", 9],
  "heart-empty": ["assets/minecraft/textures/gui/sprites/hud/heart/container.png", 9],
  "heart-half": ["assets/minecraft/textures/gui/sprites/hud/heart/half.png", 9],
  "hunger": ["assets/minecraft/textures/gui/sprites/hud/food_full.png", 9],
  "hunger-empty": ["assets/minecraft/textures/gui/sprites/hud/food_empty.png", 9],
  "hunger-half": ["assets/minecraft/textures/gui/sprites/hud/food_half.png", 9],
  "iron-chestplate": ["assets/minecraft/textures/item/iron_chestplate.png", 16],
  "iron-ingot": ["assets/minecraft/textures/item/iron_ingot.png", 16],
  "iron-ore": ["assets/minecraft/textures/block/iron_ore.png", 16],
  "lapis-lazuli": ["assets/minecraft/textures/item/lapis_lazuli.png", 16],
  "nether-wart": ["assets/minecraft/textures/item/nether_wart.png", 16],
  "netherite-ingot": ["assets/minecraft/textures/item/netherite_ingot.png", 16],
  "oak-planks": ["assets/minecraft/textures/block/oak_planks.png", 16],
  "potion": ["assets/minecraft/textures/item/potion.png", 16],
  "stone-block": ["assets/minecraft/textures/block/stone.png", 16],
  "sword": ["assets/minecraft/textures/item/iron_sword.png", 16],
  "wheat": ["assets/minecraft/textures/item/wheat.png", 16],
};

const OUT = fileURLToPath(new URL("../src/pixel-icons.generated.ts", import.meta.url));
const PNG_SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

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

function readPngSize(png, name) {
  if (png.length < 24) {
    throw new Error(`${name}: PNG too short (${png.length} bytes)`);
  }
  for (const [index, byte] of PNG_SIGNATURE.entries()) {
    if (png[index] !== byte) {
      throw new Error(`${name}: invalid PNG signature`);
    }
  }
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  return { height: view.getUint32(20), width: view.getUint32(16) };
}

const jar = await downloadJar();
const jarSha1 = createHash("sha1").update(jar).digest("hex");
if (jarSha1 !== CLIENT_JAR_SHA1) {
  throw new Error(`client.jar SHA-1 mismatch: expected ${CLIENT_JAR_SHA1}, got ${jarSha1}`);
}

const wanted = new Set(Object.values(ICON_SOURCES).map(([path]) => path));
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

const body = entries
  .map(entry => `  "${entry.name}": "data:image/png;base64,${entry.base64}",`)
  .join("\n");

const VERSION = "26.3";
const content = `// Generated by scripts/sync-vanilla-icons.mjs — DO NOT EDIT.
// Source: Minecraft Java ${VERSION} client.jar (sha1 ${CLIENT_JAR_SHA1})
// Textures © Mojang Synergies AB; see LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @verdigris/textures sync:icons

export const pixelIcons = {
${body}
} as const;

export type PixelIconName = keyof typeof pixelIcons;
`;

writeFileSync(OUT, content, "utf8");

for (const entry of entries) {
  process.stdout.write(
    `${entry.name.padEnd(18)} ${String(entry.bytes).padStart(5)}B sha1=${entry.sha1.slice(0, 12)} ${entry.path}\n`,
  );
}
process.stdout.write(`\n${entries.length} icons → ${OUT}\n`);
