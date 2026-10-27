import { ScreenPanel } from "../screen-panel/index";
import { PlayerInventory } from "./index";

export function PlayerInventoryDemo() {
  return (
    <ScreenPanel height={166} title="物品栏" width={176}>
      <PlayerInventory
        hotbarItems={[
          { count: 64, icon: "stone-block" },
          { icon: "grass-block" },
          { count: 12, icon: "diamond" },
        ]}
        mainItems={[
          { count: 64, icon: "stone-block" },
          { count: 32, icon: "dirt-block" },
          null,
          { icon: "sword" },
        ]}
        selectedIndex={1}
      />
    </ScreenPanel>
  );
}
