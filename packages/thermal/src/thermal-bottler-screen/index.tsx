import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalBottlerScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 灌装机（MachineBottlerScreen：输入槽 (61,25)、26×26 产物槽 (120,30)、medium 输入流体罐 (34,22)、流体进度箭头 (87,35)、scale_bubble (61,44)）。数据注入、无游戏逻辑。
 */
export function ThermalBottlerScreen(props: ThermalBottlerScreenProps) {
  return <ThermalMachineScreen {...props} machine="bottler" />;
}
