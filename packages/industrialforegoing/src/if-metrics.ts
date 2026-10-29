import type { IndustrialForegoingSpriteName } from "@tennantite/textures";

/**
 * Industrial Foregoing 1.21 布局常量（坐标为面板 GUI px，1 源 px = 1 GUI px）。
 *
 * 上游机器界面复用 Titanium 4.x 的通用 176×184 背景；IF 自带的两张图集只提供
 * 按钮 / 仪表 / 徽标。坐标取自 Titanium `DefaultAssetProvider`、
 * `SlotsScreenAddon`、`TankScreenAddon`、`EnergyBarScreenAddon`、
 * `ProgressBarComponent`、`SidedInventoryComponent`、`MachineTile`、
 * `IndustrialMachineTile`、`DonationGuiAddon` 与 `TextScreenAddon`。
 */

/**
 * 原版容器标签 / `TextScreenAddon` 默认色
 */
export const IF_TEXT_COLOR = "#404040";

/**
 * 原版槽框边长（槽框画在物品左上 -1,-1）
 */
export const IF_SLOT_SIZE = 18;

/**
 * 16×16 物品 / 图标
 */
export const IF_ITEM_SIZE = 16;

/**
 * 根容器宽：176 主面板 + 左侧 22 捐赠徽标 + 右侧 29 升级 / 流体面板。
 * 主面板在根容器内偏移 22，避免预览容器裁掉外框。
 */
export const IF_SCREEN_WIDTH = 227;

/**
 * 主面板宽 / 高（Titanium `IBackgroundAsset`）
 */
export const IF_PANEL_WIDTH = 176;
export const IF_PANEL_HEIGHT = 184;

/**
 * 主面板在根容器内的左边距
 */
export const IF_PANEL_LEFT = 22;

/**
 * 玩家背包（背景已烘焙槽框）
 */
export const IF_PLAYER = { hotbarY: 160, left: 8, top: 102 } as const;

/**
 * 标题
 */
export const IF_TITLE_TOP = 6;

/**
 * 升级面板 / 流体面板
 */
export const IF_AUGMENT_PANEL = { left: 175, top: 4 } as const;
export const IF_TANK_PANEL = { left: 175, top: 94 } as const;
export const IF_AUGMENT_SLOTS = [11, 29, 47, 65] as const;

/**
 * 捐赠徽标
 */
export const IF_DONATE = { left: -22, top: 4 } as const;
export const IF_DONATE_FOOT = { left: -22, top: 26 } as const;
export const IF_DONATE_ICON = { left: -17, top: 9 } as const;

/**
 * 能量条
 */
export const IF_ENERGY = { left: 10, top: 20 } as const;

/**
 * 基础竖条
 */
export const IF_BAR = { left: 30, top: 20 } as const;

/**
 * 红石按钮
 */
export const IF_REDSTONE = { left: 154, top: 84 } as const;

/**
 * 区域 / 粒子按钮
 */
export const IF_AREA_BUTTON = { left: 136, top: 84 } as const;
export const IF_PARTICLE_BUTTON = { left: 118, top: 84 } as const;

/**
 * 面配置按钮起点：x = 8 + 18 * facing，y = 84
 */
export const IF_FACE_BUTTON = { left: 8, step: 18, top: 84 } as const;

/**
 * 菌丝发电机底框与注入图标（上游 `GeneratorBackgroundScreenAddon`
 * 把 4× 物品画到面板外；这里按视觉意图收进面板内）
 */
export const IF_GENERATOR_FRAME = { left: 104, size: 64, top: 15 } as const;
export const IF_GENERATOR_ICON = { left: 128, top: 39 } as const;

export type IfDyeColor
  = | "black"
    | "blue"
    | "brown"
    | "cyan"
    | "gray"
    | "green"
    | "light_blue"
    | "light_gray"
    | "lime"
    | "magenta"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "white"
    | "yellow";

/**
 * `SidedInventoryComponent.setColor(DyeColor)` → `getMapColor().col`（槽位遮罩）
 */
export const IF_DYE_MAP: Record<IfDyeColor, string> = {
  black: "#191919",
  blue: "#334CB2",
  brown: "#664C33",
  cyan: "#4C7F99",
  gray: "#4C4C4C",
  green: "#667F33",
  light_blue: "#6699D8",
  light_gray: "#999999",
  lime: "#7FCC19",
  magenta: "#B24CD8",
  orange: "#D87F33",
  pink: "#F27FA5",
  purple: "#7F3FB2",
  red: "#993333",
  white: "#FFFFFF",
  yellow: "#E5E533",
};

/**
 * `FilterSlot.setColor(DyeColor)`（过滤槽 16×16 覆盖层）
 */
export const IF_DYE_FIREWORK: Record<IfDyeColor, string> = {
  black: "#1D1D21",
  blue: "#3C44AA",
  brown: "#835432",
  cyan: "#169C9C",
  gray: "#474F52",
  green: "#5E7C16",
  light_blue: "#3AB3DA",
  light_gray: "#9D9D97",
  lime: "#80C71F",
  magenta: "#C74EBD",
  orange: "#F9801D",
  pink: "#F38BAA",
  purple: "#8932B8",
  red: "#B02E26",
  white: "#F9FFFE",
  yellow: "#FED83D",
};

/**
 * `ProgressBarComponent` 染色（填充层 multiply）
 */
