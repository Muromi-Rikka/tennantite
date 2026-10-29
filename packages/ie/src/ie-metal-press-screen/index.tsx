import type { ScreenSlot } from "@tennantite/ui";

import { progressClipPath } from "@tennantite/mods-core";
import { gui, ScreenItemSlot } from "@tennantite/ui";
import { useState } from "react";

import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeMetalPressScreenProps {
  /**
   * 当前选中的模具槽位号（0..2）
   */
  activeMold?: number;
  className?: string;
  /**
   * 输入槽
   */
  input?: ScreenSlot;
  /**
   * 模具槽（冲压模具；上游 JEI 为单个催化剂槽，此屏提供三个模具位）
   */
  molds?: Array<null | ScreenSlot>;
  onMoldSelect?: (index: number) => void;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  /**
   * 压制进度 0..1（传送带水平填充）
   */
  progress?: number;
}

/**
 * 金属压机（1.21.1 无 GUI 容器，按 IEContainerScreen 范式重建）：输入槽 →
 * 水平传送带（进度自左向右填充，使用 IE 竖向进度贴图旋转 90°）→ 输出槽，
 * 三个模具槽位于传送带上方。
 */
export function IeMetalPressScreen({
  activeMold,
  className,
  input,
  molds = [],
  onMoldSelect,
  onSlotClick,
  output,
  progress = 0,
}: IeMetalPressScreenProps) {
  const layout = IE_MACHINES.metalPress;
  const [hoveredMold, setHoveredMold] = useState<null | number>(null);
  const slots = ieExpandSlots(layout);
  const moldSlots = slots.filter(slot => slot.label.startsWith("metal-press-mold"));
  return (
    <IeMachineScreen
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      playerFrames
      title={layout.title}
      width={layout.width}
    >
      {moldSlots.map((slot) => {
        const index = Number(slot.label.split("-").pop());
        const isActive = activeMold === index;
        // 模具物品不带 tooltip：ItemStack 的 TooltipTrigger 会渲染嵌套 <button>
        const mold = molds[index] ?? null;
        const moldItem = mold ? { ...mold, tooltip: undefined } : null;
        return (
          <button
            aria-label={`${slot.label}${isActive ? "（当前）" : ""}`}
            aria-pressed={isActive}
            data-ie-mold-active={isActive || hoveredMold === index ? "true" : "false"}
            key={slot.label}
            onBlur={() => setHoveredMold(null)}
            onClick={() => onMoldSelect?.(index)}
            onFocus={() => setHoveredMold(index)}
            onMouseEnter={() => setHoveredMold(index)}
            onMouseLeave={() => setHoveredMold(null)}
            style={{
              height: gui(18),
              left: gui(slot.left),
              position: "absolute",
              top: gui(slot.top),
              width: gui(18),
            }}
            type="button"
          >
            <ScreenItemSlot
              frame
              item={moldItem}
              label={`${slot.label}-item`}
              left={0}
              top={0}
            />
          </button>
        );
      })}
      <div
        aria-label="金属压机进度"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(Math.min(1, Math.max(0, progress)) * 100)}
        className="absolute overflow-hidden"
        data-ie-press-belt=""
        role="progressbar"
        style={{
          backgroundColor: "#4c4c4c",
          height: gui(layout.belt.height),
          left: gui(layout.belt.left),
          top: gui(layout.belt.top),
          width: gui(layout.belt.width),
        }}
        title="金属压机进度"
      >
        <div
          className="absolute"
          style={{
            clipPath: progressClipPath("right", progress),
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#f78034",
              height: gui(3),
              left: 0,
              position: "absolute",
              top: gui((layout.belt.height - 3) / 2),
              width: "100%",
            }}
          />
        </div>
      </div>
      <ScreenItemSlot
        frame
        item={input}
        label="metal-press-input"
        left={24}
        onActivate={onSlotClick ? () => onSlotClick("metal-press-input") : undefined}
        top={43}
      />
      <ScreenItemSlot
        frame
        item={output}
        label="metal-press-output"
        left={128}
        onActivate={onSlotClick ? () => onSlotClick("metal-press-output") : undefined}
        top={43}
      />
    </IeMachineScreen>
  );
}
