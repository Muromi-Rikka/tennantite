import type { ScreenSlot } from "@tennantite/ui";

import { ScreenItemSlot } from "@tennantite/ui";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeSqueezerScreenProps {
  bucketOutput?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 流体容器输入槽（空桶）
   */
  fluidContainer?: ScreenSlot;
  /**
   * 8 个压榨输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  tank?: { max: number; tint: string; value: number };
}

/**
 * 压榨机（SqueezerScreen）：4×2 压榨输入 + 输出槽 + 右侧流体罐与
 * 流体桶槽位，竖向能量条（EnergyInfoArea 158,22）。
 */
export function IeSqueezerScreen({
  bucketOutput,
  className,
  energy,
  fluidContainer,
  inputs = [],
  onSlotClick,
  output,
  tank,
}: IeSqueezerScreenProps) {
  const layout = IE_MACHINES.squeezer;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "squeezer-bucket-output": bucketOutput,
    "squeezer-fluid-container": fluidContainer,
    "squeezer-output": output,
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
              label="压榨机流体罐"
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
              label="压榨机能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      {ieExpandSlots(layout).map(slot => (
        <ScreenItemSlot
          item={slot.label.startsWith("squeezer-input") ? itemFor(slot.label, inputs) : slotItems[slot.label]}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
    </IeMachineScreen>
  );
}

/**
 * 按槽位 label 的数字后缀（如 `squeezer-input-3` → 3）取注入物品。
 */
function itemFor(label: string, items: Array<null | ScreenSlot>) {
  const index = Number(label.split("-").pop());
  return items[index] ?? null;
}
