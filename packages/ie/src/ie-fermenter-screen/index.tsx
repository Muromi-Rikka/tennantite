import type { ScreenSlot } from "@tennantite/ui";

import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeFermenterScreenProps {
  bucketOutput?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 流体容器输入槽（空桶）
   */
  fluidContainer?: ScreenSlot;
  /**
   * 8 个植物输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  tank?: { max: number; tint: string; value: number };
}

/**
 * 发酵器（FermenterScreen）：4×2 植物输入 + 输出槽 + 右侧发酵罐与
 * 流体桶槽位，竖向能量条（EnergyInfoArea 158,22）。
 */
export function IeFermenterScreen({
  bucketOutput,
  className,
  energy,
  fluidContainer,
  inputs = [],
  onSlotClick,
  output,
  tank,
}: IeFermenterScreenProps) {
  const layout = IE_MACHINES.fermenter;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "fermenter-bucket-output": bucketOutput,
    "fermenter-fluid-container": fluidContainer,
    "fermenter-output": output,
  };
  for (const [index, item] of inputs.entries()) {
    slotItems[`fermenter-input-${index}`] = item ?? undefined;
  }
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
              label="发酵器发酵罐"
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
      {energy
        ? (
            <IeEnergyBar
              label="发酵器能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={ieExpandSlots(layout)} />
    </IeMachineScreen>
  );
}
