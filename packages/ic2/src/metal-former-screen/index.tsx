import type { Ic2MachineScreenProps } from "../ic2-machine-screen/index";
import { Ic2MachineScreen } from "../ic2-machine-screen/index";

export type MetalFormerScreenProps = Omit<Ic2MachineScreenProps, "progressStyle">;

/**
 * 金属成型机槽位 / 表原点（`guidef/metal_former.xml`）：输入与放电槽在左列，
 * 能量表与进度条随之前移，产物槽与升级槽同通用机器布局。
 */
const METAL_FORMER_POSITIONS = {
  discharge: { left: 16, top: 52 },
  energy: { left: 20, top: 37 },
  input: { left: 16, top: 16 },
  progress: { left: 52, top: 40 },
} as const;

/**
 * 金属成型机界面（1.12.2 原版贴图）：IC2 通用机器布局的左列变体 +
 * 熔炼箭头进度；rolling / extruding / ingot 模式按钮经 `children` 注入。
 */
export function MetalFormerScreen(properties: MetalFormerScreenProps) {
  return (
    <Ic2MachineScreen
      dischargePosition={METAL_FORMER_POSITIONS.discharge}
      energyPosition={METAL_FORMER_POSITIONS.energy}
      inputPosition={METAL_FORMER_POSITIONS.input}
      progressPosition={METAL_FORMER_POSITIONS.progress}
      progressStyle="arrow"
      {...properties}
    />
  );
}
