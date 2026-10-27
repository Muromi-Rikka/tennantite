/* eslint-disable unicorn/no-array-sort, unicorn/no-declarations-before-early-exit */
// Generates the GUI sprite registry + CSS from the Resource Pack Creator GUI
// texture catalogue. Run: pnpm --filter @verdigris/textures sync:gui-sprites
//
// The generated files are committed so builds and runtime never touch the
// network. `--check` re-renders and compares against the committed files.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const MANIFEST_URL = "https://resourcepackcreator.com/texture-manifest.json";
const TEXTURE_BASE = "https://resourcepackcreator.com/textures/gui/";
const ICON_BASE = "https://resourcepackcreator.com/textures/";
const EXPECTED_VERSION = "26.4-snapshot-3";
const CONCURRENCY = 12;
const PNG_SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT_TS = `${ROOT}src/gui-sprites.generated.ts`;
const OUT_CSS = `${ROOT}css/gui-sprites.generated.css`;
const OUT_ICONS = `${ROOT}src/gui-icons.generated.ts`;

const check = process.argv.includes("--check");

async function fetchBuffer(url, label) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      return new Uint8Array(await response.arrayBuffer());
    }
    catch (error) {
      lastError = error;
      if (attempt < 4) {
        await new Promise(resolve => setTimeout(resolve, attempt * 400));
      }
    }
  }
  throw new Error(`cannot download ${label} (${url})`, { cause: lastError });
}

async function mapLimit(items, worker) {
  const results = Array.from({ length: items.length });
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor;
        cursor += 1;
        results[index] = await worker(items[index], index);
      }
    }),
  );
  return results;
}

function quote(value) {
  return JSON.stringify(value);
}

function readPngSize(png, name) {
  if (png.length < 24)
    throw new Error(`${name}: PNG too short (${png.length} bytes)`);
  for (const [index, byte] of PNG_SIGNATURE.entries()) {
    if (png[index] !== byte)
      throw new Error(`${name}: invalid PNG signature`);
  }
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  return { height: view.getUint32(20), width: view.getUint32(16) };
}

function slug(path) {
  return path
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "");
}

const manifest = JSON.parse(new TextDecoder().decode(await fetchBuffer(MANIFEST_URL, "manifest")));
if (manifest.version !== EXPECTED_VERSION) {
  throw new Error(
    `manifest version mismatch: expected ${EXPECTED_VERSION}, got ${manifest.version}`,
  );
}

const gui = manifest.textures
  .filter(texture => texture.category === "gui")
  .sort((a, b) => a.path.localeCompare(b.path));
const effects = manifest.textures
  .filter(texture => texture.category === "mob_effect")
  .sort((a, b) => a.path.localeCompare(b.path));

if (gui.length !== 577)
  throw new Error(`expected 577 GUI sprites, got ${gui.length}`);
if (effects.length !== 41)
  throw new Error(`expected 41 mob effects, got ${effects.length}`);

const sprites = await mapLimit(gui, async (texture) => {
  const png = await fetchBuffer(`${TEXTURE_BASE}${texture.path}`, texture.path);
  const { height, width } = readPngSize(png, texture.path);
  return {
    ...texture,
    base64: Buffer.from(png).toString("base64"),
    bytes: png.length,
    height,
    sha256: createHash("sha256").update(png).digest("hex"),
    width,
  };
});

const iconPaths = [
  ...gui.filter(texture => texture.path.startsWith("sprites/icon/")),
  ...effects,
];
const icons = await mapLimit(iconPaths, async (texture) => {
  const base = texture.category === "gui" ? TEXTURE_BASE : `${ICON_BASE}mob_effect/`;
  const png = await fetchBuffer(`${base}${texture.path}`, texture.path);
  const { height, width } = readPngSize(png, texture.path);
  const leaf = texture.path.split("/").at(-1).replace(/\.png$/, "");
  const key
    = texture.category === "mob_effect" ? `effect-${texture.name || leaf}` : `icon-${leaf}`;
  return {
    ...texture,
    base64: Buffer.from(png).toString("base64"),
    height,
    key,
    sha256: createHash("sha256").update(png).digest("hex"),
    width,
  };
});

const duplicateKeys = icons.map(icon => icon.key).filter((key, index, all) => all.indexOf(key) !== index);
if (duplicateKeys.length > 0) {
  throw new Error(`duplicate icon keys: ${[...new Set(duplicateKeys)].join(", ")}`);
}

const metaEntries = sprites
  .map((sprite) => {
    const className = `mc-gui-${slug(sprite.path)}`;
    return `  ${quote(sprite.path)}: {
    className: ${quote(className)},
    cssVar: ${quote(`--${className}`)},
    height: ${sprite.height},
    sha256: ${quote(sprite.sha256)},
    width: ${sprite.width},
  },`;
  })
  .join("\n");

const ts = `// Generated by scripts/sync-gui-sprites.mjs — DO NOT EDIT.
// Source: Resource Pack Creator GUI catalogue ${EXPECTED_VERSION}.
// Textures © Mojang Synergies AB; see LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @verdigris/textures sync:gui-sprites

export const GUI_SPRITE_VERSION = ${quote(EXPECTED_VERSION)};

export interface GuiSpriteMeta {
  className: string;
  cssVar: string;
  height: number;
  sha256: string;
  width: number;
}

export const guiSpriteMeta = {
${metaEntries}
} as const;

export type GuiSpriteName = keyof typeof guiSpriteMeta;
`;

const cssVars = sprites
  .map(sprite => `  --mc-gui-${slug(sprite.path)}: url("data:image/png;base64,${sprite.base64}");`)
  .join("\n");
const cssClasses = sprites
  .map(
    sprite => `.mc-gui-${slug(sprite.path)} { background-image: var(--mc-gui-${slug(sprite.path)}); image-rendering: pixelated; }`,
  )
  .join("\n");

const css = `/* Generated by scripts/sync-gui-sprites.mjs — DO NOT EDIT.
 * Source: Resource Pack Creator GUI catalogue ${EXPECTED_VERSION}.
 * Textures © Mojang Synergies AB; see LICENSE-ASSETS.md.
 */
:root {
${cssVars}
}

${cssClasses}
`;

const iconEntries = icons
  .map(
    icon => `  ${quote(icon.key)}: "data:image/png;base64,${icon.base64}",`,
  )
  .join("\n");

const iconTs = `// Generated by scripts/sync-gui-sprites.mjs — DO NOT EDIT.
// Source: Resource Pack Creator GUI ${EXPECTED_VERSION} (icon + mob_effect).
// Textures © Mojang Synergies AB; see LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @verdigris/textures sync:gui-sprites

export const guiIcons = {
${iconEntries}
} as const;

export type GuiIconName = keyof typeof guiIcons;
`;

const outputs = [
  [OUT_TS, ts],
  [OUT_CSS, css],
  [OUT_ICONS, iconTs],
];

if (check) {
  const stale = outputs.filter(([path, content]) => {
    try {
      return readFileSync(path, "utf8") !== content;
    }
    catch {
      return true;
    }
  });
  if (stale.length > 0) {
    throw new Error(`generated GUI sprites are stale: ${stale.map(([path]) => path).join(", ")}`);
  }
  process.stdout.write(`GUI sprites up to date (${sprites.length} sprites, ${icons.length} icons).\n`);
}
else {
  for (const [path, content] of outputs) writeFileSync(path, content, "utf8");
  process.stdout.write(
    `${sprites.length} GUI sprites + ${icons.length} icons → ${outputs.map(([path]) => path).join(", ")}\n`,
  );
}
