import type { ScreenSlot } from "./types";
import { ItemStack } from "../../containers/item-stack/index";
import { Slot } from "../../containers/slot/index";
import { cn, gui } from "../../lib/utils";

export interface ScreenItemSlotProps {
  className?: string;
  /**
  * 物品（空槽渲染凹陷纹理）
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
 */
export function ScreenItemSlot({
  className,
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
      className={cn("absolute", onActivate ? "cursor-pointer" : undefined, className)}
      onClick={onActivate}
      size={size}
      style={{ left: gui(left), top: gui(top) }}
    >
      {item ? <ItemStack bare {...item} size={size} /> : null}
    </Slot>
  );
}
