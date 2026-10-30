import { IeEnergyBar } from "./index";

/**
 * IeEnergyBar 预览用例：弧光炉能量区（7×46）60% 与 90% 存量。
 */
export function IeEnergyBarDemo() {
  return (
    <div className="relative h-32 w-24">
      <IeEnergyBar label="能量" left={10} max={40000} top={10} value={24000} />
      <IeEnergyBar label="能量（高）" left={40} max={40000} top={10} value={36000} />
    </div>
  );
}
