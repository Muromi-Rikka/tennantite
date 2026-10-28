import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type ElectricFurnaceScreenProps = Omit<Ic2MachineScreenProps, "backgroundClassName">;

/**
 * 电炉界面（工业时代 2 视觉复刻）：EU 驱动的熔炼，IC2 通用机器布局。
 */
export function ElectricFurnaceScreen(properties: ElectricFurnaceScreenProps) {
  return <Ic2MachineScreen {...properties} />;
}
