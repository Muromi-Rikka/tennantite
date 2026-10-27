import type { BossBarColor, BossBarNotch } from "../../../primitives/progress/index";
import { cn } from "../../../lib/utils";
import { Progress } from "../../../primitives/progress/index";

export interface BossBarProps {
  className?: string;
  /**
  * 条颜色；原版 7 色
  */
  color?: BossBarColor;
  /**
  * Boss 名称（标题，渲染在血条上方）
  */
  name: string;
  /**
  * 分段数；省略为连续条
  */
  notched?: BossBarNotch;
  /**
  * 血量进度 0..1
  */
  value: number;
}

/**
 * MC Boss 血条（规格 §6.1）：标题 + 原版 182×5 Boss 条，overlay 语义。
 */
export function BossBar({
  className,
  color = "purple",
  name,
  notched,
  value,
}: BossBarProps) {
  return (
    <div className={cn("w-182", className)} data-hud="">
      <div className="mb-2 text-center font-mc mc-text text-mc-text-main mc-text-shadow">
        {name}
      </div>
      <Progress
        aria-label={`Boss：${name}`}
        color={color}
        max={1}
        notched={notched}
        value={Math.min(1, Math.max(0, value))}
        variant="boss"
      />
    </div>
  );
}
