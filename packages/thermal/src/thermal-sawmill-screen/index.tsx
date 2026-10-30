import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalSawmillScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 锯木机（MachineSawmillScreen：输入槽 (43,25)、4×18 产物槽、进度箭头 (72,35)、scale_saw 速度元素 (44,44)）。数据注入、无游戏逻辑。
 */
export function ThermalSawmillScreen(props: ThermalSawmillScreenProps) {
  return <ThermalMachineScreen {...props} machine="sawmill" />;
}
