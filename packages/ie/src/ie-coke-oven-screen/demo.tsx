import { IeCokeOvenScreen } from "./index";

/**
 * IeCokeOvenScreen 预览用例：8 橡木原木 → 木炭 + 250mB 杂酚油，炼焦 65%。
 */
export function IeCokeOvenScreenDemo() {
  return (
    <IeCokeOvenScreen
      bucketOutput={{ count: 1, icon: "potion", tooltip: "杂酚油桶" }}
      burn={0.65}
      fluidContainer={{ count: 1, icon: "potion", tooltip: "空桶" }}
      input={{ count: 8, icon: "oak-log", tooltip: "橡木原木 ×8" }}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "charcoal", tooltip: "木炭" }}
      tank={{ max: 8000, tint: "#6e5530", value: 250 }}
    />
  );
}
