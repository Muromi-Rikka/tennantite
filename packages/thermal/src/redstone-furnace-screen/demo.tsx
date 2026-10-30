import {
  THERMAL_DEMO_PLAYER_HOTBAR,
  THERMAL_DEMO_PLAYER_MAIN,
} from "../thermal-demo-data";
import { ThermalRedstoneFurnaceScreen } from "./index";

/**
 * 空载状态（强化面板关闭、无输入输出）。
 */
export function ThermalRedstoneFurnaceIdleDemo() {
  return (
    <ThermalRedstoneFurnaceScreen
      energy={{ amount: 80000, capacity: 400000 }}
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      onAugmentsToggle={() => {}}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
    />
  );
}

/**
 * ThermalRedstoneFurnaceScreen 预览用例：打开强化面板，铁矿石 → 铁锭，进度 0.5。
 */
export function ThermalRedstoneFurnaceScreenDemo() {
  return (
    <ThermalRedstoneFurnaceScreen
      augments={[
        { icon: "gunpowder", tooltip: "强化：处理速度" },
        { icon: "blaze-powder", tooltip: "强化：能量效率" },
        null,
        { icon: "lapis-lazuli", tooltip: "强化：次要输出" },
      ]}
      augmentsOpen
      energy={{ amount: 240000, capacity: 400000 }}
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      onAugmentsToggle={() => {}}
      onSlotClick={() => {}}
      output={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      playerHotbar={THERMAL_DEMO_PLAYER_HOTBAR}
      playerItems={THERMAL_DEMO_PLAYER_MAIN}
      progress={0.5}
      speed={0.75}
    />
  );
}
