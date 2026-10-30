import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

export interface ModScissorListProps {
  children: ReactNode;
  className?: string;
  height: number;
  left: number;
  /**
  * 内容纵向滚动偏移（GUI px，默认 0）
  */
  scroll?: number;
  top: number;
  width: number;
}

/**
 * mod 裁剪视口：子节点使用窗口坐标，组件按视口原点补偿并裁剪。
 */
export function ModScissorList({
  children,
  className,
  height,
  left,
  scroll = 0,
  top,
  width,
}: ModScissorListProps) {
  return (
    <div
      className={cn("absolute overflow-hidden", className)}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    >
      <div
        className="absolute"
        style={{ left: gui(-left), top: gui(-top - scroll), width: gui(width + left) }}
      >
        {children}
      </div>
    </div>
  );
}
