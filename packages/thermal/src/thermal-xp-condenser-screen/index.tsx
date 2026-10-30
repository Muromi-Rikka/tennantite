import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalXpCondenserScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 经验冷凝器（DeviceXpCondenserScreen：medium 流体罐 (80,22)）。数据注入、无游戏逻辑。
 */
export function ThermalXpCondenserScreen(props: ThermalXpCondenserScreenProps) {
  return <ThermalMachineScreen {...props} machine="xp_condenser" />;
}
