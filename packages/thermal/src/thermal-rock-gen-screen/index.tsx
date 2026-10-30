import type { ScreenSlot } from "@tennantite/ui";
import { ScreenItemSlot } from "@tennantite/ui";
import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export interface ThermalRockGenScreenProps extends Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
> {
  /**
   * 相邻方块展示（ElementBlock (55,24)，无槽框）
   */
  adjacent?: ScreenSlot;
  /**
   * 岩浆方块展示（ElementBlock (33,24)，无槽框）
   */
  lava?: ScreenSlot;
}

/**
 * Thermal 岩石生成器（DeviceRockGenScreen，ThermalCore cc7c230）：
 * 流体进度箭头 (84,35)、下方方块槽 (43,45)、
 * 岩浆 (33,24) 与相邻方块 (55,24) 的 ElementBlock 展示位。数据注入、无游戏逻辑。
 */
export function ThermalRockGenScreen({ adjacent, lava, ...props }: ThermalRockGenScreenProps) {
  return (
    <ThermalMachineScreen {...props} machine="rock_gen">
      <ScreenItemSlot frame={false} item={lava} label="rock-gen-lava" left={33} size={16} top={24} />
      <ScreenItemSlot frame={false} item={adjacent} label="rock-gen-adjacent" left={55} size={16} top={24} />
    </ThermalMachineScreen>
  );
}
