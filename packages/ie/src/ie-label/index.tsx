import type { ReactNode } from "react";

import { ModLabel } from "@tennantite/mods-core";

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
    <ModLabel className={className} color={IE_TEXT_COLOR} left={left} shadow top={top}>
      {children}
    </ModLabel>
  );
}
