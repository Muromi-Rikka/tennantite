import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalPulverizerScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 粉碎机（MachinePulverizerScreen：双输入槽 (43,16)/(43,52)、4×18 产物槽、进度箭头 (72,35)、scale_crush 速度元素 (44,35)）。数据注入、无游戏逻辑。
 */
export function ThermalPulverizerScreen(props: ThermalPulverizerScreenProps) {
  return <ThermalMachineScreen {...props} machine="pulverizer" />;
}
