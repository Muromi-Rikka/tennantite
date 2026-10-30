import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalPotionDiffuserScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 药水扩散器（DevicePotionDiffuserScreen：medium 流体罐 (116,22)、scale_alchemy 时长元素 (80,35)）。数据注入、无游戏逻辑。
 */
export function ThermalPotionDiffuserScreen(props: ThermalPotionDiffuserScreenProps) {
  return <ThermalMachineScreen {...props} machine="potion_diffuser" />;
}
