import type { ScreenSlot } from "@tennantite/ui";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EIO_TEXT_COLOR } from "../eio-metrics";

export interface EioEnchanterScreenProps {
  className?: string;
  /**
   * 附魔费用（`container.repair.cost`），负数或省略时不显示
   */
  cost?: number;
  items?: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
}

/**
 * 附魔台（176×166）：书 / 催化剂 / 青金石 / 输出四槽位与费用文本，
 * 无能量、进度与右侧控件（上游 `EnchanterScreen` 仅绘制背景与槽位）。
 */
export function EioEnchanterScreen({
  className,
  cost,
  items,
  onSlotClick,
}: EioEnchanterScreenProps) {
  const layout = EIO_MACHINES.enchanter;
  const itemsMap = items ?? {};

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="enchanter"
      player={layout.player}
      width={layout.width}
    >
      {layout.slots.map(slot => (
        <ScreenItemSlot
          item={itemsMap[slot.label]}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
      {cost !== undefined && cost >= 0
        ? (
            <span
              className="absolute font-mc mc-text whitespace-pre"
              style={{
                color: EIO_TEXT_COLOR,
                left: gui(8),
                top: gui(57),
              }}
            >
              附魔费用：
              {cost}
            </span>
          )
        : null}
    </EioMachineScreen>
  );
}
