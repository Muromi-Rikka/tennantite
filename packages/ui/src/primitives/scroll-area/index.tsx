import type { ComponentProps } from "react";

import { cn } from "../../lib/utils";

export type ScrollAreaProps = ComponentProps<"div">;

/**
 * MC 像素滚动区（规格 §4 #12，自研）：
 * 原生滚动 + 像素滚动条样式（见 css/scroll-area.css），SSR 安全。
 */
export function ScrollArea({ className, ...properties }: ScrollAreaProps) {
  return <div className={cn("mc-scroll", className)} {...properties} />;
}
