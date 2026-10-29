import type { ScreenSlot } from "@tennantite/ui";
import type { IfEnergyState, IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfBioreactorScreenProps {
  biofuel?: IfFluidState;
  className?: string;
  efficiency?: number;
  energy?: IfEnergyState;
  inputs?: ScreenSlot[];
  isLocked?: boolean;
  onLockChange?: (isLocked: boolean) => void;
  onSlotClick?: (label: string) => void;
  progress?: number;
  water?: IfFluidState;
}

/**
 * 生物质炉：3×3 输入、水 / 生物燃油双罐、黄色效率条。
 */
export function IfBioreactorScreen({
  biofuel,
  className,
  efficiency = 0,
  energy,
  inputs = [],
  isLocked = false,
  onLockChange,
  onSlotClick,
  progress = 0,
  water,
}: IfBioreactorScreenProps) {
  const items: Record<string, ScreenSlot> = {};
  for (let index = 0; index < 9; index += 1) {
    items[`input-${index}`] = inputs[index];
  }

  return (
    <IfMachineScreen
      className={className}
      energy={energy}
      fluids={{
        biofuel: biofuel ?? { max: 1, tint: "#7B2FBE", value: 0 },
        water: water ?? { max: 1, tint: "#287697", value: 0 },
      }}
      items={items}
      locked={{ lock: isLocked }}
      machine="bioreactor"
      onButtonActivate={(id) => {
        if (id === "lock") {
          onLockChange?.(!isLocked);
        }
      }}
      onSlotActivate={onSlotClick}
      progress={{ bar: progress, efficiency }}
    />
  );
}
