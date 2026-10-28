/* eslint-disable unicorn/no-array-sort, unicorn/no-break-in-nested-loop, unicorn/no-declarations-before-early-exit, unicorn/no-unreadable-for-of-expression, unicorn/prefer-switch, style/max-statements-per-line */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
// Scans vanilla container backgrounds for baked 18×18 / 26×26 slot frames.
// Run: pnpm --filter @tennantite/textures sync:gui-layouts
import { inflateSync } from "node:zlib";

const MANIFEST_URL = "https://resourcepackcreator.com/texture-manifest.json";
const BASE = "https://resourcepackcreator.com/textures/gui/";
const EXPECTED_VERSION = "26.4-snapshot-3";
const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT = `${ROOT}src/gui-layouts.generated.ts`;
const check = process.argv.includes("--check");

const PNG_SIGNATURE = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

function decodePng(buffer) {
  for (const [index, byte] of PNG_SIGNATURE.entries()) {
    if (buffer[index] !== byte)
      throw new Error("invalid PNG signature");
  }
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  let bitDepth = 0;
  let palette = null;
  const idat = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (![1, 2, 4, 8].includes(bitDepth))
        throw new Error(`unsupported bit depth ${bitDepth}`);
      if (![0, 2, 3, 4, 6].includes(colorType))
        throw new Error(`unsupported color type ${colorType}`);
    }
    else if (type === "PLTE") {
      palette = [];
      for (let i = 0; i + 2 < data.length; i += 3) {
        palette.push([data[i], data[i + 1], data[i + 2]]);
      }
    }
    else if (type === "IDAT") {
      idat.push(data);
    }
    else if (type === "IEND") {
      break;
    }
  }
  const channels = ({ 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 })[colorType];
  const raw = inflateSync(Buffer.concat(idat));
  const stride = Math.ceil((width * channels * bitDepth) / 8);
  const bpp = Math.max(1, Math.ceil((channels * bitDepth) / 8));
  const pixels = new Uint8Array(width * height * 4);
  const prior = new Uint8Array(stride);
  const current = new Uint8Array(stride);
  let cursor = 0;

  const sample = (x, channel) => {
    if (bitDepth === 8)
      return current[x * channels + channel];
    const bitOffset = (x * channels + channel) * bitDepth;
    const byte = current[bitOffset >> 3];
    const shift = 8 - bitDepth - (bitOffset & 7);
    return (byte >> shift) & ((1 << bitDepth) - 1);
  };

  for (let y = 0; y < height; y += 1) {
    const filter = raw[cursor];
    cursor += 1;
    raw.copy(current, 0, cursor, cursor + stride);
    cursor += stride;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? current[x - bpp] : 0;
      const up = prior[x];
      const upLeft = x >= bpp ? prior[x - bpp] : 0;
      switch (filter) {
        case 0: { break;
        }
        case 1: { current[x] = (current[x] + left) & 0xFF; break;
        }
        case 2: { current[x] = (current[x] + up) & 0xFF; break;
        }
        case 3: { current[x] = (current[x] + ((left + up) >> 1)) & 0xFF; break;
        }
        case 4: {
          const p = left + up - upLeft;
          const pa = Math.abs(p - left);
          const pb = Math.abs(p - up);
          const pc = Math.abs(p - upLeft);
          const predictor = pa <= pb && pa <= pc ? left : (pb <= pc ? up : upLeft);
          current[x] = (current[x] + predictor) & 0xFF;
          break;
        }
        default: { throw new Error(`unsupported filter ${filter}`);
        }
      }
    }
    for (let x = 0; x < width; x += 1) {
      const target = (y * width + x) * 4;
      switch (colorType) {
        case 0: {
          const value = Math.round((sample(x, 0) * 255) / ((1 << bitDepth) - 1));
          pixels[target] = value;
          pixels[target + 1] = value;
          pixels[target + 2] = value;
          pixels[target + 3] = 255;

          break;
        }
        case 3: {
          const index = sample(x, 0);
          const color = palette?.[index] ?? [0, 0, 0];
          pixels[target] = color[0];
          pixels[target + 1] = color[1];
          pixels[target + 2] = color[2];
          pixels[target + 3] = 255;

          break;
        }
        case 4: {
          const value = Math.round((sample(x, 0) * 255) / ((1 << bitDepth) - 1));
          pixels[target] = value;
          pixels[target + 1] = value;
          pixels[target + 2] = value;
          pixels[target + 3] = Math.round((sample(x, 1) * 255) / ((1 << bitDepth) - 1));

          break;
        }
        default: {
          for (let channel = 0; channel < 4; channel += 1) {
            pixels[target + channel]
              = channel < channels
                ? Math.round((sample(x, channel) * 255) / ((1 << bitDepth) - 1))
                : 255;
          }
        }
      }
    }
    prior.set(current);
  }
  return { height, pixels, width };
}

