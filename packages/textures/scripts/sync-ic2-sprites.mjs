import { unzipSync } from "fflate";
// Generates the IC2 sprite registry + CSS from two pinned upstream jars:
// IndustrialCraft 2 Experimental 2.8.99-ex112 and the Minecraft 1.12.2 client.
// Run: pnpm --filter @verdigris/textures sync:ic2-sprites
//
// Sources are pinned to one upstream release each so the generated files are
// reproducible. `--check` re-renders and compares against the committed files.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { deflateSync, inflateSync } from "node:zlib";

const IC2_VERSION = "2.8.99-ex112";
const IC2_URL
  = "https://maven.ic2.player.to/net/industrial-craft/industrialcraft-2/"
    + `${IC2_VERSION}/industrialcraft-2-${IC2_VERSION}.jar`;
const IC2_SHA1 = "3dc2c457ce0fd73bb70d9240ab45e092e06b0e8a";

const MC_VERSION = "1.12.2";
const MC_URL = "https://piston-data.mojang.com/v1/objects/0f275bc1547d01fa5f56ba34bdc87d981ee12daf/client.jar";
const MC_SHA1 = "0f275bc1547d01fa5f56ba34bdc87d981ee12daf";

const IC2_GUI = "assets/ic2/textures/gui/";
const MC_ROOT = "assets/minecraft/textures/";

// 生成名 → 上游文件。生成名经 kebab-case 后即 CSS 变量后缀
// （`machineBackground` → `--mc-ic2-machine-background`）。
const SPRITES = {
  armorBoots: { file: `${MC_ROOT}items/empty_armor_slot_boots.png`, jar: "mc" },
  armorChestplate: { file: `${MC_ROOT}items/empty_armor_slot_chestplate.png`, jar: "mc" },
  armorHelmet: { file: `${MC_ROOT}items/empty_armor_slot_helmet.png`, jar: "mc" },
  armorLeggings: { file: `${MC_ROOT}items/empty_armor_slot_leggings.png`, jar: "mc" },
  buttonHover: { file: `${MC_ROOT}gui/widgets.png`, jar: "mc" },
  buttonNormal: { file: `${MC_ROOT}gui/widgets.png`, jar: "mc" },
  common: { file: `${IC2_GUI}common.png`, jar: "ic2" },
  electricBlock: { file: `${IC2_GUI}guielectricblock.png`, jar: "ic2" },
  infoButton: { file: `${IC2_GUI}infobutton.png`, jar: "ic2" },
  machineBackground: { file: `${IC2_GUI}common.png`, jar: "ic2" },
  redstone: { file: `${MC_ROOT}items/redstone_dust.png`, jar: "mc" },
};

// `machineBackground` → `machine-background`（CSS 变量名保持 kebab-case）。
function cssName(name) {
  return name.replaceAll(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const OUT_TS = `${ROOT}src/ic2-sprites.generated.ts`;
const OUT_CSS = `${ROOT}css/ic2-sprites.generated.css`;

const check = process.argv.includes("--check");

/**
 * 处理单个 PNG chunk：IHDR 写入 header，IDAT 收集数据，IEND 返回 true。
 */
function collectChunk(type, data, header, idat) {
  switch (type) {
    case "IDAT": {
      idat.push(data);
      return false;
    }
    case "IEND": {
      return true;
    }
    case "IHDR": {
      const view = new DataView(data.buffer, data.byteOffset);
      header.width = view.getUint32(0);
      header.height = view.getUint32(4);
      header.bitDepth = data[8];
      header.colorType = data[9];
      header.interlace = data[12];
      return false;
    }
    default: {
      return false;
    }
  }
}

async function download(url, label) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      const sha1 = createHash("sha1").update(bytes).digest("hex");
      if (sha1 !== label.sha1) {
        throw new Error(`${label.name} SHA-1 mismatch: expected ${label.sha1}, got ${sha1}`);
      }
      return bytes;
    }
    catch (error) {
      lastError = error;
      if (attempt < 4) {
        await new Promise(resolve => setTimeout(resolve, attempt * 400));
      }
    }
  }
  throw new Error(`cannot download ${label.name}`, { cause: lastError });
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) {
    return a;
  }
  return pb <= pc ? b : c;
}

