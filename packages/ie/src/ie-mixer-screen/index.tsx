import type { ScreenSlot } from "@tennantite/ui";

import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeProgressBars } from "../ie-progress-bars/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

export interface IeMixerScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 4 个输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  /**
   * 多流体罐（MultitankArea 58×47，多流体混色以纯色近似）
   */
  multitank?: { max: number; tint: string; value: number };
  onOutputAllChange?: () => void;
  onSlotClick?: (label: string) => void;
  /**
   * 输出模式（false：单一产物 output_bottom；true：全部产物 output_all）
   */
  outputAll?: boolean;
  /**
   * 每个输入槽的搅拌进度 0..1（SlotProgress，长度 ≤ 4）
   */
  progresses?: number[];
}

/**
 * 搅拌机（MixerScreen）：2×2 输入（每输入槽带 2×16 竖向进度贴图）、
 * 多流体罐（MultitankArea 58×47）、输出模式切换按钮（output_bottom/output_all）
 * 与竖向能量条（EnergyInfoArea 158,22）。
 */
export function IeMixerScreen({
  className,
  energy,
  inputs = [],
  multitank,
  onOutputAllChange,
  onSlotClick,
  outputAll = false,
  progresses = [],
}: IeMixerScreenProps) {
  const layout = IE_MACHINES.mixer;
  const slots = ieExpandSlots(layout);
  const tankArea = layout.tanks[0];
  const slotItems: Record<string, null | ScreenSlot | undefined> = {};
  for (const [index, slot] of slots.entries()) {
    slotItems[slot.label] = inputs[index] ?? null;
  }
  const barValues = Array.from(
    { length: layout.progressBars?.count ?? 0 },
    (_, index) => progresses[index] ?? 0,
  );
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
      {energy
        ? (
            <IeEnergyBar
              label="搅拌机能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      {multitank && tankArea
        ? (
            <IeFluidTank
              height={tankArea.fill.height}
              label={tankArea.label}
              left={tankArea.fill.left}
              max={multitank.max}
              tint={multitank.tint}
              top={tankArea.fill.top}
              value={multitank.value}
              width={tankArea.fill.width}
            />
          )
        : null}
      <IeSpriteButton
        dataAttributes={{ "data-ie-toggle-active": outputAll ? "true" : "false" }}
        height={layout.toggle.height}
        label={outputAll ? "搅拌机输出全部产物" : "搅拌机输出单一产物"}
        left={layout.toggle.left}
        name={layout.toggle.spriteOff}
        nameOn={layout.toggle.spriteOn}
        onClick={onOutputAllChange}
        pressed={outputAll}
        top={layout.toggle.top}
        width={layout.toggle.width}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
      <IeProgressBars
        dataAttribute="data-ie-mixer-progress"
        layout={layout.progressBars}
        values={barValues}
      />
    </IeMachineScreen>
  );
}
