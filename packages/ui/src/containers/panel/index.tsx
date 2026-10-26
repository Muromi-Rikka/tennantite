import type { ComponentProps } from "react";

import { cn } from "../../lib/utils";

export interface PanelProps extends ComponentProps<"div"> {
  /**
  * default 窗口灰 / dark 半透明暗底（规格 §5 #1）
  */
  variant?: "dark" | "default";
}

/**
 * MC 面板（规格 §5 #1）：九宫格纹理容器，纯展示组件，RSC 兼容。
 */
export function Panel({
  className,
  variant = "default",
  ...properties
}: PanelProps) {
  return (
    <div
      className={cn(
        variant === "dark" ? "mc-tex-panel-dark" : "mc-tex-panel",
        "text-mc-text-main",
        className,
      )}
      {...properties}
    />
  );
}
