import type { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  size?: ButtonSize;
  /**
  * 视觉变体：default 石纹（规格 §4 #1）/ success 主行动绿 / ghost 透明
  */
  variant?: ButtonVariant;
}

export type ButtonSize = "lg" | "md" | "sm";

export type ButtonVariant = "default" | "ghost" | "success";
