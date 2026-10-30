import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalSoilInfuserScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 土壤培肥机（DeviceSoilInfuserScreen：能量表 (8,8)、scale_flame_green 16×16 进度元素 (44,34)、范围文本 (70,39)）。数据注入、无游戏逻辑。
 */
export function ThermalSoilInfuserScreen(props: ThermalSoilInfuserScreenProps) {
  return <ThermalMachineScreen {...props} machine="soil_infuser" />;
}
