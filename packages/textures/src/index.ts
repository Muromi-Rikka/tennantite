/**
 * @verdigris/textures — 像素图标精灵与纹理导出
 *
 * 全部图标为本项目重绘的像素画（字符画 → SVG rect），零 Mojang 素材。
 * 每个字符对应调色板中一个颜色，"." / " " 为透明。
 */

export type PixelPalette = Record<string, string>;

interface ColorRun {
  ch: string;
  length: number;
  x: number;
}

/**
 * 把字符画行编译为 SVG 字符串（合并同色横向 run，输出最小 rect 集合）。
*/
export function pixelSprite(
  rows: readonly string[],
  palette: PixelPalette,
  viewBox?: { height: number; width: number },
): string {
  const height = viewBox?.height ?? rows.length;
  const width = viewBox?.width ?? Math.max(...rows.map(row => row.length));
  const rects: string[] = [];
  for (const [y, row] of rows.entries()) {
    for (const { ch, length, x } of scanColorRuns(row)) {
      const fill = palette[ch];
      if (fill) {
        rects.push(
          `<rect x='${x}' y='${y}' width='${length}' height='1' fill='${fill}'/>`,
        );
      }
    }
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' shape-rendering='crispEdges'>${rects.join("")}</svg>`;
}

/**
 * 扫描一行字符画，输出同色横向 run（run-length 编码）。
*/
function scanColorRuns(row: string): ColorRun[] {
  const runs: ColorRun[] = [];
  let x = 0;
  while (x < row.length) {
    const ch = row[x];
    if (ch === undefined) {
      break;
    }
    let run = 1;
    while (row[x + run] === ch) {
      run += 1;
    }
    runs.push({ ch, length: run, x });
    x += run;
  }
  return runs;
}

/*
---- 通用调色板 ----
*/
const OUTLINE = "#000000";
const HEART_RED = "#E3313B";
const HEART_HIGHLIGHT = "#FF8A8A";
const MEAT = "#B5714F";
const MEAT_DARK = "#8A4B2A";
const BONE = "#F4F4F4";
const GRASS = "#7CBD4C";
const GRASS_DARK = "#5D8F3A";
const DIRT = "#866043";
const DIRT_DARK = "#6E4E35";
const STONE = "#8B8B8B";
const STONE_DARK = "#6E6E6E";
const CREEPER = "#5EBD4E";
const DIAMOND = "#4AEDD9";
const DIAMOND_DARK = "#2BB5A5";
const DIAMOND_LIGHT = "#BFFEF5";
const IRON = "#D8D8D8";
const APPLE_RED = "#E3313B";
const APPLE_HIGHLIGHT = "#FF8A8A";
const LEAF = "#5D8F3A";
const XP = "#7EFC20";
const XP_DARK = "#4EA816";
const XP_LIGHT = "#D6FFB0";

/*
---- 状态图标 ----
*/

/**
 * 生命值（9×8）
*/
const HEART_ROWS = [
  ".oo...oo.",
  "owro.owro",
  "orrrrrrro",
  "orrrrrrro",
  ".orrrrro.",
  "..orrro..",
  "...oro...",
  "....o....",
] as const;

export const heart = pixelSprite(HEART_ROWS, {
  o: OUTLINE,
  r: HEART_RED,
  w: HEART_HIGHLIGHT,
});

/**
 * 空心生命值（容器灰）
*/
export const heartEmpty = pixelSprite(HEART_ROWS, {
  o: OUTLINE,
  r: "#4A4A4A",
  w: "#6E6E6E",
});

/**
 * 半心生命值（左半红 / 右半容器灰）
*/
export const heartHalf = pixelSprite(
  [
    ".oo...oo.",
    "owro.owdo",
    "orrrddddd",
    "orrrddddd",
    ".orrdddd.",
    "..orrddd.",
    "...ordd..",
    "....od...",
  ],
  { d: "#4A4A4A", o: OUTLINE, r: HEART_RED, w: HEART_HIGHLIGHT },
);

/**
 * 饥饿值（9×9，鸡腿）
*/
const HUNGER_ROWS = [
  "...oooo..",
  "..obmmbo.",
  ".obmmmmbo",
  ".obmmmmbo",
  ".obmmmbo.",
  "..obmbo..",
  "...obo...",
  "..ww.....",
  ".ww......",
] as const;

export const hunger = pixelSprite(HUNGER_ROWS, {
  b: MEAT_DARK,
  m: MEAT,
  o: OUTLINE,
  w: BONE,
});

/**
 * 空饥饿值（容器灰）
*/
export const hungerEmpty = pixelSprite(HUNGER_ROWS, {
  b: "#3A3A3A",
  m: "#4A4A4A",
  o: OUTLINE,
  w: "#5A5A5A",
});

/**
 * 半饥饿值（左半肉色 / 右半容器灰）
*/
export const hungerHalf = pixelSprite(
  [
    "...oooo..",
    "..obmmdo.",
    ".obmmmmdo",
    ".obmmmmdo",
    ".obmmmdo.",
    "..obmdo..",
    "...obo...",
    "..ww.....",
    ".ww......",
  ],
  { b: MEAT_DARK, d: "#4A4A4A", m: MEAT, o: OUTLINE, w: BONE },
);

/**
 * 护甲值（9×9，胸甲）
*/
const ARMOR_ROWS = [
  ".o.....o.",
  "oro...oro",
  "orrooorro",
  "orrrrrrro",
  "orrrrrrro",
  ".orrrrro.",
  ".orrrrro.",
  "..orrro..",
  "...oro...",
] as const;

export const armor = pixelSprite(ARMOR_ROWS, { o: OUTLINE, r: IRON });

/**
 * 空护甲值（容器灰）
*/
export const armorEmpty = pixelSprite(ARMOR_ROWS, {
  o: OUTLINE,
  r: "#4A4A4A",
});

/**
 * 半护甲值（左半铁色 / 右半容器灰）
*/
export const armorHalf = pixelSprite(
  [
    ".o.....o.",
    "oro...odo",
    "orroooddd",
    "orrrrdddd",
    "orrrrdddd",
    ".orrrrdo.",
    ".orrrrdo.",
    "..orrdo..",
    "...oro...",
  ],
  { d: "#4A4A4A", o: OUTLINE, r: IRON },
);

/**
 * 经验（7×7，经验球）
*/
export const xpOrb = pixelSprite(
  [
    "..ooo..",
    ".oxxxo.",
    "oxwhxxo",
    "oxxxxxo",
    "oxxdxxo",
    ".oxddo.",
    "..ooo..",
  ],
  { d: XP_DARK, o: XP_DARK, w: XP_LIGHT, x: XP },
);

/*
---- 方块图标 ----
*/

/**
 * 草方块（16×16）
*/
export const grassBlock = pixelSprite(
  [
    "GGGgGGGGGGgGGGGG",
    "GGGGGgGGGGGGGgGG",
    "GgGGGGGGgGGGGGGG",
    "DDdDDDDDdDDDDdDD",
    "DDDDDDDDDDDDDDDD",
    "dDDDDdDDDDDDdDDD",
    "DDDdDDDDDDdDDDDD",
    "DDDDDDDDDDDDDDDD",
    "DDDDdDDDDDDDDdDD",
    "dDDDDDDDDdDDDDDD",
    "DDDDDDDdDDDDDDDD",
    "DDdDDDDDDDDDDdDD",
    "DDDDDDdDDDDDDDDD",
    "dDDDDDDDDdDDDDDD",
    "DDDDdDDDDDDDDDDD",
    "DDDDDDDDDDDDDdDD",
  ],
  { D: DIRT, d: DIRT_DARK, G: GRASS, g: GRASS_DARK },
);

/**
 * 石头（16×16）
*/
export const stoneBlock = pixelSprite(
  [
    "SSSSSSSsSSSSSSSS",
    "SSsSSSSSSSSsSSSS",
    "SSSSSSsSSSSSSSSS",
    "SsSSSSSSSSSsSSSS",
    "SSSSSsSSSSSSSSSS",
    "SSSSSSSSsSSSsSSS",
    "SsSSSSSSSSSSSSSS",
    "SSSSSsSSSSSSSSSs",
    "SSSSSSSSSSsSSSSS",
    "SsSSSSsSSSSSSSSS",
    "SSSSSSSSSSSsSSSS",
    "SSSsSSSSSSSSSSsS",
    "SSSSSSSsSSSSSSSS",
    "SSSSSSSSSSsSSSSS",
    "SsSSSSSSSSSSSSSS",
    "SSSSSsSSSsSSSSSS",
  ],
  { S: STONE, s: STONE_DARK },
);

/**
 * 泥土（16×16）
*/
export const dirtBlock = pixelSprite(
  [
    "DDdDDDDdDDDDdDDD",
    "dDDDDDDDDDDDDDDd",
    "DDDDDdDDDDDdDDDD",
    "DDDDDDDDDDDDDDDD",
    "dDDDDDDDDdDDDDdD",
    "DDDDdDDDDDDDDDDD",
    "DDDDDDDDDDDdDDDD",
    "DDdDDDDdDDDDDDDD",
    "DDDDDDDDDDDDDDdD",
    "dDDDDDDDDdDDDDDD",
    "DDDDDdDDDDDDDdDD",
    "DDDDDDDDDDDDDDDD",
    "DDdDDDDDDdDDDDDD",
    "DDDDDdDDDDDDDDDD",
    "dDDDDDDDDDDdDDdD",
    "DDDDDDDDdDDDDDDD",
  ],
  { D: DIRT, d: DIRT_DARK },
);

/*
---- 物品图标 ----
*/

/**
 * 苹果（9×9）
*/
export const apple = pixelSprite(
  [
    "....s....",
    "...ss....",
    ".oorrroo.",
    "orrrrrrro",
    "orwrrrrro",
    "orrrrrrro",
    "orrrrrrro",
    ".orrrrro.",
    "..ooooo..",
  ],
  { o: OUTLINE, r: APPLE_RED, s: LEAF, w: APPLE_HIGHLIGHT },
);

/**
 * 钻石（9×9）
*/
export const diamond = pixelSprite(
  [
    "..ooooo..",
    ".odddddo.",
    "odddddddo",
    "oddwddddo",
    ".odddddo.",
    "..oddo...",
    "...oo....",
  ],
  { d: DIAMOND, o: DIAMOND_DARK, w: DIAMOND_LIGHT },
);

/**
 * 铁剑（10×10，斜置）
*/
export const sword = pixelSprite(
  [
    ".......oo.",
    "......oIIo",
    ".....oIIIo",
    "....oIIIo.",
    "...oIIIo..",
    "..oIIIo...",
    ".ooIIo....",
    "oBBo......",
    "oBoo......",
    ".o........",
  ],
  { B: MEAT_DARK, I: IRON, o: OUTLINE },
);

/*
---- 生物图标 ----
*/

/**
 * 苦力怕（9×9 脸）
*/
export const creeperFace = pixelSprite(
  [
    "occccccco",
    "occccccco",
    "ockkcckko",
    "ockkcckko",
    "occckccco",
    "occckccco",
    "occkckcco",
    "occkckcco",
    "occkckcco",
  ],
  { c: CREEPER, k: OUTLINE, o: OUTLINE },
);

/**
 * 图标注册表：名称 → SVG 字符串
*/
export const pixelIcons = {
  apple,
  armor,
  "armor-empty": armorEmpty,
  "armor-half": armorHalf,
  "creeper-face": creeperFace,
  diamond,
  "dirt-block": dirtBlock,
  "grass-block": grassBlock,
  heart,
  "heart-empty": heartEmpty,
  "heart-half": heartHalf,
  hunger,
  "hunger-empty": hungerEmpty,
  "hunger-half": hungerHalf,
  "stone-block": stoneBlock,
  sword,
  "xp-orb": xpOrb,
} as const;

export type PixelIconName = keyof typeof pixelIcons;
