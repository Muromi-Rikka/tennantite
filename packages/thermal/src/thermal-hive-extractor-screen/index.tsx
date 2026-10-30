import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalHiveExtractorScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 蜂巢采集器（DeviceHiveExtractorScreen：medium 流体罐 (116,22)）。数据注入、无游戏逻辑。
 */
export function ThermalHiveExtractorScreen(props: ThermalHiveExtractorScreenProps) {
  return <ThermalMachineScreen {...props} machine="hive_extractor" />;
}
