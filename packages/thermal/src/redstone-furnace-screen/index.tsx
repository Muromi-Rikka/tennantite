import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalRedstoneFurnaceScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 红石炉（MachineFurnaceScreen，ThermalExpansion 24a2675）：
 * 输入槽 (53,26)、26×26 产物槽 (111,30)、进度箭头 (79,35) 左→右、
 * 速度火焰 (53,44) 自下而上、左侧能量表 (8,8)、右侧强化面板页签。
 * 数据注入、无游戏逻辑。
 */
export function ThermalRedstoneFurnaceScreen(props: ThermalRedstoneFurnaceScreenProps) {
  return <ThermalMachineScreen {...props} machine="redstone_furnace" />;
}
