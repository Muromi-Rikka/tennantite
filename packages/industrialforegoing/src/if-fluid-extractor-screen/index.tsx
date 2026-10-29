import type { IfRedstoneMode } from "../if-markers";
import type { IfEnergyState, IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfFluidExtractorScreenProps {
  area?: { particles: boolean; showArea: boolean };
  className?: string;
  energy?: IfEnergyState;
  fluid?: IfFluidState;
  onAreaChange?: (next: { particles: boolean; showArea: boolean }) => void;
  onRedstoneChange?: (mode: IfRedstoneMode) => void;
  redstone?: IfRedstoneMode;
}

/**
 * 液体提取机：单储罐 + 区域 / 粒子按钮。
 */
export function IfFluidExtractorScreen({
  area,
  className,
  energy,
  fluid,
  onAreaChange,
  onRedstoneChange,
  redstone = "ignore",
}: IfFluidExtractorScreenProps) {
  return (
    <IfMachineScreen
      area={area}
      className={className}
      energy={energy}
      fluids={{ latex: fluid ?? { max: 1, tint: "#ABABAB", value: 0 } }}
      machine="fluidExtractor"
      onAreaChange={onAreaChange}
      onRedstoneChange={onRedstoneChange}
      redstone={redstone}
    />
  );
}
