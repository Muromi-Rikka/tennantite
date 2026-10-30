import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalPyrolyzerScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 热解炉（MachinePyrolyzerScreen：输入槽 (43,25)、4×18 产物槽、medium 产物流体罐 (151,22)、流体进度箭头 (71,35)、scale_flame (43,44)）。数据注入、无游戏逻辑。
 */
export function ThermalPyrolyzerScreen(props: ThermalPyrolyzerScreenProps) {
  return <ThermalMachineScreen {...props} machine="pyrolyzer" />;
}
