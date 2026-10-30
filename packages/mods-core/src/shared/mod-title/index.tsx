import type { ReactNode } from "react";

import { cn } from "@tennantite/ui";
import { ModLabel } from "../mod-label/index";

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
    <ModLabel
      className={cn("text-mc-ae2-text", className)}
      left={left}
      right={right}
      top={top}
    >
      {children}
    </ModLabel>
  );
}
