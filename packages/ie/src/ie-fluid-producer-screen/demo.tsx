import { IeFluidProducerScreen } from "./index";

/**
 * IeFluidProducerScreen 预览用例：流体泵站，无物品配方；罐 40%，能量 55%。
 */
export function IeFluidProducerScreenDemo() {
  return (
    <IeFluidProducerScreen
      cell={undefined}
      energy={{ max: 32000, value: 17600 }}
      grid={[]}
      input={undefined}
      onSlotClick={() => {}}
      output={undefined}
      tank={{ max: 8000, tint: "#3a5cc8", value: 3200 }}
    />
  );
}
