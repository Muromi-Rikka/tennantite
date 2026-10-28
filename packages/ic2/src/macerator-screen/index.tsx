import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type MaceratorScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 磨矿机界面（1.12.2 原版贴图）：矿物 → 粉末，IC2 通用机器布局 + 粉碎进度。
 */
export function MaceratorScreen(properties: MaceratorScreenProps) {
  return <Ic2MachineScreen progressStyle="crush" {...properties} />;
}
