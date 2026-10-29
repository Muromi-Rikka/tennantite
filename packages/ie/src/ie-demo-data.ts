import type { ScreenSlot } from "@tennantite/ui";

/**
 * IE 示例共用物品数据（官网/playground 预览用，非组件 API）。
 */
export const IE_DEMO_COAL: ScreenSlot = { count: 12, icon: "charcoal", tooltip: "煤炭" };
export const IE_DEMO_COKE: ScreenSlot = { count: 8, icon: "charcoal", tooltip: "焦炭" };
export const IE_DEMO_BUCKET: ScreenSlot = { icon: "potion", tooltip: "空桶" };
export const IE_DEMO_CREOSOTE_BUCKET: ScreenSlot = { icon: "potion", tooltip: "木焦油桶" };
export const IE_DEMO_IRON_INGOT: ScreenSlot = { count: 6, icon: "iron-ingot", tooltip: "铁锭" };
export const IE_DEMO_IRON_ORE: ScreenSlot = { count: 24, icon: "iron-ore", tooltip: "铁矿石" };
export const IE_DEMO_GRAPHITE: ScreenSlot = { icon: "charcoal", tooltip: "石墨电极" };
export const IE_DEMO_MOLD: ScreenSlot = { icon: "iron-ingot", tooltip: "冲压模具" };
export const IE_DEMO_SLAG: ScreenSlot = { count: 4, icon: "iron-ore", tooltip: "炉渣" };

export const ieDemoTwelve = <T>(value: T): Array<null | T> => Array.from({ length: 12 }, () => value);
