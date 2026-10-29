import type { ScreenSlot } from "@tennantite/ui";

import { IF_AUGMENT_PANEL, IF_AUGMENT_SLOTS } from "../if-metrics";
import { IfSlot } from "../if-slot/index";
import { IfSprite } from "../if-sprite/index";

export interface IfAugmentPanelProps {
  className?: string;
  items?: ScreenSlot[];
}

/**
 * Titanium 升级面板 @ (175,4)：30×84 背景 + 4 个 PURPLE 遮罩槽。
 */
export function IfAugmentPanel({ className, items = [] }: IfAugmentPanelProps) {
  return (
    <div className={className} data-if-augment-panel="">
      <IfSprite
        crop="augmentPanel"
        height={84}
        left={IF_AUGMENT_PANEL.left}
        name="titanium_background"
        top={IF_AUGMENT_PANEL.top}
        width={30}
      />
      {IF_AUGMENT_SLOTS.map((top, index) => (
        <IfSlot
          color="purple"
          item={items[index]}
          key={top}
          label={`augment-${index}`}
          left={180}
          top={top}
        />
      ))}
    </div>
  );
}
