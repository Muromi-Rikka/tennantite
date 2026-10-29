import type { ScreenSlot } from "@tennantite/ui";
import type { IfRedstoneMode } from "../if-markers";
import type { IfEnergyState, IfFluidState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";

export type IfMobCrusherMode = "consume" | "produce";

export interface IfMobCrusherScreenProps {
  area?: { particles: boolean; showArea: boolean };
  className?: string;
  energy?: IfEnergyState;
  essence?: IfFluidState;
  mode?: IfMobCrusherMode;
  onAreaChange?: (next: { particles: boolean; showArea: boolean }) => void;
  onModeChange?: (mode: IfMobCrusherMode) => void;
  onRedstoneChange?: (mode: IfRedstoneMode) => void;
  onSlotClick?: (label: string) => void;
  outputs?: ScreenSlot[];
  progress?: number;
  redstone?: IfRedstoneMode;
}

/**
 * 屠宰机：6×3 输出、精华储罐、生产 / 消耗模式按钮。
 */
export function IfMobCrusherScreen({
  area,
  className,
  energy,
  essence,
  mode = "produce",
  onAreaChange,
  onModeChange,
  onRedstoneChange,
  onSlotClick,
  outputs = [],
  progress = 0,
  redstone = "ignore",
}: IfMobCrusherScreenProps) {
  const items: Record<string, ScreenSlot> = {};
  for (let index = 0; index < 18; index += 1) {
    items[`output-${index}`] = outputs[index];
  }

  return (
    <IfMachineScreen
      area={area}
      buttons={{ "mob-crusher": mode === "consume" ? 1 : 0 }}
      className={className}
      energy={energy}
      fluids={{ essence: essence ?? { max: 1, tint: "#41CD34", value: 0 } }}
      items={items}
      machine="mobCrusher"
      onAreaChange={onAreaChange}
      onButtonActivate={(id) => {
        if (id === "mob-crusher") {
          onModeChange?.(mode === "produce" ? "consume" : "produce");
        }
      }}
      onRedstoneChange={onRedstoneChange}
      onSlotActivate={onSlotClick}
      progress={{ bar: progress }}
      redstone={redstone}
    />
  );
}
