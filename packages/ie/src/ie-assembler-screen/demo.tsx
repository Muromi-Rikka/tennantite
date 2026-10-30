import { IeAssemblerScreen } from "./index";

interface IeAssemblerScreenDemoProps {
  energy?: { max: number; value: number };
}

/**
 * IeAssemblerScreen 预览用例：铁机械零件图纸（2 铁板 + 1 铜锭），能量 62%。
 */
export function IeAssemblerScreenDemo({ energy = { max: 32000, value: 20000 } }: IeAssemblerScreenDemoProps = {}) {
  return (
    <IeAssemblerScreen
      energy={energy}
      onClear={() => {}}
      onRecursiveToggle={() => {}}
      onSlotClick={() => {}}
      outputs={[{ count: 1, icon: "iron-ingot", tooltip: "铁机械零件" }, null, null]}
      patterns={[[
        { count: 2, icon: "iron-ingot", tooltip: "铁板" },
        { count: 1, icon: "copper-ingot", tooltip: "铜锭" },
      ]]}
      recursive
      storage={[
        { count: 64, icon: "iron-ingot", tooltip: "铁板" },
        { count: 64, icon: "copper-ingot", tooltip: "铜锭" },
        ...Array.from({ length: 16 }, () => null),
      ]}
      tankValues={[
        { max: 8000, tint: "#3a5cc8", value: 4000 },
        null,
        { max: 8000, tint: "#7a8f3a", value: 6000 },
      ]}
    />
  );
}
