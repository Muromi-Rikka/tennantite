import type { ScreenItem } from "../types";
import { InventoryScreen } from "./index";

function stone(count: number): ScreenItem {
  return {
    count,
    icon: "stone-block",
  };
}
const EMPTY = null;

/**
 * InventoryScreen 预览用例（规格 §6.2）
*/
export function InventoryScreenDemo() {
  return (
    <InventoryScreen
      armorItems={[
        null,
        { icon: "iron-chestplate" },
        null,
        null,
      ]}
      craftItems={[
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
        { count: 1, icon: "oak-planks" },
      ]}
      craftResult={{ count: 1, icon: "crafting-table", tooltip: "工作台" }}
      hotbarItems={[
        { count: 64, icon: "stone-block" },
        { icon: "grass-block" },
        { count: 12, icon: "diamond" },
        { icon: "sword" },
        { count: 5, icon: "apple" },
        EMPTY,
        { icon: "experience-bottle" },
        EMPTY,
        { icon: "gunpowder" },
      ]}
      mainItems={[
        stone(64),
        stone(32),
        null,
        { icon: "dirt-block" },
        null,
        null,
        stone(7),
      ]}
      selectedIndex={2}
    />
  );
}
