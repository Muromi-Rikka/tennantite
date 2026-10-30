import type { ScreenSlot } from "@tennantite/ui";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

export interface IeItemBatcherScreenProps {
  /**
   * 9 缓冲槽（BufferInventory）
   */
  buffers?: Array<null | ScreenSlot>;
  className?: string;
  /**
   * 9 个红石染色按钮开关（GuiButtonDyeColor）
   */
  colors?: boolean[];
  /**
   * 9 个幽灵过滤槽（GhostSlotItemHandler）
   */
  filters?: Array<null | ScreenSlot>;
  onColorClick?: (slot: number) => void;
  onModeToggle?: () => void;
  onSlotClick?: (label: string) => void;
  /**
   * 批量模式（false：SINGLE mode_single；true：ALL mode_all）
   */
  outputAll?: boolean;
}

/**
 * 物品分批器（ItemBatcherScreen）：9 幽灵过滤槽 + 9 缓冲槽 + 红石染色按钮行
 * + 批量模式切换按钮（item_batcher/mode_single / mode_all）。
 */
export function IeItemBatcherScreen({
  buffers = [],
  className,
  colors = [],
  filters = [],
  onColorClick,
  onModeToggle,
  onSlotClick,
  outputAll = false,
}: IeItemBatcherScreenProps) {
  const layout = IE_MACHINES.itemBatcher;
  const slots = ieExpandSlots(layout);
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
      {slots.map((slot) => {
        const index = Number(slot.label.split("-").pop());
        const isFilter = slot.label.startsWith("item-batcher-filter");
        return (
          <ScreenItemSlot
            item={(isFilter ? filters : buffers)[index] ?? undefined}
            key={slot.label}
            label={slot.label}
            left={slot.left}
            onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
            top={slot.top}
          />
        );
      })}
      {Array.from({ length: 9 }, (_, index) => {
        const on = colors[index] ?? false;
        return (
          <button
            aria-label={`红石染色 ${index}`}
            aria-pressed={on}
            data-ie-batcher-color={on ? "true" : "false"}
            key={`color-${index}`}
            onClick={onColorClick ? () => onColorClick(index) : undefined}
            style={{
              height: gui(18),
              left: gui(12 + index * 18),
              position: "absolute",
              top: gui(77),
              width: gui(18),
            }}
            type="button"
          >
            <IeSprite name={on ? "sprites/redstone_configuration/color_true" : "sprites/redstone_configuration/color_false"} />
          </button>
        );
      })}
      <button
        aria-label={outputAll ? "批量输出全部" : "按单物品批量"}
        aria-pressed={outputAll}
        data-ie-toggle-active={outputAll ? "true" : "false"}
        onClick={onModeToggle}
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
    </IeMachineScreen>
  );
}
