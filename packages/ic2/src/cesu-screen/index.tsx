import type { BatBoxScreenProps } from "../batbox-screen/index";
import { BatBoxScreen } from "../batbox-screen/index";

export type CesuScreenProps = BatBoxScreenProps;

/**
 * CESU 界面（1.12.2 原版贴图，`guielectricblock.png`）：储电箱同版式，
 * 输出功率 32 EU/t（容量由 `energy.max` 注入，如 300000）。
 */
export function CesuScreen({ output = 32, ...properties }: CesuScreenProps) {
  return <BatBoxScreen output={output} {...properties} />;
}
