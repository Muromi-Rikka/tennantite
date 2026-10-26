import type { ComponentProps } from "react";
import { cva } from "class-variance-authority";

import { cn } from "../../lib/utils";

const badgeStyles = cva(
  [
    "mc-text-shadow inline-flex items-center justify-center whitespace-nowrap",
    "font-readable text-mc leading-none",
  ].join(" "),
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        /**
        * 物品数量：白字黑影（MC 计数样式）
        */
        default: "text-mc-text-main",
        /**
        * 次要信息：暗灰
        */
        dim: "text-mc-text-dim",
        /**
        * 稀有 / 标题：金色
        */
        gold: "text-mc-gold",
      },
    },
  },
);

export interface BadgeProps extends ComponentProps<"span"> {
  variant?: BadgeVariant;
}

export type BadgeVariant = "default" | "dim" | "gold";

/**
 * MC 计数徽标（规格 §4 #13，自研纯样式）：物品数量 / 稀有标识。
*/
export function Badge({ className, variant, ...properties }: BadgeProps) {
  return (
    <span
      className={cn(badgeStyles({ className, variant }))}
      {...properties}
    />
  );
}
