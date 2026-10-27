import type { ComponentProps } from "react";

import { cn, gui } from "../../lib/utils";

export interface SlotProps extends ComponentProps<"div"> {
  /**
  * 不绘制槽位纹理（用于 HUD 热键栏等自带槽位纹理的容器）
  */
  bare?: boolean;
  /**
  * 选中态：1 GUI px 白色内框
  */
  selected?: boolean;
  /**
  * 边长（GUI px，默认 18 —— 原版槽位）
  */
  size?: number;
}

/**
 * MC 物品格（规格 §5 #2）：凹槽视觉容器，是物品栏 / 箱子 / 快捷栏的最小复用单元。
 * 纯展示组件，RSC 兼容。
 */
export function Slot({
  bare = false,
  className,
  selected = false,
  size = 18,
  style,
  ...properties
}: SlotProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        !bare && "mc-tex-slot",
        selected && "mc-slot-selected",
        className,
      )}
      style={{ height: gui(size), width: gui(size), ...style }}
      {...properties}
    />
  );
}
