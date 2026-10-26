import type { ComponentProps } from "react";

import { cn } from "../../lib/utils";

export interface SlotProps extends ComponentProps<"div"> {
  /**
  * 选中态：白色像素描边（规格 §7）
  */
  selected?: boolean;
  /**
  * 边长（px，1px 像素步进）
  */
  size?: number;
}

/**
 * MC 物品格（规格 §5 #2）：凹槽视觉容器，是物品栏 / 箱子 / 快捷栏的最小复用单元。
 * 纯展示组件，RSC 兼容。
 */
export function Slot({
  className,
  selected = false,
  size = 48,
  style,
  ...properties
}: SlotProps) {
  return (
    <div
      className={cn(
        "mc-tex-slot relative flex items-center justify-center",
        selected && "outline-2 -outline-offset-2 outline-white",
        className,
      )}
      style={{ height: size, width: size, ...style }}
      {...properties}
    />
  );
}
