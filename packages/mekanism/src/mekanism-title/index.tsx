import type { CSSProperties, ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

export interface MekanismTitleProps {
  children?: ReactNode;
  className?: string;
  /**
   * 标题右界（GUI px，默认面板宽 - 4）
   */
  titleEnd?: number;
  /**
   * 标题左界（GUI px，默认 4）
   */
  titleX?: number;
  /**
   * 标题基线 y（GUI px，默认 6）
   */
  top?: number;
}

/**
 * Mekanism 面板标题：左界 / 右界之间居中，无阴影。
 */
export function MekanismTitle({
  children,
  className,
  titleEnd,
  titleX = 4,
  top = 6,
}: MekanismTitleProps) {
  const style: CSSProperties = { left: gui(titleX), top: gui(top) };
  if (titleEnd === undefined) {
    style.right = gui(4);
  }
  else {
    style.width = gui(Math.max(0, titleEnd - titleX));
  }
  return (
    <span
      className={cn(
        "absolute text-center font-mc mc-text whitespace-pre text-mc-mekanism-title",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
