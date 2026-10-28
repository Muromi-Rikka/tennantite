import type { ReactNode } from "react";

import { cn, gui } from "@verdigris/ui";

export interface ModTitleProps {
  children: ReactNode;
  className?: string;
  left?: number;
  right?: number;
  top?: number;
}

/**
 * 通用 mod 标题：普通像素文本，绝对定位，不使用原版标题栏。
 */
export function ModTitle({
  children,
  className,
  left,
  right,
  top,
}: ModTitleProps) {
  return (
    <span
      className={cn("absolute font-mc mc-text text-mc-ae2-text", className)}
      style={{
        left: left === undefined ? undefined : gui(left),
        right: right === undefined ? undefined : gui(right),
        top: top === undefined ? undefined : gui(top),
      }}
    >
      {children}
    </span>
  );
}
