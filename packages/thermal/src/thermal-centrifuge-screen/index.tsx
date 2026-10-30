import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalCentrifugeScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 离心机（MachineCentrifugeScreen：输入槽 (43,25)、4×18 产物槽、medium 流体罐 (151,22)、流体进度箭头 (72,35)、scale_spin (43,44)）。数据注入、无游戏逻辑。
 */
export function ThermalCentrifugeScreen(props: ThermalCentrifugeScreenProps) {
  return <ThermalMachineScreen {...props} machine="centrifuge" />;
}
