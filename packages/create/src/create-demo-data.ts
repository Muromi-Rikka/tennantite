import type { ScreenSlot } from "@tennantite/ui";

/**
 * Create 示例共用物品数据（官网/playground 预览用，非组件 API）。
 */
export const CREATE_DEMO_WHEAT: ScreenSlot = { count: 1, icon: "wheat", tooltip: "小麦" };
export const CREATE_DEMO_FLOUR: ScreenSlot = { count: 1, icon: "wheat", tooltip: "小麦面粉" };
export const CREATE_DEMO_INGOT: ScreenSlot = { count: 1, icon: "iron-ingot", tooltip: "铁锭" };

export const CREATE_DEMO_PLAYER = {
  hotbarItems: Array.from({ length: 9 }, (_, index) => (index === 0 ? CREATE_DEMO_INGOT : null)),
  mainItems: Array.from({ length: 27 }, (_, index) => (index === 3 ? CREATE_DEMO_WHEAT : null)),
} as const;
