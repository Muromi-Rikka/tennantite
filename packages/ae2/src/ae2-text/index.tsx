import type { ReactNode } from "react";

import { ModLabel } from "@tennantite/mods-core";

export interface Ae2TextProps {
  children: ReactNode;
  color?: string;
  /**
   * 行内文字：不绝对定位，跟随父级流式布局
   */
  inline?: boolean;
  left?: number;
  lineHeight?: number;
  right?: number;
  size?: number;
  top?: number;
}

/**
 * AE2 小号像素文字：5.4 px 默认字号，装饰性（aria-hidden）。
 */
export function Ae2Text({
  children,
  color,
  inline = false,
  left,
  lineHeight = 9,
  right,
  size = 5.4,
  top,
}: Ae2TextProps) {
  if (inline) {
    return (
      <span
        aria-hidden="true"
        className="font-mc whitespace-nowrap text-mc-ae2-text"
        style={{
          color,
          fontSize: `calc(var(--mc-gui) * ${size})`,
          lineHeight: `calc(var(--mc-gui) * ${lineHeight})`,
        }}
      >
        {children}
      </span>
    );
  }
  return (
    <ModLabel
      ariaHidden
      className="text-mc-ae2-text"
      color={color}
      left={left}
      lineHeight={lineHeight}
      right={right}
      size={size}
      top={top}
    >
      {children}
    </ModLabel>
  );
}
