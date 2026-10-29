import type { IfEnergyState, IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfBiofuelGeneratorScreenProps {
  biofuel?: IfFluidState;
  /**
   * 燃烧进度 0..1（青色基础条）
   */
  burn?: number;
  className?: string;
  energy?: IfEnergyState;
}

/**
 * 生物燃油发电机：生物燃油储罐 + 青色燃烧条。
 */
export function IfBiofuelGeneratorScreen({
  biofuel,
  burn = 0,
  className,
  energy,
}: IfBiofuelGeneratorScreenProps) {
  return (
    <IfMachineScreen
      className={className}
      energy={energy}
      fluids={{ biofuel: biofuel ?? { max: 1, tint: "#7B2FBE", value: 0 } }}
      machine="biofuelGenerator"
      progress={{ bar: burn }}
    />
  );
}
