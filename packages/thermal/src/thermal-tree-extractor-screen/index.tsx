import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalTreeExtractorScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 树液采集器（DeviceTreeExtractorScreen：medium 流体罐 (116,22)、scale_flame_green 时长元素 (80,35)）。数据注入、无游戏逻辑。
 */
export function ThermalTreeExtractorScreen(props: ThermalTreeExtractorScreenProps) {
  return <ThermalMachineScreen {...props} machine="tree_extractor" />;
}
