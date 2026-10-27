import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

import type { ButtonProps as ButtonProperties } from "./types";

/**
 * 原版按钮几何：200×20 GUI px，横向内边距 4 GUI px；
 * 悬浮 / 聚焦态的白色边框与填充变化由 textures.css 的伪类接管。
 */
export const buttonStyles = cva(
  [
    "mc-text-shadow inline-flex h-20 cursor-pointer items-center justify-center gap-0 px-4",
    "font-mc mc-text text-mc-text-main no-underline select-none",
    "disabled:cursor-not-allowed disabled:text-mc-text-dim",
  ].join(" "),
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "mc-tex-btn",
        ghost: [
          "bg-transparent",
          "hover:bg-white/10 active:bg-white/20",
          "focus-visible:mc-outline focus-visible:outline-white",
        ].join(" "),
        success: "mc-tex-btn-success focus-visible:mc-outline focus-visible:outline-white",
      },
    },
  },
);

export function buttonClassName({
  className,
  variant,
}: Pick<ButtonProperties, "className" | "variant">): string {
  return cn(buttonStyles({ variant }), className);
}
