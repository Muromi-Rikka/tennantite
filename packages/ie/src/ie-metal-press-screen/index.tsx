import type { ScreenSlot } from "@tennantite/ui";

import { ModProgress } from "@tennantite/mods-core";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

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
          <IeSpriteButton
            dataAttributes={{ "data-ie-mold-active": isActive ? "true" : "false" }}
            icon={(
              <ScreenItemSlot
                frame
                item={moldItem}
                label={`${slot.label}-item`}
                left={0}
                top={0}
              />
            )}
            key={slot.label}
            label={`${slot.label}${isActive ? "（当前）" : ""}`}
            left={slot.left}
            onClick={() => onMoldSelect?.(index)}
            pressed={isActive}
            top={slot.top}
          />
        );
      })}
      <ModProgress
        ariaValue="percent"
        className="overflow-hidden"
        dataAttributes={{ "data-ie-press-belt": "" }}
        direction="right"
        fill={(
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
        )}
        height={layout.belt.height}
        label="金属压机进度"
        left={layout.belt.left}
        progress={progress}
        top={layout.belt.top}
        track={<div style={{ backgroundColor: "#4c4c4c", height: "100%", width: "100%" }} />}
        width={layout.belt.width}
      />
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
