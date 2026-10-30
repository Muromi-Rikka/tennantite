import type { ScreenSlot } from "@tennantite/ui";
import { ScreenItemSlot } from "@tennantite/ui";

import { IF_ITEM_SIZE, IF_TANK_PANEL } from "../if-metrics";
import { IfProgress } from "../if-progress/index";
import { IfSprite } from "../if-sprite/index";

export interface IfTankPanelProps {
  className?: string;
  input?: ScreenSlot;
  output?: ScreenSlot;
  /**
   * 0..1
   */
  progress?: number;
}

/**
 * Titanium 流体交互面板 @ (175,94)：输入桶槽 / 向下箭头 / 输出桶槽。
 * 槽位 ghost 依赖物品图标；仓库没有桶图标时留空，不画假图标。
 */
export function IfTankPanel({ className, input, output, progress = 0 }: IfTankPanelProps) {
  return (
    <div className={className} data-if-tank-panel="">
      <IfSprite
        crop="augmentPanel"
        height={IF_TANK_PANEL.height}
        left={IF_TANK_PANEL.left}
        name="titanium_background"
        top={IF_TANK_PANEL.top}
        width={IF_TANK_PANEL.width}
      />
      <IfSprite
        crop="slot"
        height={IF_TANK_PANEL.slotSize}
        left={IF_TANK_PANEL.slotLeft}
        name="titanium_background"
        top={IF_TANK_PANEL.inputSlotTop}
        width={IF_TANK_PANEL.slotSize}
      />
      <ScreenItemSlot
        frame={false}
        item={input}
        label="fluid-input"
        left={IF_TANK_PANEL.itemLeft}
        size={IF_ITEM_SIZE}
        top={IF_TANK_PANEL.inputTop}
      />
      <IfProgress
        kind="arrow-down"
        label="流体传输"
        left={IF_TANK_PANEL.itemLeft}
        max={1}
        top={IF_TANK_PANEL.arrowTop}
        value={progress}
      />
      <IfSprite
        crop="slot"
        height={IF_TANK_PANEL.slotSize}
        left={IF_TANK_PANEL.slotLeft}
        name="titanium_background"
        top={IF_TANK_PANEL.outputSlotTop}
        width={IF_TANK_PANEL.slotSize}
      />
      <ScreenItemSlot
        frame={false}
        item={output}
        label="fluid-output"
        left={IF_TANK_PANEL.itemLeft}
        size={IF_ITEM_SIZE}
        top={IF_TANK_PANEL.outputTop}
      />
    </div>
  );
}
