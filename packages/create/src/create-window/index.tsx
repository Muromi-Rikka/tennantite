import type { PlayerInventoryProps } from "@tennantite/ui";
import type { ReactNode } from "react";

import { ModLabel } from "@tennantite/mods-core";
import { cn, gui, PlayerInventory } from "@tennantite/ui";

export interface CreateWindowPlayer {
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  hotbarY?: number;
  mainItems?: PlayerInventoryProps["mainItems"];
  x?: number;
  y?: number;
}

export interface CreateWindowProps {
  /**
   * 背板节点序列（原版一张或多张拼接贴图）
   */
  background?: ReactNode;
  children?: ReactNode;
  className?: string;
  /**
   * 窗口高度（GUI px）；省略时不写入高度，由内容自适应（浮层面板）
   */
  height?: number;
  /**
   * 玩家背包；省略时按 `PlayerInventory` 默认坐标渲染，传 `false` 不渲染
   */
  player?: CreateWindowPlayer | false;
  title?: ReactNode;
  /**
   * 标题对齐（默认由 `ModLabel` 按锚点推断）
   */
  titleAlign?: "center" | "left";
  titleClassName?: string;
  titleColor?: string;
  titleLeft?: number;
  /**
   * 标题纵向位置（GUI px，给出 title 时默认 0）
   */
  titleTop?: number;
  titleWidth?: number;
  width: number;
  /**
   * 根节点 class，默认 `mc-create-window`
   */
  windowClassName?: string;
}

/**
 * Create 界面窗口骨架：背板 + 标题 + 内容 + 玩家背包，统一窗口尺寸与定位。
 */
export function CreateWindow({
  background,
  children,
  className,
  height,
  player,
  title,
  titleAlign,
  titleClassName,
  titleColor,
  titleLeft,
  titleTop = 0,
  titleWidth,
  width,
  windowClassName = "mc-create-window",
}: CreateWindowProps) {
  return (
    <div
      className={cn(windowClassName, "relative inline-block", className)}
      style={{
        height: height === undefined ? undefined : gui(height),
        width: gui(width),
      }}
    >
      {background}
      {title === undefined || title === null
        ? null
        : (
            <ModLabel
              align={titleAlign}
              className={titleClassName}
              color={titleColor}
              left={titleLeft}
              top={titleTop}
              width={titleWidth}
            >
              {title}
            </ModLabel>
          )}
      {children}
      {player === false ? null : <PlayerInventory {...player} />}
    </div>
  );
}
