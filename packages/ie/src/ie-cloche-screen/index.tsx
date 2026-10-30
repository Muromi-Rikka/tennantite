import type { ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

export interface IeClocheScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 肥料存量（FertilizerInfoArea：存量/容量 0..1）
   */
  fertilizer?: { amount: number; max: number };
  fertilizerSlot?: ScreenSlot;
  onSlotClick?: (label: string) => void;
  /**
   * 4 个产物输出槽
   */
  outputs?: Array<null | ScreenSlot>;
  /**
   * 生长进度 0..1（guiProgress，进度贴图自左向右）
   */
  process?: number;
  seed?: ScreenSlot;
  soil?: ScreenSlot;
  tank?: { max: number; tint: string; value: number };
}

/**
 * 温室（ClocheScreen）：土壤/种子/肥料槽 + 4 产物输出槽，左侧水罐、
 * 肥料条（fillGradient 0xff95ed00→0xff8a5a00）、进度贴图与竖向能量条。
 */
export function IeClocheScreen({
  className,
  energy,
  fertilizer,
  fertilizerSlot,
  onSlotClick,
  outputs = [],
  process = 0,
  seed,
  soil,
  tank,
}: IeClocheScreenProps) {
  const layout = IE_MACHINES.cloche;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "cloche-fertilizer": fertilizerSlot,
    "cloche-seed": seed,
    "cloche-soil": soil,
  };
  for (const [index, item] of outputs.entries()) {
    slotItems[`cloche-output-${index}`] = item ?? undefined;
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
              label="温室水罐"
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
              label="温室能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      {fertilizer
        ? (
            <IeEnergyBar
              gradient={layout.fertilizer.gradient}
              height={layout.fertilizer.height}
              label="温室肥料"
              left={layout.fertilizer.left}
              max={fertilizer.max}
              top={layout.fertilizer.top}
              value={fertilizer.amount}
              width={layout.fertilizer.width}
            />
          )
        : null}
      <ModProgress
        direction="right"
        fill={<IeSprite name={layout.spriteProgress.sprite} />}
        height={layout.spriteProgress.height}
        label="温室生长进度"
        left={layout.spriteProgress.left}
        progress={process}
        top={layout.spriteProgress.top}
        width={layout.spriteProgress.width}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={ieExpandSlots(layout)} />
    </IeMachineScreen>
  );
}
