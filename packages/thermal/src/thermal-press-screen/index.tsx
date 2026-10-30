import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalPressScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 压缩机（MachinePressScreen：上/下输入槽 (52,16)/(52,52)、26×26 产物槽 (111,30)、medium 产物流体罐 (151,22)、流体进度箭头 (78,35)、scale_compact (52,35)）。数据注入、无游戏逻辑。
 */
export function ThermalPressScreen(props: ThermalPressScreenProps) {
  return <ThermalMachineScreen {...props} machine="press" />;
}
