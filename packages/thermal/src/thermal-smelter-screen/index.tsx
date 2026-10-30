import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalSmelterScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 感应冶炼炉（MachineSmelterScreen：3 输入 + 1 催化槽、4×18 产物槽、进度箭头 (94,35)、scale_flame 速度元素 (52,35)）。数据注入、无游戏逻辑。
 */
export function ThermalSmelterScreen(props: ThermalSmelterScreenProps) {
  return <ThermalMachineScreen {...props} machine="smelter" />;
}
