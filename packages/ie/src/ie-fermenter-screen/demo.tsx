import { IeFermenterScreen } from "./index";

/**
 * IeFermenterScreen 预览用例：甘蔗 → 80mB 乙醇，罐 80 / 8000，能量 12000 / 32000。
 */
export function IeFermenterScreenDemo() {
  return (
    <IeFermenterScreen
      bucketOutput={undefined}
      energy={{ max: 32000, value: 12000 }}
      fluidContainer={{ icon: "potion", tooltip: "空桶" }}
      inputs={[{ count: 1, icon: "sugar-cane", tooltip: "甘蔗" }, null, null, null, null, null, null, null]}
      onSlotClick={() => {}}
      output={undefined}
      tank={{ max: 8000, tint: "#c8a014", value: 80 }}
    />
  );
}
