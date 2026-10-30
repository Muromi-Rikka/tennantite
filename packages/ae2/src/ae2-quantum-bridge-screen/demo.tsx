import { Ae2QuantumBridgeScreen } from "./index";

/**
 * Ae2QuantumBridgeScreen 预览用例：奇点已放置，量子卡槽启用。
 */
export function Ae2QuantumBridgeScreenDemo() {
  return (
    <Ae2QuantumBridgeScreen
      card={{ icon: "emerald", tooltip: "量子卡" }}
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 18 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
      singularity={{ icon: "diamond", tooltip: "量子纠缠奇点" }}
    />
  );
}
