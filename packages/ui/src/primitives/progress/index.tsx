import type { ComponentProps } from "react";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cn } from "../../lib/utils";

const fillVariantClasses = {
  boss: "bg-[#E3313B]",
  default: "bg-mc-xp",
  fuel: "bg-[#E2B84B]",
} as const;

export type ProgressProps = {
  /**
  * 填充色变体：default 经验绿 / boss 红 / fuel 燃料橙黄
  */
  variant?: keyof typeof fillVariantClasses;
} & ComponentProps<typeof BaseProgress.Root>;

/**
 * MC 进度条（规格 §4 #10）：黑底凹槽 + 亮色填充，用于经验条 / 加载条。
*/
export function Progress({ className, variant = "default", ...properties }: ProgressProps) {
  return (
    <BaseProgress.Root
      className={cn("flex w-full flex-col gap-4", className)}
      {...properties}
    >
      <BaseProgress.Track className="h-16 w-full border border-black bg-black shadow-mc-1">
        <BaseProgress.Indicator
          className={cn("h-full", fillVariantClasses[variant])}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
