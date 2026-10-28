import type { ReactNode } from "react";

import { cn, gui } from "@verdigris/ui";

const VARIANT_COLORS = {
  "button": "text-mc-mekanism-button",
  "button-inactive": "text-mc-mekanism-button-inactive",
  "screen": "text-mc-mekanism-screen",
  "subheading": "text-mc-mekanism-subheading",
  "title": "text-mc-mekanism-title",
} as const;

export interface MekanismLabelProps {
  children?: ReactNode;
  className?: string;
  left: number;
  top: number;
  variant?: MekanismLabelVariant;
  /**
   * 可选最大宽度（GUI px，超出省略）
   */
  width?: number;
}

export type MekanismLabelVariant = keyof typeof VARIANT_COLORS;

/**
 * Mekanism 文本（绝对定位，按层级取色）。
 */
export function MekanismLabel({
  children,
  className,
  left,
  top,
  variant = "title",
  width,
}: MekanismLabelProps) {
  return (
    <span
      className={cn(
        "absolute font-mc mc-text whitespace-pre",
        VARIANT_COLORS[variant],
        className,
      )}
      style={{
        left: gui(left),
        top: gui(top),
        ...(width !== undefined && { overflow: "hidden", textOverflow: "ellipsis", width: gui(width) }),
      }}
    >
      {children}
    </span>
  );
}
