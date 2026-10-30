import { IeChunkLoaderScreen } from "./index";

/**
 * IeChunkLoaderScreen 预览用例：纸张就绪，能量 70%，刷新 40%。
 */
export function IeChunkLoaderScreenDemo() {
  return (
    <IeChunkLoaderScreen
      energy={{ max: 32000, value: 22400 }}
      entries={["矿井电梯（12, 64, -8）", "变电站（34, 70, 12）", "炼焦炉组（-20, 68, 4）"]}
      onSlotClick={() => {}}
      paper={{ icon: "charcoal", tooltip: "区块加载卡" }}
      refresh={0.4}
    />
  );
}
