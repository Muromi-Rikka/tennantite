import { cn, gui } from "../../../lib/utils";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../../../primitives/tooltip/index";

export interface EuBarProps {
  className?: string;
  /**
  * 槽高（GUI px，默认 48 —— IC2 经典机器能量槽）
  */
  height?: number;
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  /**
  * 绝对定位 x（GUI px，相对容器界面面板外沿；与 `top` 一起提供时绝对定位）
  */
  left?: number;
  /**
  * 最大存储 EU
  */
  max: number;
  /**
  * 悬浮显示 "X / Y EU" 物品提示（交互经水合增强）
  */
  tooltip?: boolean;
  /**
  * 绝对定位 y（GUI px）
  */
  top?: number;
  /**
  * 当前存储 EU
  */
  value: number;
  /**
  * 槽宽（GUI px，默认 14）
  */
  width?: number;
}

/**
 * IC2 EU 能量条（工业时代 2 视觉复刻）：深色内嵌槽 + 自下而上的信号绿填充 + 液面线。
 * 纯展示、数据注入，填充高度对齐整数 GUI px（规格 §6.4 像素不变量）。
 */
export function EuBar({
  className,
  height = 48,
  label,
  left,
  max,
  tooltip = false,
  top,
  value,
  width = 14,
}: EuBarProps) {
  const capacity = Math.max(0, height - 4);
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  const filled = Math.round(ratio * capacity);
  const isPositioned = left !== undefined || top !== undefined;

  const gauge = (
    <div
      aria-label={label}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn(isPositioned ? "absolute" : "relative", className)}
      role={label ? "progressbar" : undefined}
      style={{
        height: gui(height),
        left: left === undefined ? undefined : gui(left),
        top: top === undefined ? undefined : gui(top),
        width: gui(width),
      }}
    >
      <div aria-hidden="true" className="mc-tex-ic2-eu-track absolute inset-0" />
      {filled > 0
        ? (
            <div
              aria-hidden="true"
              className="mc-tex-ic2-eu-fill absolute"
              style={{ bottom: gui(1), height: gui(filled), left: gui(1), right: gui(1) }}
            />
          )
        : null}
      {filled > 0 && filled < capacity
        ? (
            <div
              aria-hidden="true"
              className="mc-tex-ic2-eu-surface absolute"
              style={{ bottom: gui(1 + filled), height: gui(1), left: gui(1), right: gui(1) }}
            />
          )
        : null}
    </div>
  );

  if (!tooltip) {
    return gauge;
  }

  const text = `${value} / ${max} EU`;
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        {gauge}
        <span className="sr-only">{label ?? text}</span>
      </TooltipTrigger>
      <TooltipPopup>{text}</TooltipPopup>
    </Tooltip>
  );
}
