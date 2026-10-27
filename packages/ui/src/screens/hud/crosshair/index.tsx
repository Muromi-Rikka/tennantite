import { GuiSprite } from "../../../containers/gui-sprite/index";
import { cn } from "../../../lib/utils";
import { AttackIndicator } from "../attack-indicator/index";

export interface CrosshairProps {
  /**
   * 攻击指示器进度 0..1（可选）
   */
  attackIndicator?: number;
  className?: string;
  /**
   * 隐藏准星（规格 §6.1：可隐藏）
   */
  hidden?: boolean;
}

/**
 * MC 准星（规格 §6.1）：原版 15×15 `hud/crosshair.png`，overlay 语义。
 */
export function Crosshair({ attackIndicator, className, hidden = false }: CrosshairProps) {
  if (hidden) {
    return null;
  }
  return (
    <div aria-hidden="true" className={cn("inline-flex flex-col items-center", className)} data-hud="">
      <GuiSprite height={15} name="sprites/hud/crosshair.png" width={15} />
      {attackIndicator === undefined
        ? null
        : <AttackIndicator className="mt-2" progress={attackIndicator} variant="crosshair" />}
    </div>
  );
}