/**
 * PNG 尺寸：直接读 IHDR（宽高为 big-endian uint32，偏移 16 / 20）。
 */
function pngSize(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  return { height: view.getUint32(20), width: view.getUint32(16) };
}

/**
 * 解码 8-bit RGBA、非隔行 PNG（IC2 与 MC 1.12.2 GUI 贴图全部满足）。
 *
 * @throws {Error} PNG 签名、色深、颜色类型或隔行方式不受支持时抛出。
 */
function readPng(bytes) {
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  for (const [index, element] of signature.entries()) {
    if (bytes[index] !== element) {
      throw new Error("not a PNG");
    }
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  const header = { bitDepth: 0, colorType: 0, height: 0, interlace: 0, width: 0 };
  const idat = [];
  let offset = 8;
  while (offset < bytes.length) {
    const length = view.getUint32(offset);
    const type = String.fromCodePoint(...bytes.subarray(offset + 4, offset + 8));
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (collectChunk(type, data, header, idat)) {
      break;
    }
    offset += 12 + length;
  }
  if (header.bitDepth !== 8 || header.colorType !== 6 || header.interlace !== 0) {
    throw new Error(
      `unsupported PNG: depth=${header.bitDepth} color=${header.colorType} interlace=${header.interlace}`,
    );
  }
  const { height, width } = header;

  const stride = width * 4;
  const raw = inflateSync(Buffer.concat(idat));
  const rgba = new Uint8Array(width * height * 4);
  let previous = new Uint8Array(stride);
  let cursor = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[cursor];
    cursor += 1;
    const line = new Uint8Array(stride);
    for (let x = 0; x < stride; x += 1) {
      const a = x >= 4 ? line[x - 4] : 0;
      const b = previous[x];
      const c = x >= 4 ? previous[x - 4] : 0;
      line[x] = unfilter(filter, raw[cursor + x], a, b, c);
    }
    cursor += stride;
    rgba.set(line, y * stride);
    previous = line;
  }
  return { height, rgba, width };
}

/**
 * 按 PNG 规范还原一行内的单个像素（5 种 filter）。
 *
 * @throws {Error} filter 类型未知时抛出。
 */
