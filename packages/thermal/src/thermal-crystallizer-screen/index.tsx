import { ThermalMachineScreen } from "../thermal-machine-screen/index";

export type ThermalCrystallizerScreenProps = Omit<
  Parameters<typeof ThermalMachineScreen>[0],
  "machine"
>;

/**
 * Thermal 结晶机（MachineCrystallizerScreen：双输入槽 (61/79,25)、26×26 产物槽 (138,30)、medium 流体罐 (34,22)、流体进度箭头 (104,35)、scale_alchemy (69,44)）。数据注入、无游戏逻辑。
 */
export function ThermalCrystallizerScreen(props: ThermalCrystallizerScreenProps) {
  return <ThermalMachineScreen {...props} machine="crystallizer" />;
}
