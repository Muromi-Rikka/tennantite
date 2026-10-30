import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalCollectorScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 收集器（DeviceCollectorScreen：5×3 只取出槽阵 (43+18j,16+18i)，无输入/能量）。数据注入、无游戏逻辑。
 */
export function ThermalCollectorScreen(props: ThermalCollectorScreenProps) {
  return <ThermalMachineScreen {...props} machine="collector" />;
}
