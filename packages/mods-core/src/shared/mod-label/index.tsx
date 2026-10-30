import type { CSSProperties, ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

export interface ModLabelProps {
  children: ReactNode;
  className?: string;
  color?: string;
  /**
  * 字号（GUI px）；给出时覆盖 mc-text 默认值
  */
  size?: number;
  /**
  * 行高（GUI px）
  */
  lineHeight?: number;
  left?: number;
  right?: number;
  top?: number;
  /**
  * 文本阴影类
  */
  shadow?: boolean;
  /**
  * 显式对齐；省略时：无 left/right/width → 居中拉伸，否则不设置
  */
  align?: "center" | "left" | "right";
  /**
  * 装饰性文字：从无障碍树隐藏
  */
  ariaHidden?: boolean;
  /**
  * 固定宽度（GUI px）
  */
  width?: number;
  style?: CSSProperties;
}

/**
 * mod 像素文字：绝对定位，默认在无水平锚点时居中对齐。
 */
export function ModLabel({
  align,
  ariaHidden,
  children,
  className,
  color,
  left,
  lineHeight,
  right,
  shadow,
  size,
  style,
  top,
  width,
}: ModLabelProps) {
  const unbounded = left === undefined && right === undefined && width === undefined;
  return (
    <span
      aria-hidden={ariaHidden}
      className={cn("absolute font-mc mc-text whitespace-pre", shadow && "mc-text-shadow", className)}
      style={{
        color,
        fontSize: size === undefined ? undefined : gui(size),
        left: left !== undefined ? gui(left) : unbounded ? 0 : undefined,
        lineHeight: lineHeight === undefined ? undefined : gui(lineHeight),
        right: right !== undefined ? gui(right) : unbounded ? 0 : undefined,
        textAlign: align ?? (unbounded ? "center" : undefined),
        top: top === undefined ? undefined : gui(top),
        width: width === undefined ? undefined : gui(width),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
