import type { ScreenSlot } from "@tennantite/ui";
import type { IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfPotionBrewerScreenProps {
  blazeInput?: ScreenSlot;
  bottleInput?: ScreenSlot;
  brewingInput?: ScreenSlot[];
  className?: string;
  /**
   * 烈焰粉燃料 0..1
   */
  fuel?: number;
  isLocked?: boolean;
  onLockChange?: (isLocked: boolean) => void;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot[];
  progress?: number;
  water?: IfFluidState;
}

/**
 * 自动炼药机：6 格酿造输入、烈焰粉 / 水瓶、向下箭头进度与锁定按钮。
 */
export function IfPotionBrewerScreen({
  blazeInput,
  bottleInput,
  brewingInput = [],
  className,
  fuel = 0,
  isLocked = false,
  onLockChange,
  onSlotClick,
  output = [],
  progress = 0,
  water,
}: IfPotionBrewerScreenProps) {
  const items: Record<string, ScreenSlot> = {
    "blazeInput-0": blazeInput,
    "bottleInput-0": bottleInput,
  };
  for (let index = 0; index < 6; index += 1) {
    items[`brewingInput-${index}`] = brewingInput[index];
  }
  for (let index = 0; index < 3; index += 1) {
    items[`output-${index}`] = output[index];
  }

  return (
    <IfMachineScreen
      className={className}
      fluids={{ water: water ?? { max: 1, tint: "#287697", value: 0 } }}
      items={items}
      locked={{ lock: isLocked }}
      machine="potionBrewer"
      onButtonActivate={(id) => {
        if (id === "lock") {
          onLockChange?.(!isLocked);
        }
      }}
      onSlotActivate={onSlotClick}
      progress={{ bar: progress, blaze: fuel }}
    />
  );
}
