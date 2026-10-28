import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type CompressorScreenProps = Omit<Ic2MachineScreenProps, "backgroundClassName">;

/**
 * 压缩机界面（工业时代 2 视觉复刻）：煤炭 → 钻石等压缩配方，IC2 通用机器布局。
 */
export function CompressorScreen(properties: CompressorScreenProps) {
  return <Ic2MachineScreen {...properties} />;
}
