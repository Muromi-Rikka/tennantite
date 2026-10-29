import type { ScreenSlot } from "@tennantite/ui";
import type { IfRedstoneMode } from "../if-markers";
import type { IfEnergyState, IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfDissolutionChamberScreenProps {
  className?: string;
  energy?: IfEnergyState;
  inputFluid?: IfFluidState;
  inputs?: ScreenSlot[];
  isLocked?: boolean;
  onLockChange?: (isLocked: boolean) => void;
  onRedstoneChange?: (mode: IfRedstoneMode) => void;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  outputFluid?: IfFluidState;
  progress?: number;
  redstone?: IfRedstoneMode;
}

/**
 * 溶解成型机：8 个不规则输入、1×3 输出、双流体罐、右侧升级 / 流体面板。
 */
export function IfDissolutionChamberScreen({
  className,
  energy,
  inputFluid,
  inputs = [],
  isLocked = false,
  onLockChange,
  onRedstoneChange,
  onSlotClick,
  output,
  outputFluid,
  progress = 0,
  redstone = "ignore",
}: IfDissolutionChamberScreenProps) {
  const items: Record<string, ScreenSlot> = {};
  for (let index = 0; index < 8; index += 1) {
    items[`input-${index}`] = inputs[index];
  }
  for (let index = 0; index < 3; index += 1) {
    items[`output-${index}`] = index === 0 ? output : undefined;
  }

  return (
    <IfMachineScreen
      className={className}
      energy={energy}
      fluids={{
        input_fluid: inputFluid ?? { max: 1, tint: "#7FCC19", value: 0 },
        output_fluid: outputFluid ?? { max: 1, tint: "#B24CD8", value: 0 },
      }}
      items={items}
      locked={{ lock: isLocked }}
      machine="dissolutionChamber"
      onButtonActivate={(id) => {
        if (id === "lock") {
          onLockChange?.(!isLocked);
        }
      }}
      onRedstoneChange={onRedstoneChange}
      onSlotActivate={onSlotClick}
      progress={{ bar: progress }}
      redstone={redstone}
    />
  );
}
