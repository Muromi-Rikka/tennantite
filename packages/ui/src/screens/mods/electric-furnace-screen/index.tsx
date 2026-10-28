import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type ElectricFurnaceScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 电炉界面（1.12.2 原版贴图）：EU 驱动的熔炼，IC2 通用机器布局 + 熔炼箭头进度。
 */
export function ElectricFurnaceScreen(properties: ElectricFurnaceScreenProps) {
  return <Ic2MachineScreen progressStyle="arrow" {...properties} />;
}
