import type { ScreenSlot } from "@tennantite/ui";

/**
 * IE 示例共用物品数据（官网/playground 预览用，非组件 API）。
 */
export const IE_DEMO_BUCKET: ScreenSlot = { icon: "potion", tooltip: "空桶" };
export const IE_DEMO_IRON_INGOT: ScreenSlot = { count: 1, icon: "iron-ingot", tooltip: "铁锭" };
export const IE_DEMO_GRAPHITE: ScreenSlot = { icon: "charcoal", tooltip: "石墨电极" };
export const IE_DEMO_MOLD: ScreenSlot = { icon: "iron-ingot", tooltip: "金属冲压模具：板材" };
export const IE_DEMO_SLAG: ScreenSlot = { count: 1, icon: "stone-block", tooltip: "矿渣" };

export const ieDemoTwelve = <T>(value: T): Array<null | T> => Array.from({ length: 12 }, () => value);
