import { Progress } from "../../../primitives/progress/index";

export interface BossBarProps {
  className?: string;
  /**
  * Boss 名称（紫色标题，渲染在血条上方）
  */
  name: string;
  /**
  * 血量进度 0..1
  */
  value: number;
}

/**
 * MC Boss 血条（规格 §6.1）：紫色标题 + 血条，overlay 语义。
*/
export function BossBar({ className, name, value }: BossBarProps) {
  return (
    <div className={className} data-hud="">
      <div className="mb-2 text-center font-readable text-mc text-[#C133E3] mc-text-shadow">
        {name}
      </div>
      <Progress
        aria-label={`Boss：${name}`}
        max={1}
        value={Math.min(1, Math.max(0, value))}
        variant="boss"
      />
    </div>
  );
}
