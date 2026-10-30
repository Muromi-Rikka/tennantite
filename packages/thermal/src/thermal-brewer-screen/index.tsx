import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalBrewerScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 酿造机（MachineBrewerScreen：输入槽 (61,25)、medium 输入/产物流体罐 (34,22)/(125,22)、PROG_DROP_RIGHT (87,35)、scale_alchemy (61,44)）。数据注入、无游戏逻辑。
 */
export function ThermalBrewerScreen(props: ThermalBrewerScreenProps) {
  return <ThermalMachineScreen {...props} machine="brewer" />;
}
