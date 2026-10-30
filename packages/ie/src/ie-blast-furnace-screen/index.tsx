import type { ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { ScreenItemSlot } from "@tennantite/ui";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IE_FLAME } from "../ie-metrics";
import { IeSprite } from "../ie-sprite/index";

export interface IeBlastFurnaceScreenProps {
  /**
   * 燃烧进度 0..1（BURN_TIME / LAST_BURN_TIME，火焰自下而上）
   */
  burn?: number;
  className?: string;
  /**
   * 燃料槽（ 木炭 / 煤炭饼）
   */
  fuel?: ScreenSlot;
  input?: ScreenSlot;
  onSlotClick?: (label: string) => void;
  /**
   * 两个产物输出槽（钢锭 / 矿渣）
   */
  outputs?: Array<null | ScreenSlot>;
  /**
   * 冶炼进度 0..1（MAX_PROCESS / PROCESS，箭头自左向右）
   */
  process?: number;
}

/**
 * 高炉（BlastFurnaceScreen）：输入槽 + 燃料槽 + 双输出槽，火焰与箭头进度
 * 复用背景贴图内的裁剪区域（179,1,9,12 / 177,14,22,16）。
 */
export function IeBlastFurnaceScreen({
  burn = 0,
  className,
  fuel,
  input,
  onSlotClick,
  outputs = [],
  process = 0,
}: IeBlastFurnaceScreenProps) {
  const layout = IE_MACHINES.blastFurnace;
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "blast-furnace-fuel": fuel,
    "blast-furnace-input": input,
    "blast-furnace-output": outputs[0] ?? undefined,
    "blast-furnace-output-2": outputs[1] ?? undefined,
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
      <ModProgress
        direction="up"
        fill={(
          <IeSprite
            name={layout.background!}
            src={{ height: 12, width: 9, x: 179, y: 1 }}
          />
        )}
        height={IE_FLAME.height}
        label="高炉燃烧进度"
        left={layout.flame.left}
        progress={burn}
        top={layout.flame.top}
        width={IE_FLAME.width}
      />
      <ModProgress
        direction="right"
        fill={(
          <IeSprite
            name={layout.background!}
            src={{ height: 16, width: 22, x: 177, y: 14 }}
          />
        )}
        height={layout.arrow.height}
        label="高炉冶炼进度"
        left={layout.arrow.left}
        progress={process}
        top={layout.arrow.top}
        width={layout.arrow.width}
      />
      {ieExpandSlots(layout).map(slot => (
        <ScreenItemSlot
          item={slotItems[slot.label]}
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
