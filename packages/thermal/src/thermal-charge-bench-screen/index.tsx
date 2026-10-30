import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalChargeBenchScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 充能台（ChargeBenchScreen：能量表 (8,8)、3×3 充能槽阵 (60+18j,16+18i)、充能槽 (7,52) 与取出槽 (151,52)）。数据注入、无游戏逻辑。
 */
export function ThermalChargeBenchScreen(props: ThermalChargeBenchScreenProps) {
  return <ThermalMachineScreen {...props} machine="charge_bench" />;
}
