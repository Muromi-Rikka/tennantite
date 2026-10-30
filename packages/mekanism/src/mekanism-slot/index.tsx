import type { MekanismSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import type { KeyboardEvent } from "react";
import { cn, gui, ItemStack } from "@tennantite/ui";
import type { MekanismSlotOverlay, MekanismSlotType } from "../mekanism-types";
import { MEKANISM_SLOT_SPRITES } from "../mekanism-metrics";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismSlotProps {
  className?: string;
  /**
   * 槽框高度（GUI px，默认 18）
   */
  height?: number;
  /**
   * 物品
   */
  item?: ScreenSlot;
  /**
   * 可访问名称
   */
  label: string;
  /**
   * 槽框左上角 x（GUI px）
   */
  left: number;
  /**
   * 点击回调
   */
  onActivate?: () => void;
  /**
   * 槽位覆盖图标
   */
  overlay?: MekanismSlotOverlay;
  /**
   * 槽框顶部 y（GUI px）
   */
  top: number;
  /**
   * 槽位纹理类型
   */
  type: MekanismSlotType;
  /**
   * 槽框宽度（GUI px，默认 18）
   */
  width?: number;
}

/**
 * Mekanism 物品槽：槽框贴图 + 16×16 物品 + 可选覆盖图标。
 * 坐标为槽框左上角（容器 `slot.x - 1` / `slot.y - 1`）。
 */
export function MekanismSlot({
  className,
  height = 18,
  item,
  label,
  left,
  onActivate,
  overlay,
  top,
  type,
  width = 18,
}: MekanismSlotProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onActivate || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }
    event.preventDefault();
    onActivate();
  };

  return (
    <div
      aria-label={label}
      className={cn(
        "absolute",
        onActivate ? "cursor-pointer" : undefined,
        className,
      )}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
      role={onActivate ? "button" : undefined}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
      tabIndex={onActivate ? 0 : undefined}
    >
      <MekanismSprite height={height} name={MEKANISM_SLOT_SPRITES[type]} width={width} />
      {item
        ? (
            <div className="absolute top-0 left-0 z-10">
              <ItemStack bare {...item} size={18} />
            </div>
          )
        : null}
      {overlay
        ? (
            <MekanismSprite
              className="absolute"
              height={height}
              left={0}
              name={`slot/overlay/${overlay}` as MekanismSpriteName}
              top={0}
              width={width}
            />
          )
        : null}
    </div>
  );
}
