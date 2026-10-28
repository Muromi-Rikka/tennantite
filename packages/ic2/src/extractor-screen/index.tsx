import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type ExtractorScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 提取机界面（1.12.2 原版贴图）：橡胶木 → 橡胶，IC2 通用机器布局 + 滴落进度。
 */
export function ExtractorScreen(properties: ExtractorScreenProps) {
  return <Ic2MachineScreen progressStyle="drop" {...properties} />;
}
