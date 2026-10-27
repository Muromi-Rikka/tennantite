import type { ComponentProps } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "../../lib/utils";

const trackVariantClasses = {
  boss: "mc-tex-boss-bg",
  default: "mc-tex-xp-bg",
} as const;

const fillVariantClasses = {
  boss: "mc-tex-boss-fill",
  default: "mc-tex-xp-fill",
} as const;

export type ProgressProps = {
  /**
  * 填充变体：default 经验条（182×5 亮绿）/ boss Boss 条（182×5 粉紫）
  */
  variant?: ProgressVariant;
} & ComponentProps<typeof BaseProgress.Root>;

export type ProgressVariant = keyof typeof trackVariantClasses;

/**
 * MC 进度条（规格 §4 #10）：原版 5 GUI px 高，纹理按 182 GUI px 定宽裁剪，不缩放。
 * 用于经验条 / Boss 条。
*/
export function Progress({ className, variant = "default", ...properties }: ProgressProps) {
  return (
    <BaseProgress.Root
      className={cn("flex w-full flex-col gap-0", className)}
      {...properties}
    >
      <BaseProgress.Track className={cn("h-5 w-full overflow-hidden", trackVariantClasses[variant])}>
        <BaseProgress.Indicator
          className={cn("h-full", fillVariantClasses[variant])}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
