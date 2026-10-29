import type { IfEnergyState, IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfFermentationStationScreenProps {
  catalyst?: IfFluidState;
  className?: string;
  energy?: IfEnergyState;
  input?: IfFluidState;
  onControlClick?: (id: string, state: number) => void;
  output?: IfFluidState;
  /**
   * 生产档位：0..3
   */
  production?: 0 | 1 | 2 | 3;
  progress?: number;
  /**
   * 封印状态：0 满 / 1 半 / 2 单格
   */
  seal?: 0 | 1 | 2;
}

/**
 * 发酵站：三储罐 + 封印 / 生产按钮（machines_extra 状态图）。
 */
export function IfFermentationStationScreen({
  catalyst,
  className,
  energy,
  input,
  onControlClick,
  output,
  production = 0,
  progress = 0,
  seal = 0,
}: IfFermentationStationScreenProps) {
  return (
    <IfMachineScreen
      buttons={{ "ferm-production": production, "ferm-seal": seal }}
      className={className}
      energy={energy}
      fluids={{
        catalyst: catalyst ?? { max: 1, tint: "#41CD34", value: 0 },
        input: input ?? { max: 1, tint: "#51301A", value: 0 },
        output: output ?? { max: 1, tint: "#EB8844", value: 0 },
      }}
      machine="fermentationStation"
      onButtonActivate={(id) => {
        if (id === "ferm-seal") {
          onControlClick?.("ferm-seal", ((seal + 1) % 3) as 0 | 1 | 2);
        }
        else if (id === "ferm-production") {
          onControlClick?.("ferm-production", ((production + 1) % 4) as 0 | 1 | 2 | 3);
        }
      }}
      progress={{ bar: progress }}
    />
  );
}
