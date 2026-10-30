import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalInsolatorScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 光合增幅机（MachineInsolatorScreen：上/下输入槽 (61,16)/(61,52)、4×18 产物槽、medium 流体罐 (34,22)、流体进度箭头 (84,35)、scale_sun (61,35)）。数据注入、无游戏逻辑。
 */
export function ThermalInsolatorScreen(props: ThermalInsolatorScreenProps) {
  return <ThermalMachineScreen {...props} machine="insolator" />;
}
