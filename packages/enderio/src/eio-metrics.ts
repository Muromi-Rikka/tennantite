/**
 * Ender IO 26.3 布局常量（坐标为面板 GUI px，1 源 px = 1 GUI px）。
 */

/**
 * 原版容器标签 / `CommonColors.DARK_GRAY`
 */
export const EIO_TEXT_COLOR = "#404040";

/**
 * `ExperienceCraftingWidget` 等级数字
 */
export const EIO_XP_TEXT_COLOR = "#80ff20";

/**
 * 原版容器槽框边长
 */
export const EIO_SLOT_SIZE = 18;

/**
 * 原版 16×16 图标 / 按钮
 */
export const EIO_ICON_SIZE = 16;

/**
 * `sprites/widget/energy_bar_fill` 电容款能量条
 */
export const EIO_ENERGY_CAPACITOR = { height: 52, width: 18 } as const;

/**
 * 研磨球耐久条（`sprites/screen/sag_mill/grinding_ball_durability` 5 宽，绘制 4）
 */
export const EIO_GRINDING_BALL = { height: 16, width: 4 } as const;

/**
 * 原版 HUD 经验条
 */
export const EIO_EXPERIENCE_BAR = { height: 5, width: 65 } as const;
