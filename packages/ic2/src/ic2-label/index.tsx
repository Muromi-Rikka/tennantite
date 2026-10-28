import type { ReactNode } from "react";

import { gui } from "@tennantite/ui";

export interface Ic2LabelProps {
  children: ReactNode;
  className?: string;
  left: number;
  top: number;
}

/**
 * IC2 界面文字（绝对定位，`#404040`）。
 */
export function Ic2Label({ children, className, left, top }: Ic2LabelProps) {
  return (
    <span
      className={className
        ? `absolute font-mc mc-text whitespace-pre text-mc-ic2-text ${className}`
        : "absolute font-mc mc-text whitespace-pre text-mc-ic2-text"}
      style={{ left: gui(left), top: gui(top) }}
    >
      {children}
    </span>
  );
}
