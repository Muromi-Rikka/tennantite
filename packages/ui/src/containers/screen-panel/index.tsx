import type { GuiSpriteName } from "@tennantite/textures";
import type { ComponentProps, ReactNode } from "react";

import type { GuiSpriteRect } from "../gui-sprite/index";
import { cn, gui } from "../../lib/utils";
import { GuiSprite } from "../gui-sprite/index";
import { TitleBar } from "../title-bar/index";

export interface ScreenPanelProps extends Omit<ComponentProps<"div">, "title"> {
  /**
  * 原版容器背景精灵（如 `container/inventory.png`）
  */
  background?: GuiSpriteName;
  /**
  * 非 Sprite 背景的 CSS 纹理类（如 IC2 复刻 `.mc-tex-ic2-machine`）；
  * 未传 `background` 时替代默认 `.mc-tex-panel` 回退
  */
  backgroundClassName?: string;
  /**
  * 背景九宫格切片（源 PNG px）
  */
  backgroundSlice?: number | { bottom: number; left: number; right: number; top: number };
  /**
  * 背景裁剪区域；省略时为整图
  */
  backgroundSrc?: GuiSpriteRect;
  /**
  * 背景平铺
  */
  backgroundTile?: boolean;
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
 * 传入 `background` 时直接绘制原版背景（含烘焙槽框），否则使用通用面板。
 */
export function ScreenPanel({
  background,
  backgroundClassName = "mc-tex-panel",
  backgroundSlice,
  backgroundSrc,
  backgroundTile,
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
      {background
        ? (
            <GuiSprite
              className="absolute inset-0"
              height={height}
              name={background}
              slice={backgroundSlice}
              src={backgroundTile ? backgroundSrc : (backgroundSrc ?? { height, width, x: 0, y: 0 })}
              tile={backgroundTile}
              width={width}
            />
          )
        : <div aria-hidden="true" className={cn(backgroundClassName, "absolute inset-0")} />}
      <div className="absolute inset-0">
        {title === undefined
          ? null
          : <TitleBar align="start" className="absolute top-5 left-8" title={title} />}
        {children}
      </div>
    </div>
  );
}
