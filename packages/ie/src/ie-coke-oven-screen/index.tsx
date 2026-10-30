import type { ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IE_FLAME } from "../ie-metrics";

export interface IeCokeOvenScreenProps {
  /**
   * 桶输出槽（木焦油桶）
   */
  bucketOutput?: ScreenSlot;
  /**
   * 燃烧进度 0..1（CokeOvenLogic BURN_TIME / MAX_BURN_TIME）
   */
  burn?: number;
  className?: string;
  /**
   * 流体容器输入槽（空桶）
   */
  fluidContainer?: ScreenSlot;
  input?: ScreenSlot;
  onSlotClick?: (label: string) => void;
  /**
   * 产物输出槽（焦炭）
   */
  output?: ScreenSlot;
  /**
   * 木焦油罐（FluidInfoArea 16×47，20×51 overlay）
   */
  tank?: { max: number; tint: string; value: number };
}

/**
 * 焦炉（CokeOvenScreen）：输入槽 + 火焰燃烧进度 + 输出槽 + 右侧木焦油罐
 * 与两个流体桶槽位。
 */
export function IeCokeOvenScreen({
  bucketOutput,
  burn = 0,
  className,
  fluidContainer,
  input,
  onSlotClick,
  output,
  tank,
}: IeCokeOvenScreenProps) {
  const layout = IE_MACHINES.cokeOven;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "coke-oven-bucket-output": bucketOutput,
    "coke-oven-fluid-container": fluidContainer,
    "coke-oven-input": input,
    "coke-oven-output": output,
  };
  return (
    <IeMachineScreen
      background={layout.background}
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      {tank
        ? (
            <IeFluidTank
              height={layout.tank.fill.height}
              label="焦炉木焦油罐"
              left={layout.tank.fill.left}
              max={tank.max}
              overlayName={layout.tank.overlayName}
              tint={tank.tint}
              top={layout.tank.fill.top}
              value={tank.value}
              width={layout.tank.fill.width}
            />
          )
        : null}
      <ModProgress
        direction="up"
        fill={(
          <div
            data-ie-flame=""
            style={{
              backgroundImage: "var(--mc-ie-sprites-coke-oven-flame)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              height: "100%",
              imageRendering: "pixelated",
              width: "100%",
            }}
          />
        )}
        height={IE_FLAME.height}
        label="焦炉燃烧进度"
        left={layout.flame.left}
        progress={burn}
        top={layout.flame.top}
        width={IE_FLAME.width}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={ieExpandSlots(layout)} />
    </IeMachineScreen>
  );
}
