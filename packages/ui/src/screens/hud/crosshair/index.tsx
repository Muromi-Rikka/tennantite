import { cn } from "../../../lib/utils";

export interface CrosshairProps {
  className?: string;
  /**
   * 隐藏准星（规格 §6.1：可隐藏）
   */
  hidden?: boolean;
  /**
   * 十字边长（px，默认 16）
   */
  size?: number;
  /**
   * 线宽（px，默认 2）
   */
  thickness?: number;
}

/**
 * MC 准星（规格 §6.1）：纯 CSS 十字，overlay 语义，可隐藏。
*/
export function Crosshair({
  className,
  hidden = false,
  size = 16,
  thickness = 2,
}: CrosshairProps) {
  if (hidden) {
    return null;
  }
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative", className)}
      data-hud=""
      style={{ height: size, width: size }}
    >
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white mix-blend-difference"
        style={{ height: thickness, width: size }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-white mix-blend-difference"
        style={{ height: size, width: thickness }}
      />
    </div>
  );
}
