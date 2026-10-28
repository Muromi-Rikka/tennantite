import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismInnerScreenProps {
  children?: ReactNode;
  className?: string;
  height: number;
  left: number;
  /**
   * 内边距（GUI px，默认 3）
   */
  padding?: number;
  top: number;
  width: number;
}

/**
 * 内嵌屏幕：九宫格 inner_screen + 可滚动内容的静态裁切。
 */
export function MekanismInnerScreen({
  children,
  className,
  height,
  left,
  padding = 3,
  top,
  width,
}: MekanismInnerScreenProps) {
  return (
    <div
      className={cn("absolute overflow-hidden", className)}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    >
      <MekanismSprite height={height} name="inner_screen" width={width} />
      <div
        className="absolute flex flex-col font-mc mc-text text-mc-mekanism-screen"
        style={{
          bottom: gui(padding),
          left: gui(padding),
          right: gui(padding),
          top: gui(padding),
        }}
      >
        {children}
      </div>
    </div>
  );
}
