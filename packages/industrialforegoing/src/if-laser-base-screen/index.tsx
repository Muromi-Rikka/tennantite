import type { ScreenSlot } from "@tennantite/ui";
import type { IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export interface IfLaserBaseScreenProps {
  className?: string;
  depth?: string;
  fluid?: IfFluidState;
  lenses?: ScreenSlot[];
  onDepthChange?: (value: string) => void;
  onSlotClick?: (label: string) => void;
  outputs?: ScreenSlot[];
  variant: "fluid" | "ore";
  work?: number;
}

/**
 * 镭射钻基座：矿石 / 流体两种版本共用钻头与深度输入。
 */
export function IfLaserBaseScreen({
  className,
  depth = "",
  fluid,
  lenses = [],
  onDepthChange,
  onSlotClick,
  outputs = [],
  variant,
  work = 0,
}: IfLaserBaseScreenProps) {
  const items: Record<string, ScreenSlot> = {};
  const itemCount = variant === "ore" ? 15 : 0;

  for (let index = 0; index < 6; index += 1) {
    items[`lens-${index}`] = lenses[index];
  }
  for (let index = 0; index < itemCount; index += 1) {
    items[`output-${index}`] = outputs[index];
  }

  return (
    <IfMachineScreen
      className={className}
      fluids={{ output: fluid ?? { max: 1, tint: "#EB8844", value: 0 } }}
      items={items}
      machine={variant === "ore" ? "oreLaserBase" : "fluidLaserBase"}
      onSlotActivate={onSlotClick}
      onTextFieldChange={(id, value) => {
        if (id === "depth") {
          onDepthChange?.(value);
        }
      }}
      progress={{ work }}
      textFieldValues={{ depth }}
    />
  );
}
