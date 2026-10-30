import { Ae2SkyChestScreen } from "./index";

/**
 * Ae2SkyChestScreen 预览用例：空 36 格存储 + 满背包。
 */
export function Ae2SkyChestScreenDemo() {
  return (
    <Ae2SkyChestScreen
      hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
      mainItems={Array.from({ length: 27 }, (_, index) => ({ icon: index % 3 === 0 ? "gold-ingot" : (index % 3 === 1 ? "iron-ingot" : "diamond") }))}
    />
  );
}
