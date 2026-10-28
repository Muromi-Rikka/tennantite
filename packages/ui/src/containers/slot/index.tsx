import type { GuiSpriteName } from "@verdigris/textures";
import type { ComponentProps } from "react";

import { cn, gui } from "../../lib/utils";
import { GuiSprite } from "../gui-sprite/index";

export interface SlotProps extends ComponentProps<"div"> {
  /**
  * 不绘制槽位纹理（用于 HUD 热键栏等自带槽位纹理的容器）
  */
  bare?: boolean;
  /**
  * 自定义槽框纹理类（默认 `mc-tex-slot`；mod 界面可传自己的槽框）
  */
  frameClassName?: string;
  /**
  * 空槽 ghost 精灵
  */
  ghost?: GuiSpriteName;
  /**
  * 选中态：1 GUI px 白色内框
  */
  selected?: boolean;
  /**
  * 边长（GUI px，默认 18 —— 原版槽位）
  */
  size?: number;
}

/**
 * MC 物品格（规格 §5 #2）：凹槽视觉容器，是物品栏 / 箱子 / 快捷栏的最小复用单元。
 * 纯展示组件，RSC 兼容。
 */
export function Slot({
  bare = false,
  children,
  className,
  frameClassName = "mc-tex-slot",
  ghost,
  selected = false,
  size = 18,
  style,
  ...properties
}: SlotProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        !bare && frameClassName,
        selected && "mc-slot-selected",
        className,
      )}
      style={{ height: gui(size), width: gui(size), ...style }}
      {...properties}
    >
      {children ?? (ghost ? <GuiSprite height={16} name={ghost} width={16} /> : null)}
    </div>
  );
}
