import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalRefineryScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 精炼机（MachineRefineryScreen：26×26 产物槽 (102,30)、small 输入流体罐 (34,17) + 2×medium 产物罐 (133/151,22)、PROG_DROP_RIGHT (64,35)、scale_flame (34,52)）。数据注入、无游戏逻辑。
 */
export function ThermalRefineryScreen(props: ThermalRefineryScreenProps) {
  return <ThermalMachineScreen {...props} machine="refinery" />;
}
