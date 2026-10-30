import type { BatBoxScreenProps } from "../batbox-screen/index";
import { BatBoxScreen } from "../batbox-screen/index";

export type MfsuScreenProps = BatBoxScreenProps;

/**
 * MFSU 界面（1.12.2 原版贴图，`guielectricblock.png`）：储电箱同版式，
 * 输出功率 512 EU/t（容量由 `energy.max` 注入，如 40000000）。
 */
export function MfsuScreen({ output = 512, ...properties }: MfsuScreenProps) {
  return <BatBoxScreen output={output} {...properties} />;
}