function unfilter(filter, value, a, b, c) {
  switch (filter) {
    case 0: {
      return value;
    }
    case 1: {
      return (value + a) & 0xFF;
    }
    case 2: {
      return (value + b) & 0xFF;
    }
    case 3: {
      return (value + ((a + b) >> 1)) & 0xFF;
    }
    case 4: {
      return (value + paeth(a, b, c)) & 0xFF;
    }
    default: {
      throw new Error(`unsupported PNG filter ${filter}`);
    }
  }
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? 0xED_B8_83_20 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

/**
 * source-over 合成；源 alpha 为 0 的像素跳过，越界像素丢弃。
 */
function blit(target, source, dx, dy, sx, sy, width, height) {
  for (let row = 0; row < height; row += 1) {
    const ty = dy + row;
    if (ty < 0 || ty >= target.height) {
      continue;
    }
    for (let column = 0; column < width; column += 1) {
      const tx = dx + column;
      if (tx < 0 || tx >= target.width) {
        continue;
      }
      const sourceIndex = ((sy + row) * source.width + sx + column) * 4;
      const sourceAlpha = source.rgba[sourceIndex + 3];
      if (sourceAlpha === 0) {
        continue;
      }
      const targetIndex = (ty * target.width + tx) * 4;
      if (sourceAlpha === 255) {
        target.rgba.set(source.rgba.subarray(sourceIndex, sourceIndex + 4), targetIndex);
        continue;
      }
      const sourceWeight = sourceAlpha / 255;
      const targetWeight = (target.rgba[targetIndex + 3] / 255) * (1 - sourceWeight);
      const outAlpha = sourceWeight + targetWeight;
      for (let channel = 0; channel < 3; channel += 1) {
        target.rgba[targetIndex + channel] = Math.round(
          (source.rgba[sourceIndex + channel] * sourceWeight
            + target.rgba[targetIndex + channel] * targetWeight)
          / outAlpha,
        );
      }
      target.rgba[targetIndex + 3] = Math.round(outAlpha * 255);
    }
  }
}

/**
 * 复刻 `VanillaButton.drawVerticalPiece`：200×20 源按 18+2 / 17+3 拼成 20×20。
 */
function button(widgets, v) {
  const target = { height: 20, rgba: new Uint8Array(20 * 20 * 4), width: 20 };
  blit(target, widgets, 0, 0, 0, v, 18, 17);
  blit(target, widgets, 18, 0, 198, v, 2, 17);
  blit(target, widgets, 0, 17, 0, v + 17, 18, 3);
  blit(target, widgets, 18, 17, 198, v + 17, 2, 3);
  return target;
}

function chunk(type, data) {
  const head = new Uint8Array(8);
  const view = new DataView(head.buffer);
  view.setUint32(0, data.length);
  for (let index = 0; index < 4; index += 1) {
    head[4 + index] = type.codePointAt(index) ?? 0;
  }
  const body = new Uint8Array(head.length + data.length + 4);
  body.set(head);
  body.set(data, head.length);
  const crcInput = body.subarray(4, head.length + data.length);
  new DataView(body.buffer).setUint32(head.length + data.length, crc32(crcInput));
  return body;
}

function crc32(bytes) {
  let crc = 0xFF_FF_FF_FF;
  for (const byte of bytes) {
    crc = CRC_TABLE[(crc ^ byte) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFF_FF_FF_FF) >>> 0;
}

function crop(source, width, height) {
  const rgba = new Uint8Array(width * height * 4);
  for (let row = 0; row < height; row += 1) {
    const from = ((0 + row) * source.width + 0) * 4;
    rgba.set(source.rgba.subarray(from, from + width * 4), row * width * 4);
  }
  return { height, rgba, width };
}

/**
 * 复刻 `GuiDefaultBackground`：96×96 九宫格铺在 -16 偏移上，输出 176×166。
 */
function machineBackground(common) {
  const target = { height: 166, rgba: new Uint8Array(176 * 166 * 4), width: 176 };
  for (const [dx, dy, sx, sy] of [
    [-16, -16, 0, 0],
    [160, -16, 64, 0],
    [-16, 150, 0, 64],
    [160, 150, 64, 64],
  ]) {
    blit(target, common, dx, dy, sx, sy, 32, 32);
  }
  for (const [y, sy] of [[-16, 0], [150, 64]]) {
    for (let x = 16; x < 160; x += 32) {
      blit(target, common, x, y, 32, sy, Math.min(32, 160 - x), 32);
    }
  }
  for (const [x, sx] of [[-16, 0], [160, 64]]) {
    for (let y = 16; y < 150; y += 32) {
      blit(target, common, x, y, sx, 32, 32, Math.min(32, 150 - y));
    }
  }
  for (let y = 16; y < 150; y += 32) {
    for (let x = 16; x < 160; x += 32) {
      blit(target, common, x, y, 32, 32, Math.min(32, 160 - x), Math.min(32, 150 - y));
    }
  }
  return target;
}

function render(entries) {
  const metaLines = entries.map(([name, entry]) => `  ${/^[a-z][\w$]*$/i.test(name) ? name : JSON.stringify(name)}: {
    cssVar: "--mc-ic2-${cssName(name)}",
    height: ${entry.height},
    sha256: ${JSON.stringify(entry.sha256)},
    width: ${entry.width},
  },`);

  const ts = `// Generated by scripts/sync-ic2-sprites.mjs — DO NOT EDIT.
// Source: IndustrialCraft 2 Experimental ${IC2_VERSION} (IC2 作者所有) — GUI 贴图
// Source: Minecraft Java ${MC_VERSION} client (Mojang Synergies AB) — 原版按钮 / 红石 / 空装备图标
// See LICENSE-ASSETS.md; IC2 与 Mojang 素材均不在本项目授权范围内。
// Regenerate: pnpm --filter @verdigris/textures sync:ic2-sprites

export interface Ic2SpriteMeta {
  cssVar: string;
  height: number;
  sha256: string;
  width: number;
}

export const ic2SpriteMeta = {
${metaLines.join("\n")}
} as const;

export type Ic2SpriteName = keyof typeof ic2SpriteMeta;
`;

  const cssLines = entries.map(
    ([name, entry]) => `  --mc-ic2-${cssName(name)}: url("data:image/png;base64,${entry.base64}");`,
  );

  const css = `/*
 * Generated by scripts/sync-ic2-sprites.mjs — DO NOT EDIT.
 * Source: IndustrialCraft 2 Experimental ${IC2_VERSION} (IC2 作者所有) — GUI 贴图
 * Source: Minecraft Java ${MC_VERSION} client (Mojang Synergies AB) — 原版按钮 / 红石 / 空装备图标
 * See LICENSE-ASSETS.md; IC2 与 Mojang 素材均不在本项目授权范围内。
 */
:root {
${cssLines.join("\n")}
}
`;

  return { css, ts };
}

function toEntry(bytes) {
  const { height, width } = pngSize(bytes);
  return {
    base64: Buffer.from(bytes).toString("base64"),
    height,
    sha256: createHash("sha256").update(bytes).digest("hex"),
    width,
  };
}

function writePng(width, height, rgba) {
  const stride = width * 4;
  const raw = new Uint8Array((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    raw.set(rgba.subarray(y * stride, (y + 1) * stride), y * (stride + 1) + 1);
  }
  const ihdr = new Uint8Array(13);
  const view = new DataView(ihdr.buffer);
  view.setUint32(0, width);
  view.setUint32(4, height);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const compressed = new Uint8Array(deflateSync(raw));
  const signature = Uint8Array.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", new Uint8Array(0)),
  ]);
}

const jars = {
  ic2: await download(IC2_URL, { name: "IC2", sha1: IC2_SHA1 }),
  mc: await download(MC_URL, { name: "Minecraft", sha1: MC_SHA1 }),
};
const unzipped = {
  ic2: unzipSync(jars.ic2),
  mc: unzipSync(jars.mc),
};

const decoded = new Map();
function decode(jar, file) {
  const key = `${jar}|${file}`;
  if (!decoded.has(key)) {
    const bytes = unzipped[jar][file];
    if (!bytes) {
      throw new Error(`missing ${file} in ${jar} jar`);
    }
    decoded.set(key, readPng(bytes));
  }
  return decoded.get(key);
}

/**
 * 按生成名编码 PNG 字节（原样拷贝 / 裁剪 / 九宫格合成 / 按钮切片）。
 *
 * @throws {Error} 生成名未定义时抛出。
 */
function encodeSprite(name, source, sourceBytes) {
  switch (name) {
    case "armorBoots":
    case "armorChestplate":
    case "armorHelmet":
    case "armorLeggings":
    case "common":
    case "redstone": {
      return sourceBytes;
    }
    case "buttonHover": {
      const image = button(source, 86);
      return writePng(image.width, image.height, image.rgba);
    }
    case "buttonNormal": {
      const image = button(source, 66);
      return writePng(image.width, image.height, image.rgba);
    }
    case "electricBlock": {
      const image = crop(source, 176, 196);
      return writePng(image.width, image.height, image.rgba);
    }
    case "infoButton": {
      const image = crop(source, 10, 10);
      return writePng(image.width, image.height, image.rgba);
    }
    case "machineBackground": {
      const image = machineBackground(source);
      return writePng(image.width, image.height, image.rgba);
    }
    default: {
      throw new Error(`unhandled sprite ${name}`);
    }
  }
}

const entries = [];
for (const [name, sprite] of Object.entries(SPRITES)) {
  const source = decode(sprite.jar, sprite.file);
  const bytes = encodeSprite(name, source, unzipped[sprite.jar][sprite.file]);
  entries.push([name, toEntry(bytes)]);
}
entries.sort((a, b) => a[0].localeCompare(b[0]));

const { css, ts } = render(entries);

if (check) {
  let isStale = false;
  for (const [file, expected] of [
    [OUT_TS, ts],
    [OUT_CSS, css],
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
  console.log("IC2 sprites up to date");
}
else {
  writeFileSync(OUT_TS, ts);
  writeFileSync(OUT_CSS, css);
  console.log(`wrote ${Object.keys(SPRITES).length} IC2 sprites`);
}
