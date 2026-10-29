import type { ScreenSlot } from "@tennantite/ui";
import { gui } from "@tennantite/ui";
import type { IfDyeColor } from "../if-metrics";
import type { IfEnergyState } from "../if-types";

import { IfMachineScreen } from "../if-machine-screen/index";
import { IF_DYE_FIREWORK } from "../if-metrics";

const DYE_ORDER: IfDyeColor[] = [
  "white",
  "orange",
  "magenta",
  "light_blue",
  "yellow",
  "lime",
  "pink",
  "gray",
  "light_gray",
  "cyan",
  "purple",
  "blue",
  "brown",
  "green",
  "red",
  "black",
];

export interface IfDyeMixerScreenProps {
  blue?: { level: number; slot?: ScreenSlot };
  className?: string;
  /**
   * 0..15，Minecraft `DyeColor` 顺序
   */
  dyeIndex?: number;
  energy?: IfEnergyState;
  green?: { level: number; slot?: ScreenSlot };
  onNextDye?: () => void;
  onPreviousDye?: () => void;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  progress?: number;
  red?: { level: number; slot?: ScreenSlot };
}

/**
 * 颜料调色器：三色输入 / 三条竖向进度、染料切换按钮。
 */
export function IfDyeMixerScreen({
  blue,
  className,
  dyeIndex = 0,
  energy,
  green,
  onNextDye,
  onPreviousDye,
  onSlotClick,
  output,
  progress = 0,
  red,
}: IfDyeMixerScreenProps) {
  const dyeColor = DYE_ORDER[dyeIndex] ?? "white";

  return (
    <IfMachineScreen
      className={className}
      energy={energy}
      items={{
        "input_blue-0": blue?.slot,
        "input_green-0": green?.slot,
        "input_red-0": red?.slot,
        "output-0": output,
      }}
      machine="dyeMixer"
      onButtonActivate={(id) => {
        if (id === "dye-prev") {
          onPreviousDye?.();
        }
        else if (id === "dye-next") {
          onNextDye?.();
        }
      }}
      onSlotActivate={onSlotClick}
      progress={{
        bar: progress,
        blue: blue?.level ?? 0,
        green: green?.level ?? 0,
        red: red?.level ?? 0,
      }}
    >
      <div
        aria-label={`染料 ${dyeColor}`}
        className="pointer-events-none absolute"
        data-if-dye={dyeColor}
        style={{
          backgroundColor: IF_DYE_FIREWORK[dyeColor],
          height: gui(16),
          left: gui(133),
          top: gui(20),
          width: gui(16),
        }}
      />
    </IfMachineScreen>
  );
}
