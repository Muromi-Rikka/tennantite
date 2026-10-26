import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface TitleBarProps extends Omit<ComponentProps<"div">, "title"> {
  align?: "center" | "end" | "start";
  title: ReactNode;
}

/**
 * MC 窗口标题栏（规格 §5 #5）：像素字体标题。
*/
export function TitleBar({
  align = "center",
  className,
  title,
  ...properties
}: TitleBarProps) {
  return (
    <div
      className={cn(
        "font-pixel text-mc-pixel text-mc-text-main mc-text-shadow",
        align === "center" && "text-center",
        align === "end" && "text-right",
        className,
      )}
      {...properties}
    >
      {title}
    </div>
  );
}
