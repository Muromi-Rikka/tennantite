import type { CSSProperties } from "react";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn } from "../../../lib/utils";

export interface AttackIndicatorProps {
  className?: string;
  /**
  * 是否已蓄力满（显示 full 精灵）
  */
  full?: boolean;
  /**
  * 蓄力进度 0..1
  */
  progress: number;
  /**
  * 准星下方或快捷栏上方
  */
  style?: CSSProperties;
  variant?: "crosshair" | "hotbar";
}

/**
 * 攻击指示器（规格 §6.1）：原版 crosshair/hotbar attack indicator 精灵。
 */
export function AttackIndicator({
  className,
  full = false,
  progress,
  style,
  variant = "crosshair",
}: AttackIndicatorProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  if (variant === "hotbar") {
    return (
      <div className={cn("relative size-18", className)} data-hud="" style={style}>
        <GuiSprite
          className="absolute inset-0"
          height={18}
          name="sprites/hud/hotbar_attack_indicator_background.png"
          width={18}
        />
        <GuiSprite
          className="absolute inset-0"
          height={18}
          name="sprites/hud/hotbar_attack_indicator_progress.png"
          style={{ clipPath: `inset(0 0 ${(1 - ratio) * 100}% 0)` }}
          width={18}
        />
      </div>
    );
  }
  return (
    <div className={cn("relative size-16", className)} data-hud="" style={style}>
      {full
        ? (
            <GuiSprite
              className="absolute inset-0"
              height={16}
              name="sprites/hud/crosshair_attack_indicator_full.png"
              width={16}
            />
          )
        : (
            <>
              <GuiSprite
                className="absolute inset-x-0 bottom-0"
                height={4}
                name="sprites/hud/crosshair_attack_indicator_background.png"
                width={16}
              />
              <GuiSprite
                className="absolute inset-x-0 bottom-0"
                height={4}
                name="sprites/hud/crosshair_attack_indicator_progress.png"
                style={{ clipPath: `inset(0 ${(1 - ratio) * 100}% 0 0)` }}
                width={16}
              />
            </>
          )}
    </div>
  );
}
