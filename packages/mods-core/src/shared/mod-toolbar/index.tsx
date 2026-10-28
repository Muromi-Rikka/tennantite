import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";
import { ModIconButton } from "../mod-icon-button";

export interface ModToolbarItem {
  icon?: ReactNode;
  iconClassName?: string;
  label: string;
  onClick?: () => void;
}

export interface ModToolbarProps {
  className?: string;
  items: ModToolbarItem[];
  /**
  * 工具栏左边（GUI px，默认 0）
  */
  left?: number;
  /**
  * 工具栏顶边（GUI px，默认 0）
  */
  top?: number;
}

/**
 * 通用 mod 竖向工具栏：16×16 凸起按钮，20 GUI px 节距，无底条。
 *
 * 按钮浮在屏幕黑底上（与 AE2 左侧工具栏一致），调用方用
 * `left` / `top` 把按钮贴到面板左外侧。
 */
export function ModToolbar({
  className,
  items,
  left = 0,
  top = 0,
}: ModToolbarProps) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        height: gui(items.length * 20),
        left: gui(left),
        top: gui(top),
        width: gui(16),
      }}
    >
      {items.map((item, index) => (
        <ModIconButton
          buttonClassName="mc-tex-ae2-toolbar-button"
          height={16}
          icon={item.icon}
          iconClassName={item.iconClassName}
          iconSize={12}
          key={item.label}
          label={item.label}
          left={0}
          onClick={item.onClick}
          top={index * 20}
          width={16}
        />
      ))}
    </div>
  );
}
