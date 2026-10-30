import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalComposterScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 堆肥机（DeviceComposterScreen：仅进度箭头 (87,35)，无槽位与能量表）。数据注入、无游戏逻辑。
 */
export function ThermalComposterScreen(props: ThermalComposterScreenProps) {
  return <ThermalMachineScreen {...props} machine="composter" />;
}
