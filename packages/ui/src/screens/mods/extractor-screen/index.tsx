import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type ExtractorScreenProps = Omit<Ic2MachineScreenProps, "backgroundClassName">;

/**
 * 提取机界面（工业时代 2 视觉复刻）：橡胶木 → 橡胶，IC2 通用机器布局。
 */
export function ExtractorScreen(properties: ExtractorScreenProps) {
  return <Ic2MachineScreen {...properties} />;
}
