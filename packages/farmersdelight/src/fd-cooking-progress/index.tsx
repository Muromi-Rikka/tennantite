import { ModProgress } from "@tennantite/mods-core";

import { FD_COOK_PROGRESS } from "../fd-metrics";
import { FdSprite } from "../fd-sprite";

export interface FdCookingProgressProps {
  className?: string;
  /**
   * 无障碍标签（默认「烹饪进度」）
   */
  label?: string;
  /**
   * 绝对定位左（GUI px，默认 89）
   */
  left?: number;
  /**
   * 进度 0..1（cookTime / cookTimeTotal）
   */
  progress?: number;
  /**
   * 绝对定位上（GUI px，默认 25）
   */
  top?: number;
}

/**
 * 厨锅烹饪进度：上游 `PROGRESS_ARROW = (89, 25)`，箭头源图 `(176, 15, 24, 17)`，
 * 轨道宽 25 px，自左向右按比例裁剪。
 */
export function FdCookingProgress({
  className,
  label = "烹饪进度",
  left,
  progress = 0,
  top,
}: FdCookingProgressProps) {
  return (
    <div className={className}>
      <ModProgress
        direction="right"
        fill={(
          <FdSprite
            crop={FD_COOK_PROGRESS.crop}
            height={FD_COOK_PROGRESS.height}
            name="cooking_pot"
            width={FD_COOK_PROGRESS.crop.width}
          />
        )}
        height={FD_COOK_PROGRESS.height}
        label={label}
        left={left ?? FD_COOK_PROGRESS.left}
        progress={progress}
        top={top ?? FD_COOK_PROGRESS.top}
        width={FD_COOK_PROGRESS.width}
      />
    </div>
  );
}
