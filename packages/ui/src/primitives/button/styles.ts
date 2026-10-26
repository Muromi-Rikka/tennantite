import { cva } from "class-variance-authority";

import type { ButtonProps as ButtonProperties } from "./types";

export const buttonStyles = cva(
  [
    "mc-text-shadow inline-flex cursor-pointer items-center justify-center gap-8",
    "font-readable no-underline select-none",
    "text-mc text-mc-text-main",
    "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
    "disabled:cursor-not-allowed disabled:text-mc-text-dim",
  ].join(" "),
  {
    defaultVariants: {
      size: "md",
      variant: "default",
    },
    variants: {
      size: {
        lg: "h-40 px-24 text-mc-lg",
        md: "h-32 px-16",
        sm: "h-28 px-8 text-mc-pixel",
      },
      variant: {
        default: "mc-tex-btn",
        ghost: [
          "border-2 border-transparent bg-transparent",
          "hover:border-black hover:bg-mc-stone-dark/60",
          "active:bg-mc-stone-darker/60",
        ].join(" "),
        success: [
          "border-2 border-black bg-mc-accent-green shadow-mc-raised",
          "hover:brightness-110 active:shadow-mc-sunken active:brightness-90",
        ].join(" "),
      },
    },
  },
);

export function buttonClassName({
  className,
  size,
  variant,
}: Pick<ButtonProperties, "className" | "size" | "variant">): string {
  return buttonStyles({ className, size, variant });
}
