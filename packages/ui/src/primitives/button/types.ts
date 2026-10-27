import type { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  /**
  * 视觉变体：default 石纹（规格 §4 #1）/ success 主行动绿 / ghost 透明
  */
  variant?: ButtonVariant;
}

export type ButtonVariant = "default" | "ghost" | "success";
