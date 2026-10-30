import type { ScreenSlot } from "@tennantite/ui";

import { gui } from "@tennantite/ui";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IE_TEXT_COLOR } from "../ie-metrics";

export interface IeCrateScreenProps {
  className?: string;
  /**
   * 27 个存储槽
   */
  items?: Array<null | ScreenSlot>;
  /**
   * 箱名（CrateScreen#nameField，编辑即发 name 包）
   */
  name?: string;
  onNameChange?: (name: string) => void;
  onSlotClick?: (label: string) => void;
}

/**
 * 木箱（CrateScreen）：3×9 存储槽 + 顶部可编辑名称框
 * （EditBox (8,6,162,12)，橙色无边框文字，替代标题）。
 */
export function IeCrateScreen({
  className,
  items = [],
  name = "",
  onNameChange,
  onSlotClick,
}: IeCrateScreenProps) {
  const layout = IE_MACHINES.crate;
  const slots = ieExpandSlots(layout);
  const slotItems: Record<string, ScreenSlot | undefined> = {};
  for (const [index, slot] of slots.entries()) {
    slotItems[slot.label] = items[index] ?? undefined;
  }
  return (
    <IeMachineScreen
      background={layout.background}
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title=""
      width={layout.width}
    >
      <input
        aria-label="木箱名称"
        className="absolute bg-transparent font-mc mc-text outline-none"
        data-ie-crate-name=""
        maxLength={30}
        onChange={onNameChange ? event => onNameChange(event.target.value) : undefined}
        style={{
          color: IE_TEXT_COLOR,
          height: gui(12),
          left: gui(8),
          textShadow: "none",
          top: gui(6),
          width: gui(162),
        }}
        value={name}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
    </IeMachineScreen>
  );
}
