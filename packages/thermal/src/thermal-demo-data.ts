import type { ScreenSlot } from "@tennantite/ui";

/**
 * Thermal 示例共用物品数据（官网/playground 预览用，非组件 API）。
 */
export const THERMAL_DEMO_SMOOTH_STONE: ScreenSlot = { count: 4, icon: "stone-block", tooltip: "平滑石头" };

export const THERMAL_DEMO_PLAYER_MAIN: ScreenSlot[] = Array.from({ length: 27 }, (_, index) => (
  index === 0 ? { count: 8, icon: "charcoal", tooltip: "煤炭" } : null
));

export const THERMAL_DEMO_PLAYER_HOTBAR: ScreenSlot[] = Array.from({ length: 9 }, (_, index) => (
  index === 0 ? { count: 1, icon: "sword", tooltip: "铁剑" } : null
));
