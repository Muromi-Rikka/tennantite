import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";
import type { ModDataAttributes } from "../mod-sprite/index";
import type { ProgressDirection } from "../progress";
import { progressClipPath } from "../progress";

/**
 * progressbar 数值口径：
 * - `ratio`：0..1（默认，保持现有调用点输出不变）
 * - `percent`：0..100
 * - `raw`：原始数值（`value` / `max`）
*/
export type ModProgressAriaValue = "percent" | "ratio" | "raw";

export interface ModProgressProps {
  /**
  * progressbar 数值口径，默认 ratio
  */
  ariaValue?: ModProgressAriaValue;
  /**
  * 额外根节点 class
  */
  className?: string;
  /**
  * 额外 DOM 钩子（如 `{ "data-eio-energy-bar": "" }`），展开到根节点
  */
  dataAttributes?: ModDataAttributes;
  /**
  * 填充方向（默认向下）
  */
  direction?: ProgressDirection;
  /**
  * 填充节点（AE2 贴图裁剪件等）；与 `fillClassName` 二选一
  */
  fill?: ReactNode;
  /**
  * 填充纹理类
  */
  fillClassName?: string;
  /**
  * 纹理高（GUI px）
  */
  height: number;
  /**
  * 填充层向内缩进（GUI px，默认 0；用于让填充落在轨道边框内）
  */
  inset?: number;
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  left: number;
  /**
  * 上限；与 `value` 搭配使用
  */
  max?: number;
  /**
  * 进度 0..1；与 value/max 二选一，同时给出时优先
  */
  progress?: number;
  /**
  * 悬浮提示（默认等于 label）
  */
  title?: string;
  top: number;
  /**
  * 轨道节点（渲染在 aria-hidden 的 absolute inset-0 容器内）
  */
  track?: ReactNode;
  /**
  * 轨道纹理类（省略时仅绘制填充层）
  */
  trackClassName?: string;
  /**
  * 当前值；与 `max` 搭配使用
  */
  value?: number;
  /**
  * 纹理宽（GUI px）
  */
  width: number;
}

const clampRatio = (value: number) => Math.min(1, Math.max(0, value));

/**
 * 通用 mod 进度条：轨道 + 按比例裁剪的填充层，坐标为面板 GUI px。
 */
export function ModProgress({
  ariaValue = "ratio",
  className,
  dataAttributes,
  direction = "down",
  fill,
  fillClassName,
  height,
  inset = 0,
  label,
  left,
  max,
  progress,
  title = label,
  top,
  track,
  trackClassName,
  value,
  width,
}: ModProgressProps) {
  const ratio = clampRatio(
    progress ?? (max !== undefined && max > 0 ? (value ?? 0) / max : 0),
  );
  const aria = progressAriaValues(ariaValue, ratio, value, max);
  return (
    <div
      aria-label={label}
      aria-valuemax={aria.max}
      aria-valuemin={0}
      aria-valuenow={aria.now}
      className={cn("absolute", className)}
      role={label ? "progressbar" : undefined}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
      title={title}
      {...dataAttributes}
    >
      {track
        ? <div aria-hidden="true" className="absolute inset-0">{track}</div>
        : (trackClassName
            ? <div aria-hidden="true" className={cn("absolute inset-0", trackClassName)} />
            : null)}
      <div
        aria-hidden="true"
        className={cn("absolute", fillClassName)}
        style={{ clipPath: progressClipPath(direction, ratio), inset: gui(inset) }}
      >
        {fill}
      </div>
    </div>
  );
}

export function progressAriaValues(
  ariaValue: ModProgressAriaValue,
  ratio: number,
  value = 0,
  max = 0,
) {
  switch (ariaValue) {
    case "percent": {
      return { max: 100, now: Math.round(ratio * 100) };
    }
    case "raw": {
      return { max, now: value };
    }
    default: {
      return { max: 1, now: ratio };
    }
  }
}
