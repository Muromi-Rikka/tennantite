import type { ScreenSlot } from "@tennantite/ui";

export const FD_DEMO_ITEMS = {
  apple: { icon: "apple" },
  bowl: { count: 1, icon: "bowl", tooltip: "碗" },
  brownMushroom: { count: 1, icon: "brown-mushroom", tooltip: "棕色蘑菇" },
  charcoal: { icon: "charcoal" },
  emerald: { icon: "emerald" },
  gunpowder: { count: 2, icon: "gunpowder" },
  ironIngot: { icon: "iron-ingot" },
  mushroomStew: { count: 1, icon: "mushroom-stew", tooltip: "蘑菇煲" },
  potion: { icon: "potion" },
  redMushroom: { count: 1, icon: "red-mushroom", tooltip: "红色蘑菇" },
  wheat: { count: 3, icon: "wheat" },
} satisfies Record<string, ScreenSlot>;
