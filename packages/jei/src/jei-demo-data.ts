import type { ScreenSlot } from "@tennantite/ui";

/**
 * JEI 示例共用物品数据（官网/playground 预览用，非组件 API）。
 */
export const JEI_DEMO_IRON_INGOT: ScreenSlot = { count: 32, icon: "iron-ingot", tooltip: "铁锭" };
export const JEI_DEMO_GOLD_INGOT: ScreenSlot = { count: 8, icon: "gold-ingot", tooltip: "金锭" };
export const JEI_DEMO_IRON_ORE: ScreenSlot = { icon: "iron-ore", tooltip: "铁矿石" };
export const JEI_DEMO_DIAMOND: ScreenSlot = { icon: "diamond", tooltip: "钻石" };
export const JEI_DEMO_CHARCOAL: ScreenSlot = { count: 16, icon: "charcoal", tooltip: "木炭" };

export const JEI_DEMO_PAGE_ITEMS: ScreenSlot[] = [
  JEI_DEMO_IRON_INGOT,
  JEI_DEMO_GOLD_INGOT,
  JEI_DEMO_IRON_ORE,
  JEI_DEMO_DIAMOND,
  JEI_DEMO_CHARCOAL,
];
