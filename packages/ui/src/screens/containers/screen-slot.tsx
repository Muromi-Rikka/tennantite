import type { GuiSpriteName } from "@verdigris/textures";

import type { ScreenSlot } from "./types";
import { GuiSprite } from "../../containers/gui-sprite/index";
import { ItemStack } from "../../containers/item-stack/index";
import { Slot } from "../../containers/slot/index";
import { cn, gui } from "../../lib/utils";

export interface ScreenItemSlotProps {
  className?: string;
  /**
  * 绘制槽位凹槽（默认 false；容器背景已烘焙槽框）
  */
  frame?: boolean;
  /**
  * 自定义槽框纹理类（默认原版 `mc-tex-slot`）
  */
  frameClassName?: string;
  /**
  * 空槽 ghost 精灵（盔甲/盾/箭等）
  */
  ghost?: GuiSpriteName;
  /**
  * 物品
  */
  item?: ScreenSlot;
  /**
  * 可访问名称（测试与读屏用，如 `armor-0`）
  */
  label: string;
  /**
  * 槽位左上角 x（GUI px，从面板外沿起算）
  */
  left: number;
  /**
  * 交互回调；省略时槽位不可点击
  */
  onActivate?: () => void;
  /**
  * 边长（GUI px，默认 18 —— 原版槽位；结果槽 26）
  */
  size?: number;
  /**
  * 槽位左上角 y（GUI px，从面板外沿起算）
  */
  top: number;
}

/**
 * 容器界面绝对定位槽位（规格 §6）：坐标即原版 `container/*.png` 的槽位左上角。
 * 物品图标固定 16 GUI px，在结果槽（26）内居中偏移 5。
 * 背景已含槽框，因此默认不重复绘制 `Slot` 凹槽。
 */
export function ScreenItemSlot({
  className,
  frame = false,
  frameClassName,
  ghost,
  item,
  label,
  left,
  onActivate,
  size = 18,
  top,
}: ScreenItemSlotProps) {
  return (
    <Slot
      aria-label={label}
      bare={!frame}
      className={cn("absolute", onActivate ? "cursor-pointer" : undefined, className)}
      frameClassName={frameClassName}
      onClick={onActivate}
      size={size}
      style={{ left: gui(left), top: gui(top) }}
    >
      {item
        ? <ItemStack bare {...item} size={size} />
        : (ghost
            ? <GuiSprite height={16} name={ghost} width={16} />
            : null)}
    </Slot>
  );
}