function hexAt(image, x, y) {
  if (x < 0 || y < 0 || x >= image.width || y >= image.height)
    return "00000000";
  const index = (y * image.width + x) * 4;
  return [image.pixels[index], image.pixels[index + 1], image.pixels[index + 2], image.pixels[index + 3]]
    .map(value => value.toString(16).padStart(2, "0"))
    .join("");
}

const SLOT_BORDER_COLORS = new Set(["373737ff", "383838ff"]);

function isSlot(image, x, y, size) {
  const border = size - 1;
  if (x + size > image.width || y + size > image.height)
    return false;
  for (let i = 0; i < border; i += 1) {
    if (!SLOT_BORDER_COLORS.has(hexAt(image, x + i, y)) || !SLOT_BORDER_COLORS.has(hexAt(image, x, y + i)) || (hexAt(image, x + 1 + i, y + border) !== "ffffffff") || (hexAt(image, x + border, y + 1 + i) !== "ffffffff"))
      return false;
  }
  return hexAt(image, x + 2, y + 2) === "8b8b8bff";
}

function scan(image) {
  const slots18 = [];
  const slots26 = [];
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      if (isSlot(image, x, y, 18))
        slots18.push([x, y]);
      if (isSlot(image, x, y, 26))
        slots26.push([x, y]);
    }
  }
  return { slots18, slots26 };
}

const manifestResponse = await fetch(MANIFEST_URL);
if (!manifestResponse.ok)
  throw new Error(`HTTP ${manifestResponse.status} for manifest`);
const manifest = await manifestResponse.json();
if (manifest.version !== EXPECTED_VERSION) {
  throw new Error(`manifest version mismatch: expected ${EXPECTED_VERSION}, got ${manifest.version}`);
}

const containers = manifest.textures
  .filter(texture => texture.category === "gui" && /^container\/[^/]+\.png$/.test(texture.path))
  .sort((a, b) => a.path.localeCompare(b.path));

const SLOT_18_OVERRIDES = {
  "container/horse.png": [[7, 17], [7, 35]],
};
const SLOT_26_OVERRIDES = {
  "container/crafter.png": [[129, 30]],
};

const entries = [];
for (const texture of containers) {
  const response = await fetch(`${BASE}${texture.path}`);
  if (!response.ok)
    throw new Error(`HTTP ${response.status} for ${texture.path}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const image = decodePng(buffer);
  const { slots18, slots26 } = scan(image);
  for (const [x, y] of SLOT_18_OVERRIDES[texture.path] ?? []) {
    if (slots18.every(([slotX, slotY]) => slotX !== x || slotY !== y))
      slots18.push([x, y]);
  }
  for (const [x, y] of SLOT_26_OVERRIDES[texture.path] ?? []) {
    if (slots26.every(([slotX, slotY]) => slotX !== x || slotY !== y))
      slots26.push([x, y]);
  }
  slots18.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  slots26.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  entries.push({ path: texture.path, slots18, slots26 });
}

const body = entries
  .map(entry => `  ${JSON.stringify(entry.path)}: {
    slots18: ${JSON.stringify(entry.slots18)},
    slots26: ${JSON.stringify(entry.slots26)},
  },`)
  .join("\n");

const content = `// Generated by scripts/scan-gui-layouts.mjs — DO NOT EDIT.
// Source: Resource Pack Creator GUI catalogue ${EXPECTED_VERSION}.
// Slot frames are baked into the vanilla container backgrounds.
// Regenerate: pnpm --filter @tennantite/textures sync:gui-layouts

export const containerSlots = {
${body}
} as const;

export type ContainerSpriteName = keyof typeof containerSlots;
`;

if (check) {
  const existing = readFileSync(OUT, "utf8");
  if (existing !== content)
    throw new Error("gui-layouts.generated.ts is stale");
  process.stdout.write(`GUI layouts up to date (${entries.length} containers).\n`);
}
else {
  writeFileSync(OUT, content, "utf8");
  process.stdout.write(`${entries.length} containers → ${OUT}\n`);
  for (const entry of entries) {
    process.stdout.write(
      `${entry.path.padEnd(28)} 18:${entry.slots18.length} 26:${entry.slots26.length}\n`,
    );
  }
}
