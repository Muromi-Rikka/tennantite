import { cn, gui } from "../../../lib/utils";

export interface CrosshairProps {
  className?: string;
  /**
   * 隐藏准星（规格 §6.1：可隐藏）
   */
  hidden?: boolean;
  /**
   * 十字边长（GUI px，默认 9）
   */
  size?: number;
  /**
   * 线宽（GUI px，默认 1）
   */
  thickness?: number;
}

/**
 * MC 准星（规格 §6.1）：纯 CSS 十字，overlay 语义，可隐藏。
*/
export function Crosshair({
  className,
  hidden = false,
  size = 9,
  thickness = 1,
}: CrosshairProps) {
  if (hidden) {
    return null;
  }
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative", className)}
      data-hud=""
      style={{ height: gui(size), width: gui(size) }}
    >
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white mix-blend-difference"
        style={{ height: gui(thickness), width: gui(size) }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 bg-white mix-blend-difference"
        style={{ height: gui(size), width: gui(thickness) }}
      />
    </div>
  );
}
