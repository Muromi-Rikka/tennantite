import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type CompressorScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 压缩机界面（1.12.2 原版贴图）：煤炭 → 钻石等压缩配方，IC2 通用机器布局 + 三角进度。
 */
export function CompressorScreen(properties: CompressorScreenProps) {
  return <Ic2MachineScreen progressStyle="triangle" {...properties} />;
}
