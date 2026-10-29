/**
 * 原版容器标签色 (GuiGraphics 4210752)。
 */
export const FD_TEXT_COLOR = "#404040";

/**
 * 厨锅面板: 上游 blit(0, 0, 176, 166); titleLabelX = 28; 背包标签 (8, 166 - 96 + 2)。
 */
export const FD_COOKING_POT = {
  height: 166,
  inventoryLabel: { left: 8, top: 72 },
  panel: { height: 166, width: 176, x: 0, y: 0 },
  title: { left: 28, top: 6 },
  width: 176,
} as const;

/**
 * HEAT_ICON = (47, 55, 17, 15), 源图 (176, 0), 仅受热时绘制。
 */
export const FD_HEAT_ICON = {
  crop: { height: 15, width: 17, x: 176, y: 0 },
  height: 15,
  left: 47,
  top: 55,
  width: 17,
} as const;

/**
 * PROGRESS_ARROW = (89, 25), 源图 (176, 15, 24, 17), 自左向右填充。
 */
export const FD_COOK_PROGRESS = {
  crop: { height: 17, width: 24, x: 176, y: 15 },
  height: 17,
  left: 89,
  top: 25,
  width: 25,
} as const;

/**
 * 配方书按钮: 原版 sprites/recipe_book/button.png 20×18, 面板内固定 (5, 34)。
 */
export const FD_RECIPE_BOOK_BUTTON = {
  height: 18,
  left: 5,
  top: 34,
  width: 20,
} as const;

/**
 * 槽位 = 18×18 槽框左上角 (menu slot 坐标 - 1)。
 */
export const FD_COOKING_POT_SLOTS = [
  { label: "cooking-pot-input-0", left: 29, top: 16 },
  { label: "cooking-pot-input-1", left: 47, top: 16 },
  { label: "cooking-pot-input-2", left: 65, top: 16 },
  { label: "cooking-pot-input-3", left: 29, top: 34 },
  { label: "cooking-pot-input-4", left: 47, top: 34 },
  { label: "cooking-pot-input-5", left: 65, top: 34 },
  { label: "cooking-pot-meal", left: 123, top: 25 },
  { label: "cooking-pot-container", left: 91, top: 54 },
  { label: "cooking-pot-output", left: 123, top: 54 },
] as const;

export type FdCookingPotSlotLabel = (typeof FD_COOKING_POT_SLOTS)[number]["label"];

/**
 * 玩家背包 (PlayerInventory 默认 7 / 83 / 141, 与上游一致, 此处仅记录)。
 */
export const FD_PLAYER = { hotbarY: 141, left: 7, top: 83 } as const;

/**
 * fd_icons.png 裁剪: 饱食单元 9×9 步进 9; 舒适心形在 y = 9 行。
 */
export const FD_HUD_ICON = {
  comfortLeft: { height: 9, width: 5, x: 0, y: 9 },
  comfortRight: { height: 9, width: 4, x: 5, y: 9 },
  hungerEmpty: { height: 9, width: 9, x: 0, y: 0 },
  hungerFull: { height: 9, width: 9, x: 18, y: 0 },
  hungerFullRegen: { height: 9, width: 9, x: 36, y: 0 },
  hungerHalf: { height: 9, width: 9, x: 9, y: 0 },
  hungerHalfRegen: { height: 9, width: 9, x: 27, y: 0 },
} as const;

/**
 * HUD 图标数量与步进 (饱食 10 枚, 间距 8 px)。
 */
export const FD_HUD_ICON_COUNT = 10;
export const FD_HUD_ICON_STEP = 8;