export const IF_DYE_DIFFUSE: Record<IfDyeColor, string> = {
  black: "#1E1B1B",
  blue: "#253192",
  brown: "#51301A",
  cyan: "#287697",
  gray: "#434343",
  green: "#3B511A",
  light_blue: "#6689D3",
  light_gray: "#ABABAB",
  lime: "#41CD34",
  magenta: "#C354CD",
  orange: "#EB8844",
  pink: "#D88198",
  purple: "#7B2FBE",
  red: "#B3312C",
  white: "#F0F0F0",
  yellow: "#DECF2A",
};

export interface IfCrop {
  height: number;
  sprite: IndustrialForegoingSpriteName;
  width: number;
  x: number;
  y: number;
}

/**
 * 上游图集裁剪表（源 px）
 */
export const IF_CROPS = {
  arrowBg: { height: 15, sprite: "titanium_background", width: 22, x: 177, y: 61 },
  arrowDown: { height: 14, sprite: "titanium_background", width: 14, x: 207, y: 151 },
  arrowDownBg: { height: 23, sprite: "titanium_background", width: 15, x: 221, y: 185 },
  arrowDownFill: { height: 23, sprite: "titanium_background", width: 15, x: 221, y: 211 },
  arrowFill: { height: 16, sprite: "titanium_background", width: 22, x: 177, y: 77 },
  arrowLeft: { height: 14, sprite: "titanium_background", width: 14, x: 222, y: 151 },
  arrowRight: { height: 14, sprite: "titanium_background", width: 14, x: 192, y: 151 },
  arrowUp: { height: 14, sprite: "titanium_background", width: 14, x: 177, y: 151 },
  augmentPanel: { height: 84, sprite: "titanium_background", width: 30, x: 212, y: 61 },
  barBg: { height: 50, sprite: "titanium_background", width: 5, x: 229, y: 1 },
  barBorder: { height: 56, sprite: "titanium_background", width: 11, x: 211, y: 1 },
  barFill: { height: 50, sprite: "titanium_background", width: 5, x: 223, y: 1 },
  donateBg: { height: 22, sprite: "titanium_background_alt", width: 22, x: 0, y: 0 },
  donateFoot: { height: 3, sprite: "titanium_background_alt", width: 22, x: 0, y: 81 },
  donateIcon: { height: 15, sprite: "donate", width: 15, x: 0, y: 0 },
  enchantIcon: { height: 14, sprite: "machines", width: 14, x: 96, y: 233 },
  energyFill: { height: 50, sprite: "titanium_background", width: 12, x: 196, y: 97 },
  energyFrame: { height: 56, sprite: "titanium_background", width: 18, x: 177, y: 94 },
  fermProc2: { height: 14, sprite: "machines_extra", width: 14, x: 15, y: 45 },
  fermProc3: { height: 14, sprite: "machines_extra", width: 14, x: 15, y: 30 },
  fermProc4: { height: 14, sprite: "machines_extra", width: 14, x: 15, y: 15 },
  fermProc5: { height: 14, sprite: "machines_extra", width: 14, x: 15, y: 0 },
  fermTankFull: { height: 14, sprite: "machines_extra", width: 14, x: 0, y: 0 },
  fermTankHalf: { height: 14, sprite: "machines_extra", width: 14, x: 0, y: 15 },
  fermTankOne: { height: 14, sprite: "machines_extra", width: 14, x: 0, y: 30 },
  generatorFrame: { height: 64, sprite: "titanium_background", width: 64, x: 4, y: 4 },
  hideArea: { height: 14, sprite: "machines", width: 14, x: 78, y: 1 },
  hideParticle: { height: 14, sprite: "machines", width: 14, x: 95, y: 49 },
  itemBackground: { height: 18, sprite: "titanium_background", width: 18, x: 177, y: 166 },
  lockLocked: { height: 14, sprite: "titanium_background", width: 14, x: 241, y: 196 },
  lockUnlocked: { height: 14, sprite: "titanium_background", width: 14, x: 241, y: 181 },
  machineBackground: { height: 184, sprite: "titanium_background", width: 176, x: 0, y: 0 },
  redstoneIgnored: { height: 14, sprite: "titanium_background", width: 14, x: 196, y: 166 },
  redstoneNo: { height: 14, sprite: "titanium_background", width: 14, x: 226, y: 166 },
  redstoneOnce: { height: 14, sprite: "titanium_background", width: 14, x: 241, y: 166 },
  redstoneYes: { height: 14, sprite: "titanium_background", width: 14, x: 211, y: 166 },
  showArea: { height: 14, sprite: "machines", width: 14, x: 78, y: 17 },
  showParticle: { height: 14, sprite: "machines", width: 14, x: 95, y: 33 },
  sideDisabled: { height: 14, sprite: "titanium_background", width: 14, x: 196, y: 1 },
  sideEnabled: { height: 14, sprite: "titanium_background", width: 14, x: 196, y: 16 },
  sideManager: { height: 14, sprite: "titanium_background", width: 14, x: 1, y: 231 },
  sidePull: { height: 14, sprite: "titanium_background", width: 14, x: 196, y: 31 },
  sidePush: { height: 14, sprite: "titanium_background", width: 14, x: 196, y: 46 },
  slot: { height: 18, sprite: "titanium_background", width: 18, x: 1, y: 185 },
  tankNormal: { height: 56, sprite: "titanium_background", width: 18, x: 177, y: 1 },
  tankSmall: { height: 19, sprite: "titanium_background", width: 18, x: 235, y: 1 },
  textFieldActive: { height: 16, sprite: "titanium_background", width: 110, x: 31, y: 240 },
  textFieldInactive: { height: 16, sprite: "titanium_background", width: 110, x: 142, y: 240 },
} as const satisfies Record<string, IfCrop>;

export type IfCropKey = keyof typeof IF_CROPS;

export type IfFaceMode = "disabled" | "enabled" | "pull" | "push";
