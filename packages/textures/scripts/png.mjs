// PNG 编解码（仅索引色 / RGBA 灰度以外的 8-bit、非隔行——原版与 Create 贴图全部满足。
// 实际上只支持 IHDR 的 color type 3（8/4-bit 索引色）与 6（RGBA 8-bit））。
// 供 sync-create-sprites.mjs 与 sync-vanilla-icons.mjs 共用。
import { deflateSync, inflateSync } from "node:zlib";

/**
 * 只读 IHDR：不 inflate，用于廉价尺寸断言。
*/
export function pngSize(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  return { height: view.getUint32(20), width: view.getUint32(16) };
}

/**
 * 解码为 `{ width, height, rgba }`（RGBA 8-bit，行优先）。
 *
 * @throws {Error} 位深 / 颜色类型 / 隔行 / 过滤方式不受支持
*/
export function readPng(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset);
  const chunks = { idat: [], palette: null, transparency: null };
  let width = 0;
  let height = 0;
  let depth = 8;
  let color = 6;
  let offset = 8;
  while (offset < bytes.length) {
    const length = view.getUint32(offset);
    const type = String.fromCodePoint(...bytes.subarray(offset + 4, offset + 8));
    const data = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = view.getUint32(16);
      height = view.getUint32(20);
      depth = data[8];
      color = data[9];
      const isUnsupportedDepth = depth !== 8 && !(depth === 4 && color === 3);
      const isUnsupportedColor = color !== 0 && color !== 2 && color !== 3 && color !== 6;
      if (isUnsupportedDepth || isUnsupportedColor || data[12] !== 0) {
        throw new Error(`unsupported PNG: depth=${depth} color=${color} interlace=${data[12]}`);
      }
    }
    const isEnd = applyChunk(type, data, chunks);
    offset += 12 + length;
    if (isEnd) {
      break;
    }
  }
  const idat = chunks.idat;
  const palette = chunks.palette;
  const transparency = chunks.transparency;
  const stride = color === 3 ? Math.ceil((width * depth) / 8) : width * channelsOf(color);
  const bpp = color === 3 ? 1 : channelsOf(color);
  const raw = inflateSync(Buffer.concat(idat));
  const rgba = new Uint8Array(width * height * 4);
  let previous = new Uint8Array(stride);
  let cursor = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[cursor];
    cursor += 1;
    const line = new Uint8Array(stride);
    for (let x = 0; x < stride; x += 1) {
      const a = x >= bpp ? line[x - bpp] : 0;
      const b = previous[x];
      const c = x >= bpp ? previous[x - bpp] : 0;
      line[x] = unfilter(filter, raw[cursor + x], a, b, c);
    }
    cursor += stride;
    for (let x = 0; x < width; x += 1) {
      rgba.set(pixelAt(line, x, depth, color, palette, transparency), (y * width + x) * 4);
    }
    previous = line;
  }
  return { height, rgba, width };
}

// 非 IHDR chunk 处理；返回 true 表示 IEND（流结束）。
function applyChunk(type, data, chunks) {
  switch (type) {
    case "IDAT": {
      chunks.idat.push(data);
      return false;
    }
    case "IEND": {
      return true;
    }
    case "PLTE": {
      chunks.palette = data;
      return false;
    }
    case "tRNS": {
      chunks.transparency = data;
      return false;
    }
    default: {
      return false;
    }
  }
}

/**
 * 每像素通道数（不含 alpha 的原始通道）
*/
function channelsOf(color) {
  switch (color) {
    case 0: {
      return 1;
    }
    case 2: {
      return 3;
    }
    default: {
      return 4;
    }
  }
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

function pixelAt(line, x, depth, color, palette, transparency) {
  if (color === 0) {
    const value = line[x];
    return [value, value, value, 255];
  }
  if (color === 2) {
    const i = x * 3;
    return [line[i], line[i + 1], line[i + 2], 255];
  }
  if (color === 6) {
    const i = x * 4;
    return [line[i], line[i + 1], line[i + 2], line[i + 3]];
  }
  const index = depth === 8 ? line[x] : ((x & 1) === 0 ? line[x >> 1] >> 4 : line[x >> 1] & 15);
  return [
    palette[index * 3],
    palette[index * 3 + 1],
    palette[index * 3 + 2],
    transparency !== null && index < transparency.length ? transparency[index] : 255,
  ];
}

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
 * 编码 RGBA 8-bit 非隔行 PNG（filter 0，deflate level 9）。
*/
export function writePng(width, height, rgba) {
  const header = new Uint8Array(13);
  new DataView(header.buffer).setUint32(0, width);
  new DataView(header.buffer).setUint32(4, height);
  header[8] = 8;
  header[9] = 6;
  header[12] = 0;
  // filter 0 每行 + 1 字节 filter 头
  const stride = width * 4;
  const raw = new Uint8Array((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    raw.set(rgba.subarray(y * stride, (y + 1) * stride), y * (stride + 1) + 1);
  }
  const compressedIdat = deflateSync(raw, { level: 9 });
  const endChunk = chunk("IEND", new Uint8Array(0));
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    Buffer.from(chunk("IHDR", header)),
    Buffer.from(chunk("IDAT", compressedIdat)),
    Buffer.from(endChunk),
  ]);
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
