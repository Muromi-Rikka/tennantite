import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn } from "../../../lib/utils";

export interface JumpBarProps {
  className?: string;
  /**
  * 蓄力冷却 0..1（0 无冷却）
  */
  cooldown?: number;
  /**
  * 蓄力进度 0..1
  */
  progress: number;
}

/**
 * 跳跃蓄力条（规格 §6.1）：原版 182×5 jump_bar 精灵。
 */
export function JumpBar({ className, cooldown = 0, progress }: JumpBarProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  const cooldownRatio = Math.min(1, Math.max(0, cooldown));
  return (
    <div
      className={cn("relative h-5 w-182", className)}
      data-hud=""
    >
      <GuiSprite
        className="absolute inset-0"
        height={5}
        name="sprites/hud/jump_bar_background.png"
        width={182}
      />
      <GuiSprite
        className="absolute inset-0"
        height={5}
        name="sprites/hud/jump_bar_progress.png"
        style={{ clipPath: `inset(0 ${(1 - ratio) * 100}% 0 0)` }}
        width={182}
      />
      {cooldownRatio > 0
        ? (
            <GuiSprite
              className="absolute inset-0"
              height={5}
              name="sprites/hud/jump_bar_cooldown.png"
              style={{ clipPath: `inset(0 ${(1 - cooldownRatio) * 100}% 0 0)` }}
              width={182}
            />
          )
        : null}
    </div>
  );
}
