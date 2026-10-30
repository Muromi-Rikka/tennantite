import type { CSSProperties, ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

export interface ModLabelProps {
  /**
  * 显式对齐；省略时：无 left/right/width → 居中拉伸，否则不设置
  */
  align?: "center" | "left" | "right";
  /**
  * 装饰性文字：从无障碍树隐藏
  */
  ariaHidden?: boolean;
  children: ReactNode;
  className?: string;
  color?: string;
  left?: number;
  /**
  * 行高（GUI px）
  */
  lineHeight?: number;
  right?: number;
  /**
  * 文本阴影类
  */
  shadow?: boolean;
  /**
  * 字号（GUI px）；给出时覆盖 mc-text 默认值
  */
  size?: number;
  style?: CSSProperties;
  top?: number;
  /**
  * 固定宽度（GUI px）
  */
  width?: number;
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
  const isUnbounded = left === undefined && right === undefined && width === undefined;
  return (
    <span
      aria-hidden={ariaHidden}
      className={cn("absolute font-mc mc-text whitespace-pre", shadow && "mc-text-shadow", className)}
      style={{
        color,
        fontSize: size === undefined ? undefined : gui(size),
        left: left === undefined ? (isUnbounded ? 0 : undefined) : gui(left),
        lineHeight: lineHeight === undefined ? undefined : gui(lineHeight),
        right: right === undefined ? (isUnbounded ? 0 : undefined) : gui(right),
        textAlign: align ?? (isUnbounded ? "center" : undefined),
        top: top === undefined ? undefined : gui(top),
        width: width === undefined ? undefined : gui(width),
        ...style,
      }}
    >
      {children}
    </span>
  );
}
