import type { ScreenSlot } from "@tennantite/ui";

export const FD_DEMO_ITEMS = {
  apple: { icon: "apple" },
  charcoal: { icon: "charcoal" },
  emerald: { icon: "emerald" },
  gunpowder: { count: 2, icon: "gunpowder" },
  ironIngot: { icon: "iron-ingot" },
  potion: { icon: "potion" },
  wheat: { count: 3, icon: "wheat" },
} satisfies Record<string, ScreenSlot>;
