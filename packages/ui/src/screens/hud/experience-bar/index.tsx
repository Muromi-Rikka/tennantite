import { Progress } from "../../../primitives/progress/index";

export interface ExperienceBarProps {
  className?: string;
  /**
  * 等级数字（渲染在进度条中央上方）
  */
  level: number;
  /**
  * 进度 0..1
  */
  progress: number;
}

/**
 * MC 经验条（规格 §6.1）：绿色进度 + 中央等级徽标，overlay 语义。
*/
export function ExperienceBar({ className, level, progress }: ExperienceBarProps) {
  return (
    <div className={className} data-hud="">
      <div className="relative">
        <Progress
          aria-label={`经验：等级 ${level}`}
          max={1}
          value={Math.min(1, Math.max(0, progress))}
          variant="default"
        />
        <span
          aria-hidden="true"
          className="absolute -top-4 left-1/2 -translate-x-1/2 font-readable text-mc text-mc-xp mc-text-shadow"
        >
          {level}
        </span>
      </div>
    </div>
  );
}
