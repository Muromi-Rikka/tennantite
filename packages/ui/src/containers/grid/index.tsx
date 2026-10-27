import type { ComponentProps, CSSProperties } from "react";

import { cn, gui } from "../../lib/utils";

export interface GridProps extends ComponentProps<"div"> {
  /**
  * 单元格边长（GUI px，默认 18 —— 原版槽位）
  */
  cellSize?: number;
  /**
  * 列数（规格 §5 #2）
  */
  columns: number;
  /**
  * 单元格间距（GUI px，默认 0 —— 原版槽位紧邻）
  */
  gap?: number;
  /**
  * 行数（省略时按内容自动）
  */
  rows?: number;
}

/**
 * MC 物品格栅格（规格 §5 #2）：配合 Slot 编排 inventory / chest 布局。
 * 纯布局组件，RSC 兼容。
 */
export function Grid({
  cellSize = 18,
  className,
  columns,
  gap = 0,
  rows,
  style,
  ...properties
}: GridProps) {
  const gridStyle: CSSProperties = {
    gap: gui(gap),
    gridTemplateColumns: `repeat(${columns}, ${gui(cellSize)})`,
    ...(rows && { gridTemplateRows: `repeat(${rows}, ${gui(cellSize)})` }),
    ...style,
  };
  return (
    <div
      className={cn("grid content-start", className)}
      style={gridStyle}
      {...properties}
    />
  );
}
