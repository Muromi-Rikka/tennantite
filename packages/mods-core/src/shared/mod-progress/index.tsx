import type { ReactNode } from "react";

import { cn, gui } from "@verdigris/ui";
import { progressClipPath } from "../progress";

export interface ModProgressProps {
  /**
  * 填充方向（默认向下）
  */
  direction?: "down" | "left" | "right" | "up";
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
  * 进度 0..1
  */
  progress: number;
  top: number;
  /**
  * 轨道纹理类（省略时仅绘制填充层）
  */
  trackClassName?: string;
  /**
  * 纹理宽（GUI px）
  */
  width: number;
}

/**
 * 通用 mod 进度条：轨道 + 按比例裁剪的填充层，坐标为面板 GUI px。
 */
export function ModProgress({
  direction = "down",
  fill,
  fillClassName,
  height,
  inset = 0,
  label,
  left,
  progress,
  top,
  trackClassName,
  width,
}: ModProgressProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  return (
    <div
      aria-label={label}
      aria-valuemax={1}
      aria-valuemin={0}
      aria-valuenow={ratio}
      className="absolute"
      role={label ? "progressbar" : undefined}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    >
      {trackClassName
        ? <div aria-hidden="true" className={cn("absolute inset-0", trackClassName)} />
        : null}
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
