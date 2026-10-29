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
        height={84}
        left={IF_TANK_PANEL.left}
        name="titanium_background"
        top={IF_TANK_PANEL.top}
        width={30}
      />
      <IfSprite
        crop="slot"
        height={18}
        left={IF_TANK_PANEL.left + 4}
        name="titanium_background"
        top={IF_TANK_PANEL.top + 6}
        width={18}
      />
      <ScreenItemSlot
        frame={false}
        item={input}
        label="fluid-input"
        left={180}
        size={IF_ITEM_SIZE}
        top={101}
      />
      <IfProgress
        kind="arrow-down"
        label="流体传输"
        left={180}
        max={1}
        top={124}
        value={progress}
      />
      <IfSprite
        crop="slot"
        height={18}
        left={IF_TANK_PANEL.left + 4}
        name="titanium_background"
        top={IF_TANK_PANEL.top + 59}
        width={18}
      />
      <ScreenItemSlot
        frame={false}
        item={output}
        label="fluid-output"
        left={180}
        size={IF_ITEM_SIZE}
        top={154}
      />
    </div>
  );
}
