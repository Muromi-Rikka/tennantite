import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalWaterGenScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 集水器（DeviceWaterGenScreen：medium 流体罐 (116,22)）。数据注入、无游戏逻辑。
 */
export function ThermalWaterGenScreen(props: ThermalWaterGenScreenProps) {
  return <ThermalMachineScreen {...props} machine="water_gen" />;
}
