import type { ReactNode } from "react";

import { gui } from "@tennantite/ui";

import { IE_TEXT_COLOR } from "../ie-metrics";

export interface IeLabelProps {
  children: ReactNode;
  className?: string;
  /**
   * 左上角（GUI px）；省略 left 时水平居中于面板
   */
  left?: number;
  top: number;
}

/**
 * IE 界面文字（`Lib.COLOUR_I_ImmersiveOrange` #f78034）。
 */
export function IeLabel({ children, className, left, top }: IeLabelProps) {
  return (
    <span
      className={className
        ? `absolute font-mc mc-text whitespace-pre mc-text-shadow ${className}`
        : "absolute font-mc mc-text whitespace-pre mc-text-shadow"}
      style={{
        color: IE_TEXT_COLOR,
        left: left === undefined ? 0 : gui(left),
        right: left === undefined ? 0 : undefined,
        textAlign: left === undefined ? "center" : undefined,
        top: gui(top),
      }}
    >
      {children}
    </span>
  );
}
