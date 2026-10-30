import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalCrucibleScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 熔解炉（MachineCrucibleScreen：输入槽 (52,25)、medium 产物流体罐 (125,22)、PROG_DROP_RIGHT (84,35)、scale_flame (52,44)）。数据注入、无游戏逻辑。
 */
export function ThermalCrucibleScreen(props: ThermalCrucibleScreenProps) {
  return <ThermalMachineScreen {...props} machine="crucible" />;
}
