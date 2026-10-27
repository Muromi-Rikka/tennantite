import type { GuiSpriteName } from "@verdigris/textures";
import type { ComponentProps } from "react";

import { Progress as BaseProgress } from "@base-ui/react/progress";

import { GuiSprite } from "../../containers/gui-sprite/index";
import { cn } from "../../lib/utils";

export type BossBarColor
  = | "blue"
    | "green"
    | "pink"
    | "purple"
    | "red"
    | "white"
    | "yellow";

export type BossBarNotch = 6 | 10 | 12 | 20;

export type ProgressProps = {
  /**
   * Boss 条颜色（仅 variant="boss"）
   */
  color?: BossBarColor;
  /**
   * Boss 条分段数（仅 variant="boss"；省略为连续条）
   */
  notched?: BossBarNotch;
  /**
   * 填充变体：xp 经验条 / boss Boss 条
   */
  variant?: ProgressVariant;
} & ComponentProps<typeof BaseProgress.Root>;

export type ProgressVariant = "boss" | "xp";

/**
 * MC 进度条（规格 §4 #10）：原版 182×5 GUI px 纹理，按比例裁剪，不缩放。
 * 用于经验条 / Boss 条。
 */
export function Progress({
  className,
  color = "purple",
  max = 100,
  notched,
  value = 0,
  variant = "xp",
  ...properties
}: ProgressProps) {
  const ratio
    = typeof value === "number" ? Math.min(1, Math.max(0, value / (max || 1))) : 0;
  const prefix
    = variant === "xp"
      ? null
      : (notched
          ? `sprites/boss_bar/notched_${notched}`
          : `sprites/boss_bar/${color}`);
  const backgroundName = (prefix
    ? `${prefix}_background.png`
    : "sprites/hud/experience_bar_background.png") as GuiSpriteName;
  const progressName = (prefix
    ? `${prefix}_progress.png`
    : "sprites/hud/experience_bar_progress.png") as GuiSpriteName;

  return (
    <BaseProgress.Root
      className={cn("flex w-182 flex-col gap-0", className)}
      max={max}
      value={value}
      {...properties}
    >
      <BaseProgress.Track className={cn("relative h-5 w-full overflow-hidden", variant === "boss" ? "mc-tex-boss-bg" : "mc-tex-xp-bg")}>
        <GuiSprite
          className="absolute inset-0"
          height={5}
          name={backgroundName}
          width={182}
        />
        <GuiSprite
          className={cn("absolute inset-0", variant === "boss" ? "mc-tex-boss-fill" : "mc-tex-xp-fill")}
          height={5}
          name={progressName}
          style={{ clipPath: `inset(0 ${(1 - ratio) * 100}% 0 0)` }}
          width={182}
        />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
