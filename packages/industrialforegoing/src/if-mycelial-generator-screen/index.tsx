import type { ScreenSlot } from "@tennantite/ui";
import type { IfMycelialGeneratorVariant } from "../if-machine-layout";
import type { IfEnergyState, IfFluidState } from "../if-types";

import { IF_MYCEALIAL_VARIANTS } from "../if-machine-layout";
import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfMycelialGeneratorScreenProps {
  /**
   * 燃烧进度 0..1
   */
  burn?: number;
  className?: string;
  display?: ScreenSlot;
  energy?: IfEnergyState;
  /**
   * 按变体输入顺序：TANK 输入为 `IfFluidState`，SLOT 输入为 `ScreenSlot`
   */
  inputs?: (IfFluidState | ScreenSlot)[];
  onSlotClick?: (label: string) => void;
  variant: IfMycelialGeneratorVariant;
}

/**
 * 菌丝网络发电机：16 种变体共用同一布局，输入类型 / 颜色由变体表决定。
 */
export function IfMycelialGeneratorScreen({
  burn = 0,
  className,
  display,
  energy,
  inputs = [],
  onSlotClick,
  variant,
}: IfMycelialGeneratorScreenProps) {
  const meta = IF_MYCEALIAL_VARIANTS[variant];
  const items: Record<string, ScreenSlot> = {};
  const fluids: Record<string, IfFluidState> = {};

  for (const [index, input] of meta.inputs.entries()) {
    const value = inputs[index];
    if (input.kind === "tank") {
      fluids[`input-${index}`] = isFluidState(value) ? value : defaultFluid();
    }
    else {
      items[`input-${index}`] = isFluidState(value) ? undefined : value;
    }
  }

  return (
    <IfMachineScreen
      className={className}
      display={display}
      energy={energy}
      fluids={fluids}
      items={items}
      machine="mycelialGenerator"
      onSlotActivate={onSlotClick}
      progress={{ bar: burn }}
      variant={variant}
    />
  );
}

function defaultFluid(): IfFluidState {
  return { max: 1, tint: "#4C7F99", value: 0 };
}

function isFluidState(value: IfFluidState | ScreenSlot): value is IfFluidState {
  return value !== null && value !== undefined && "tint" in value;
}
