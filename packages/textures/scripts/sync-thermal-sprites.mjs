import { unzipSync } from "fflate";
// Generates the Thermal Expansion sprite registry + CSS from pinned upstream commits.
// Run: pnpm --filter @tennantite/textures sync:thermal-sprites
//
// Thermal 1.20.x splits assets from code: machine/container GUI backgrounds live in
// CoFH/ThermalCore (`assets/thermal/textures/gui/container/`), the shared widget set
// (slots, scales, buttons, panels) lives in CoFH/CoFHCore
// (`assets/cofh_core/textures/gui/`). The pinned CoFH/ThermalExpansion commit only
// contains the Screen classes that define the coordinates — no textures.
//
// The commits are pinned so the generated files are reproducible. `--check`
// re-renders and compares against the committed files.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// CoFH/ThermalCore 1.20.x — container GUI backgrounds (thermal namespace)
const CORE_COMMIT = "cc7c230146a71d177767a8f9d6b26f0a52e9aeed";
// CoFH/CoFHCore 1.20.x — shared GUI widgets (cofh_core namespace)
const COFH_CORE_COMMIT = "dcd7bd6703418ee2e8eb2185957de83925fa89fe";

const CORE_ZIP_URL = `https://codeload.github.com/CoFH/ThermalCore/zip/${CORE_COMMIT}`;
const COFH_CORE_ZIP_URL = `https://codeload.github.com/CoFH/CoFHCore/zip/${COFH_CORE_COMMIT}`;

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT_TS = `${ROOT}src/thermal-sprites.generated.ts`;
const OUT_CSS = `${ROOT}css/thermal-sprites.generated.css`;
const OUT_TEXTURES = `${ROOT}css/thermal-textures.css`;

const check = process.argv.includes("--check");

function cssVar(name) {
  return `--mc-thermal-${name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
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

function parseScaling(mcmeta) {
  if (!mcmeta) {
    return null;
  }
  try {
    const scaling = JSON.parse(mcmeta).gui?.scaling;
    if (scaling?.type === "nine_slice") {
      return {
        border: scaling.border,
        height: scaling.height,
        type: "nine_slice",
        width: scaling.width,
      };
    }
    return scaling?.type === "tile"
      ? { height: scaling.height, type: "tile", width: scaling.width }
      : null;
  }
  catch {
    return null;
  }
}

function pngSize(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  return { height: view.getUint32(20), width: view.getUint32(16) };
}

// 精灵名 = textures/gui/ 下的相对路径（去掉 .png）。
// thermal 与 cofh_core 的 GUI 子树（container/ vs elements|icons|filters/）无重名。
const SOURCES = [
  {
    accepts(relative) {
      return relative.startsWith("container/");
    },
    assetRoot: "src/main/resources/assets/thermal/textures/gui/",
    url: CORE_ZIP_URL,
  },
  {
    accepts(relative) {
      return relative.startsWith("elements/")
        || relative.startsWith("icons/")
        || relative.startsWith("filters/")
        || relative === "generic.png"
        || relative === "generic_extension.png";
    },
    assetRoot: "src/main/resources/assets/cofh_core/textures/gui/",
    url: COFH_CORE_ZIP_URL,
  },
];

const sprites = new Map();
for (const source of SOURCES) {
  const zip = await download(source.url);
  const files = unzipSync(zip, {
    filter(file) {
      return Boolean(file.name.includes(source.assetRoot))
        && file.name.endsWith(".png")
        && source.accepts(file.name.slice(file.name.indexOf(source.assetRoot) + source.assetRoot.length));
    },
  });
  for (const [fullName, bytes] of Object.entries(files)) {
    const relative = fullName.slice(fullName.indexOf(source.assetRoot) + source.assetRoot.length);
    const name = relative.slice(0, -".png".length);
    const mcmetaBytes = files[`${fullName}.mcmeta`];
    const mcmeta = mcmetaBytes ? new TextDecoder().decode(mcmetaBytes) : null;
    sprites.set(name, { bytes, scaling: parseScaling(mcmeta) });
  }
}

const entries = sprites.entries()
  .map(([name, { bytes, scaling }]) => {
    const { height, width } = pngSize(bytes);
    return {
      base64: Buffer.from(bytes).toString("base64"),
      cssVar: cssVar(name),
      height,
      name,
      scaling,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      width,
    };
  })
  .toArray()
  .toSorted((a, b) => a.name.localeCompare(b.name));

if (entries.length < 150) {
  throw new Error(`expected at least 150 Thermal sprites, got ${entries.length}`);
}

// CoFH/ThermalExpansion 1.20.x — Screen classes (coordinate reference, no textures)
const EXPANSION_COMMIT = "24a26758694ba32eb96a8105f080c36e768cd02f";

function scalingLiteral(scaling) {
  return scaling === null
    ? "null"
    : `{ ${Object.entries(scaling).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(", ")} }`;
}

const metaLines = entries.map(entry => `  ${/^[a-z][\w$]*$/i.test(entry.name) ? entry.name : JSON.stringify(entry.name)}: {
    cssVar: ${JSON.stringify(entry.cssVar)},
    height: ${entry.height},
    scaling: ${scalingLiteral(entry.scaling)},
    sha256: ${JSON.stringify(entry.sha256)},
    width: ${entry.width},
  },`);

const ts = `// Generated by scripts/sync-thermal-sprites.mjs — DO NOT EDIT.
// Sources: CoFH/ThermalExpansion ${EXPANSION_COMMIT} (Screen classes, no textures);
// CoFH/ThermalCore ${CORE_COMMIT} and CoFH/CoFHCore ${COFH_CORE_COMMIT} (textures).
// CoFH "Don't Be a Jerk" License v2, sprites (c) Team CoFH. See LICENSE-ASSETS.md.
// Regenerate: pnpm --filter @tennantite/textures sync:thermal-sprites

export type ThermalSpriteScaling =
  | null
  | { border: number; height: number; type: "nine_slice"; width: number }
  | { height: number; type: "tile"; width: number };

export interface ThermalSpriteMeta {
  cssVar: string;
  height: number;
  scaling: ThermalSpriteScaling;
  sha256: string;
  width: number;
}

export const thermalSpriteMeta = {
${metaLines.join("\n")}
} as const;

export type ThermalSpriteName = keyof typeof thermalSpriteMeta;
`;

const cssLines = entries.map(
  entry => `  ${entry.cssVar}: url("data:image/png;base64,${entry.base64}");`,
);

const css = `/*
 * Generated by scripts/sync-thermal-sprites.mjs — DO NOT EDIT.
 * Sources: CoFH/ThermalExpansion ${EXPANSION_COMMIT} (Screen classes, no textures);
 * CoFH/ThermalCore ${CORE_COMMIT} and CoFH/CoFHCore ${COFH_CORE_COMMIT} (textures).
 * CoFH "Don't Be a Jerk" License v2, sprites (c) Team CoFH. See LICENSE-ASSETS.md.
 */
:root {
${cssLines.join("\n")}
}
`;

const textures = `/*
 * Thermal Expansion sprite layer. Import after the vanilla sprite CSS.
 * Generated data URIs live in thermal-sprites.generated.css.
 */
@import "./thermal-sprites.generated.css";

.mc-thermal-sprite {
  background-repeat: no-repeat;
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
  console.log(`Thermal sprites up to date (${entries.length})`);
}
else {
  writeFileSync(OUT_TS, ts);
  writeFileSync(OUT_CSS, css);
  writeFileSync(OUT_TEXTURES, textures);
  console.log(`wrote ${entries.length} Thermal sprites`);
}
