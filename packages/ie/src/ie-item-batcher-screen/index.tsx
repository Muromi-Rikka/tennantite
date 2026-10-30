import type { ScreenSlot } from "@tennantite/ui";

import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

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
  const slotItems: Record<string, null | ScreenSlot | undefined> = {};
  for (const slot of slots) {
    const index = Number(slot.label.split("-").pop());
    const group = slot.label.startsWith("item-batcher-filter") ? filters : buffers;
    slotItems[slot.label] = group[index] ?? undefined;
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
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
      {Array.from({ length: 9 }, (_, index) => {
        const on = colors[index] ?? false;
        return (
          <IeSpriteButton
            dataAttributes={{ "data-ie-batcher-color": on ? "true" : "false" }}
            key={`color-${index}`}
            label={`红石染色 ${index}`}
            left={12 + index * 18}
            name="sprites/redstone_configuration/color_false"
            nameOn="sprites/redstone_configuration/color_true"
            onClick={onColorClick ? () => onColorClick(index) : undefined}
            pressed={on}
            top={77}
          />
        );
      })}
      <IeSpriteButton
        dataAttributes={{ "data-ie-toggle-active": outputAll ? "true" : "false" }}
        height={layout.toggle.height}
        label={outputAll ? "批量输出全部" : "按单物品批量"}
        left={layout.toggle.left}
        name={layout.toggle.spriteOff}
        nameOn={layout.toggle.spriteOn}
        onClick={onModeToggle}
        pressed={outputAll}
        top={layout.toggle.top}
        width={layout.toggle.width}
      />
    </IeMachineScreen>
  );
}
