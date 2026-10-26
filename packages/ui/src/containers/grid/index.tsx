import type { ComponentProps, CSSProperties } from "react";

import { cn } from "../../lib/utils";

export interface GridProps extends ComponentProps<"div"> {
  /**
  * 列数（规格 §5 #2）
  */
  columns: number;
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
  className,
  columns,
  rows,
  style,
  ...properties
}: GridProps) {
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    ...(rows && { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }),
    ...style,
  };
  return (
    <div
      className={cn("grid content-start gap-4", className)}
      style={gridStyle}
      {...properties}
    />
  );
}
