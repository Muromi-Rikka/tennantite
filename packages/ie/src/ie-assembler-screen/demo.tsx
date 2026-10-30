import type { ScreenSlot } from "@tennantite/ui";

import { IeAssemblerScreen } from "./index";

/**
 * IeAssemblerScreen 预览用例：3 组配方（2 组有料）、递归开启、能量 62%。
 */
export function IeAssemblerScreenDemo() {
  const pattern = (isFilled: boolean): Array<null | ScreenSlot> =>
    Array.from({ length: 9 }, (_, i) => isFilled && i < 5 ? { count: 8, icon: "iron-ingot", tooltip: "铁锭" } : null);
  return (
    <IeAssemblerScreen
      energy={{ max: 32000, value: 20000 }}
      onClear={() => {}}
      onRecursiveToggle={() => {}}
      onSlotClick={() => {}}
      outputs={[{ count: 2, icon: "iron-ingot", tooltip: "铁块" }, null, null]}
      patterns={[pattern(true), pattern(false), pattern(true)]}
      recursive
      storage={Array.from({ length: 18 }, (_, i) => i < 8 ? { count: 24, icon: "iron-ore", tooltip: "铁矿" } : null)}
      tankValues={[
        { max: 8000, tint: "#3a5cc8", value: 4000 },
        null,
        { max: 8000, tint: "#7a8f3a", value: 6000 },
      ]}
    />
  );
}
