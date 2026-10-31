import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";
import type { ModProgressAriaValue } from "../mod-progress/index";
import type { ModDataAttributes } from "../mod-sprite/index";
import type { ProgressDirection } from "../progress";
import { progressAriaValues, progressClipPath } from "../progress";

export interface ModTankProps {
  /**
  * progressbar 数值口径，默认 percent
  */
  ariaValue?: ModProgressAriaValue;
  className?: string;
  /**
  * 额外 DOM 钩子（如 `{ "data-thermal-fluid-tank": frame }`）
  */
  dataAttributes?: ModDataAttributes;
  /**
  * 填充方向（默认向上）
  */
  direction?: ProgressDirection;
  /**
  * 填充内容；省略时渲染纯色 tint
  */
  fill?: ReactNode;
  /**
  * 叠在填充之上的外框节点
  */
  frame?: ReactNode;
  height: number;
  /**
  * 填充区四边内缩（GUI px，默认 0）
  */
  inset?: number;
  label?: string;
  left: number;
  max: number;
  /**
  * 叠在最上层（可超出本体尺寸）的遮罩节点
  */
  overlay?: ReactNode;
  tint?: string;
  /**
  * 悬浮提示（默认等于 label）
  */
  title?: string;
  top: number;
  value: number;
  width: number;
}

/**
 * mod 液罐/储罐公共壳：内缩的填充层 + 外框 + 顶层遮罩，坐标为面板 GUI px。
 */
export function ModTank({
  ariaValue = "percent",
  className,
  dataAttributes,
  direction = "up",
  fill,
  frame,
  height,
  inset = 0,
  label,
  left,
  max,
  overlay,
  tint,
  title = label,
  top,
  value,
  width,
}: ModTankProps) {
  const ratio = clampRatio(value, max);
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
      <div className="absolute overflow-hidden" style={{ inset: gui(inset) }}>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundColor: fill ? undefined : tint,
            clipPath: progressClipPath(direction, ratio),
          }}
        >
          {fill}
        </div>
      </div>
      {frame ? <div className="absolute inset-0">{frame}</div> : null}
      {overlay ? <div className="absolute inset-0">{overlay}</div> : null}
    </div>
  );
}

function clampRatio(value: number, max: number) {
  return max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
}
