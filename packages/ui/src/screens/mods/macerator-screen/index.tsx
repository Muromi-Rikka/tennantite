import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type MaceratorScreenProps = Omit<Ic2MachineScreenProps, "backgroundClassName">;

/**
 * 磨矿机界面（工业时代 2 视觉复刻）：矿物 → 粉末，IC2 通用机器布局。
 */
export function MaceratorScreen(properties: MaceratorScreenProps) {
  return <Ic2MachineScreen {...properties} />;
}
