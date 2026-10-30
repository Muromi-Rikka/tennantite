import { Ae2SpatialIoPortScreen } from "./index";

/**
 * Ae2SpatialIoPortScreen 预览用例：3×4×3 有效区域，效率 92%。
 */
export function Ae2SpatialIoPortScreenDemo() {
  return (
    <Ae2SpatialIoPortScreen
      efficiency="92%"
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      input={{ icon: "emerald", tooltip: "空间存储元件" }}
      mainItems={Array.from({ length: 12 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      maxPower="10 kAE"
      output={{ icon: "diamond", tooltip: "已存储元件" }}
      regionSize="3x4x3"
      requiredPower="8.5 kAE"
      storedPower="6 kAE"
    />
  );
}
