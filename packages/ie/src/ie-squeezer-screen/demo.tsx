import { IeSqueezerScreen } from "./index";

/**
 * IeSqueezerScreen 预览用例：小麦种子 → 80mB 植物油，罐 80 / 8000，能量 28000 / 32000。
 */
export function IeSqueezerScreenDemo() {
  return (
    <IeSqueezerScreen
      bucketOutput={undefined}
      energy={{ max: 32000, value: 28000 }}
      fluidContainer={{ icon: "potion", tooltip: "空桶" }}
      inputs={[{ count: 1, icon: "wheat-seeds", tooltip: "小麦种子" }, null, null, null, null, null, null, null]}
      onSlotClick={() => {}}
      output={undefined}
      tank={{ max: 8000, tint: "#c8a014", value: 80 }}
    />
  );
}
