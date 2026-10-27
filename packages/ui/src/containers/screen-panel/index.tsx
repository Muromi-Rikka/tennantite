import type { ComponentProps, ReactNode } from "react";

import { cn, gui } from "../../lib/utils";
import { TitleBar } from "../title-bar/index";

export interface ScreenPanelProps extends Omit<ComponentProps<"div">, "title"> {
  /**
  * 面板高度（GUI px，原版容器界面 166）
  */
  height: number;
  /**
  * 窗口标题（渲染在 (8,6) 的原版标题位置）
  */
  title?: ReactNode;
  /**
  * 面板宽度（GUI px，原版容器界面 176）
  */
  width: number;
}

/**
 * MC 容器界面面板（规格 §6）：绝对坐标基座。
 *
 * 面板纹理铺满整块面积，子元素坐标从面板外沿 (0,0) 起算的 GUI px ——
 * 因此槽位坐标可直接照抄原版 `container/*.png` 的数值，不受 3px 边框影响。
 */
export function ScreenPanel({
  children,
  className,
  height,
  style,
  title,
  width,
  ...properties
}: ScreenPanelProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ height: gui(height), width: gui(width), ...style }}
      {...properties}
    >
      <div aria-hidden="true" className="mc-tex-panel absolute inset-0" />
      <div className="absolute inset-0">
        {title === undefined
          ? null
          : <TitleBar align="start" className="absolute top-5 left-8" title={title} />}
        {children}
      </div>
    </div>
  );
}
