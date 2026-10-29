import type { ScreenSlot } from "@tennantite/ui";

/**
 * 演示用物品 / 流体。只使用仓库已有的物品图标，不伪造缺失图标。
 */
export const IF_DEMO_ITEMS = {
  apple: { icon: "apple" },
  charcoal: { icon: "charcoal" },
  diamond: { count: 3, icon: "diamond" },
  emerald: { icon: "emerald" },
  gunpowder: { count: 16, icon: "gunpowder" },
  potion: { icon: "potion" },
  sword: { icon: "sword" },
  wheat: { count: 8, icon: "wheat" },
} satisfies Record<string, ScreenSlot>;

export const IF_DEMO_FLUIDS = {
  biofuel: { max: 1000, tint: "#7B2FBE", value: 640 },
  essence: { max: 1000, tint: "#41CD34", value: 320 },
  latex: { max: 1000, tint: "#ABABAB", value: 480 },
  meat: { max: 1000, tint: "#835432", value: 275 },
  water: { max: 1000, tint: "#287697", value: 800 },
};
