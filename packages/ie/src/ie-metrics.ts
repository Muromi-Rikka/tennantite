/**
 * IE（Immersive Engineering 1.21.1）布局常量（坐标为面板 GUI px，1 源 px = 1 GUI px）。
 * 来源：`blusunrize.immersiveengineering.client.gui.*` 的 Screen/Menu 坐标与贴图实测。
 */

/**
 * IE 界面文字：`Lib.COLOUR_I_ImmersiveOrange = 0xfff78034`
*/
export const IE_TEXT_COLOR = "#f78034";

/**
 * 能量填充渐变（EnergyInfoArea#draw 的 fillGradient 0xffb51500 → 0xff600b00）
*/
export const IE_ENERGY_GRADIENT = { from: "#b51500", to: "#600b00" } as const;

/**
 * EnergyInfoArea 默认区域：7×46
*/
export const IE_ENERGY_BAR = { height: 46, width: 7 } as const;

/**
 * 槽位边长（vanilla 容器槽框）
*/
export const IE_SLOT_SIZE = 18;

/**
 * 弧光炉进度条（sprites/arc_furnace/progress 3×16，绘制 2×16）
*/
export const IE_ARC_PROGRESS = { drawWidth: 2, height: 16, width: 3 } as const;

/**
 * 焦炉火焰（sprites/coke_oven/flame 9×12）
*/
export const IE_FLAME = { height: 12, width: 9 } as const;
