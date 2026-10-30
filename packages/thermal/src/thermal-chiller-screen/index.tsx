import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalChillerScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 冷冻机（MachineChillerScreen：输入槽 (61,25)、26×26 产物槽 (120,30)、medium 流体罐 (34,22)、流体进度箭头 (87,35)、scale_snowflake (61,44)）。数据注入、无游戏逻辑。
 */
export function ThermalChillerScreen(props: ThermalChillerScreenProps) {
  return <ThermalMachineScreen {...props} machine="chiller" />;
}
