import type { ScreenSlot } from "@tennantite/ui";

import { progressClipPath } from "@tennantite/mods-core";
import { gui, ScreenItemSlot } from "@tennantite/ui";
import { useState } from "react";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IE_ARC_PROGRESS } from "../ie-metrics";
import { IeSprite } from "../ie-sprite/index";

export interface IeArcFurnaceScreenProps {
  /**
   * 4 个添加剂槽（石灰/助熔剂）
   */
  additives?: Array<null | ScreenSlot>;
  className?: string;
  /**
   * 3 个电极槽（石墨电极）
   */
  electrodes?: Array<null | ScreenSlot>;
  energy?: { max: number; value: number };
  /**
   * 12 个输入槽
   */
  inputs?: Array<null | ScreenSlot>;
  /**
   * 分配按钮（autoSplitStacks）
   */
  onDistribute?: () => void;
  onSlotClick?: (label: string) => void;
  /**
   * 6 个输出槽
   */
  outputs?: Array<null | ScreenSlot>;
  /**
   * 每个输入槽的冶炼进度 0..1（ProcessSlot.processFloat，长度 ≤ 12）
   */
  progresses?: number[];
  slagOutput?: ScreenSlot;
}

/**
 * 弧光炉（ArcFurnaceScreen，176×207）：分配按钮、3 电极、12 输入（含竖向
 * 进度条）、4 添加剂、6 输出 + 炉渣输出、右侧竖向能量条。
 */
export function IeArcFurnaceScreen({
  additives = [],
  className,
  electrodes = [],
  energy,
  inputs = [],
  onDistribute,
  onSlotClick,
  outputs = [],
  progresses = [],
  slagOutput,
}: IeArcFurnaceScreenProps) {
  const layout = IE_MACHINES.arcFurnace;
  const [hovered, setHovered] = useState(false);
  const slots = ieExpandSlots(layout);
  const byLabel = (prefix: string) => slots.filter(slot => slot.label.startsWith(prefix));
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
              label="弧光炉能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      <button
        aria-label="分配物品"
        data-ie-distribute-button={hovered ? "hover" : "normal"}
        onBlur={() => setHovered(false)}
        onClick={onDistribute}
        onFocus={() => setHovered(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: gui(16),
          left: gui(10),
          position: "absolute",
          top: gui(10),
          width: gui(16),
        }}
        type="button"
      >
        <IeSprite name={hovered ? "sprites/arc_furnace/distribute_hover" : "sprites/arc_furnace/distribute"} />
      </button>
      {progresses.map((progress, index) => {
        const bar = layout.progressBars;
        const x = bar.left + (index % bar.perRow) * (bar.stepX ?? 18);
        const y = bar.top + Math.floor(index / bar.perRow) * (bar.stepY ?? 18);
        return (
          <div
            aria-hidden="true"
            className="absolute overflow-hidden"
            data-ie-arc-progress={index}
            key={`${x}-${y}`}
            style={{
              clipPath: progressClipPath("up", progress),
              height: gui(IE_ARC_PROGRESS.height),
              left: gui(x),
              top: gui(y),
              width: gui(IE_ARC_PROGRESS.drawWidth),
            }}
          >
            <div
              style={{
                backgroundImage: "var(--mc-ie-sprites-arc-furnace-progress)",
                backgroundRepeat: "no-repeat",
                backgroundSize: `${gui(IE_ARC_PROGRESS.width)} ${gui(IE_ARC_PROGRESS.height)}`,
                height: "100%",
                imageRendering: "pixelated",
                width: "100%",
              }}
            />
          </div>
        );
      })}
      {byLabel("arc-furnace-input").map(slot => (
        <ScreenItemSlot
          item={itemFor(slot.label, inputs)}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
      {byLabel("arc-furnace-additive").map(slot => (
        <ScreenItemSlot
          item={itemFor(slot.label, additives)}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
      {byLabel("arc-furnace-output").map(slot => (
        <ScreenItemSlot
          item={itemFor(slot.label, outputs)}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
      {byLabel("arc-furnace-electrode").map(slot => (
        <ScreenItemSlot
          item={itemFor(slot.label, electrodes)}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
      {byLabel("arc-furnace-slag-output").map(slot => (
        <ScreenItemSlot
          item={slagOutput}
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
 * 按槽位 label 的数字后缀（如 `arc-furnace-input-3` → 3）取注入物品。
 */
function itemFor(label: string, items: Array<null | ScreenSlot>) {
  const index = Number(label.split("-").pop());
  return items[index] ?? null;
}
