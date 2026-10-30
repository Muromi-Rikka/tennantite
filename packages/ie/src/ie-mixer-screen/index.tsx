import type { ScreenSlot } from "@tennantite/ui";

import { progressClipPath } from "@tennantite/mods-core";
import { gui, ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

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
      <button
        aria-label={outputAll ? "搅拌机输出全部产物" : "搅拌机输出单一产物"}
        aria-pressed={outputAll}
        data-ie-toggle-active={outputAll ? "true" : "false"}
        onClick={onOutputAllChange}
        style={{
          height: gui(layout.toggle.height),
          left: gui(layout.toggle.left),
          position: "absolute",
          top: gui(layout.toggle.top),
          width: gui(layout.toggle.width),
        }}
        type="button"
      >
        <IeSprite name={outputAll ? layout.toggle.spriteOn : layout.toggle.spriteOff} />
      </button>
      {slots.map((slot) => {
        const index = Number(slot.label.split("-").pop());
        const progress = progresses[index] ?? 0;
        const bar = layout.progressBars;
        const x = bar.left + (index % bar.perRow) * (bar.stepX ?? 18);
        const y = bar.top + Math.floor(index / bar.perRow) * (bar.stepY ?? 18);
        return (
          <Fragment key={slot.label}>
            <ScreenItemSlot
              item={inputs[index] ?? undefined}
              label={slot.label}
              left={slot.left}
              onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
              top={slot.top}
            />
            <div
              aria-hidden="true"
              className="absolute overflow-hidden"
              data-ie-mixer-progress={index}
              style={{
                clipPath: progressClipPath("up", progress),
                height: gui(bar.height),
                left: gui(x),
                top: gui(y),
                width: gui(bar.drawWidth ?? 2),
              }}
            >
              <div
                style={{
                  backgroundImage: "var(--mc-ie-sprites-mixer-progress)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${gui(3)} ${gui(bar.height)}`,
                  height: "100%",
                  imageRendering: "pixelated",
                  width: "100%",
                }}
              />
            </div>
          </Fragment>
        );
      })}
    </IeMachineScreen>
  );
}
