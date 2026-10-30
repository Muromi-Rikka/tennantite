import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalFisherScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 捕鱼装置（DeviceFisherScreen：鱼饵槽 (25,34)、5×3 收获槽阵 (61+18j,16+18i)）。数据注入、无游戏逻辑。
 */
export function ThermalFisherScreen(props: ThermalFisherScreenProps) {
  return <ThermalMachineScreen {...props} machine="fisher" />;
}
