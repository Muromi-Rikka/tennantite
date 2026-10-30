import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type RecyclerScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 回收机界面（1.12.2 原版贴图，`guidef/recycler.xml`）：IC2 通用机器布局 + 熔炼箭头进度。
 */
export function RecyclerScreen(properties: RecyclerScreenProps) {
  return <Ic2MachineScreen progressStyle="arrow" {...properties} />;
}
