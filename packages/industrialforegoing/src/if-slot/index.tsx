import type { ScreenSlot } from "@tennantite/ui";
import { gui, ScreenItemSlot } from "@tennantite/ui";
import type { IfDyeColor } from "../if-metrics";

import { IF_DYE_FIREWORK, IF_DYE_MAP, IF_ITEM_SIZE, IF_SLOT_SIZE } from "../if-metrics";
import { IfSprite } from "../if-sprite/index";

export interface IfSlotProps {
  className?: string;
  color: IfDyeColor;
  /**
   * 槽框：普通槽（框在物品左上 -1,-1）或过滤槽（框与物品重合 18×18）
   */
  frame?: "filter" | "slot";
  item?: ScreenSlot;
  /**
   * 可访问名称（测试与读屏用）
   */
  label: string;
  /**
   * 物品左上角（普通槽）/ 槽框左上角（过滤槽），GUI px
   */
  left: number;
  onActivate?: () => void;
  top: number;
}

/**
 * Industrial Foregoing 槽位：Titanium 槽框 + `SidedInventoryComponent` 双色遮罩
 * （外圈 20×20 alpha 0.25，内层 16×16 alpha 0.5）。过滤槽改用 firework 色。
 */
export function IfSlot({
  className,
  color,
  frame = "slot",
  item,
  label,
  left,
  onActivate,
  top,
}: IfSlotProps) {
  const isFilter = frame === "filter";
  const frameLeft = isFilter ? left : left - 1;
  const frameTop = isFilter ? top : top - 1;
  const itemLeft = isFilter ? left + 1 : left;
  const itemTop = isFilter ? top + 1 : top;
  const maskColor = isFilter ? IF_DYE_FIREWORK[color] : IF_DYE_MAP[color];

  return (
    <>
      <IfSprite
        crop="slot"
        height={IF_SLOT_SIZE}
        left={frameLeft}
        name="titanium_background"
        top={frameTop}
        width={IF_SLOT_SIZE}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          backgroundColor: maskColor,
          height: gui(isFilter ? IF_ITEM_SIZE : IF_ITEM_SIZE + 4),
          left: gui(isFilter ? left + 1 : left - 2),
          opacity: isFilter ? 0.5 : 0.25,
          top: gui(isFilter ? top + 1 : top - 2),
          width: gui(isFilter ? IF_ITEM_SIZE : IF_ITEM_SIZE + 4),
        }}
      />
      <ScreenItemSlot
        className={className}
        frame={false}
        item={item}
        label={label}
        left={itemLeft}
        onActivate={onActivate}
        size={IF_ITEM_SIZE}
        top={itemTop}
      />
      {item
        ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute"
              style={{
                backgroundColor: maskColor,
                height: gui(IF_ITEM_SIZE),
                left: gui(itemLeft),
                opacity: 0.5,
                top: gui(itemTop),
                width: gui(IF_ITEM_SIZE),
              }}
            />
          )
        : null}
    </>
  );
}
