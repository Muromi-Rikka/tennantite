import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";
import type { ModDataAttributes } from "../mod-sprite/index";

export interface ModIconButtonProps {
  /**
  * 底图节点（absolute inset-0，pointer-events-none）
  */
  background?: ReactNode;
  /**
  * 悬停底图；opacity-0 + group-hover:opacity-100
  */
  backgroundHover?: ReactNode;
  /**
  * 按钮纹理类（默认原版 `mc-tex-btn`）
  */
  buttonClassName?: string;
  className?: string;
  /**
  * 额外 DOM 钩子（如 `{ "data-eio-icon-button": icon }`），展开到根节点
  */
  dataAttributes?: ModDataAttributes;
  /**
  * 禁用态：不渲染点击态与指针
  */
  disabled?: boolean;
  /**
  * 按钮高（GUI px，默认 22）
  */
  height?: number;
  /**
  * 自定义图标节点（如 AE2 贴图裁剪件）；与 `iconClassName` 二选一
  */
  icon?: ReactNode;
  /**
  * 图标纹理类
  */
  iconClassName?: string;
  /**
  * 悬停图标；与 icon 同位置叠放
  */
  iconHover?: ReactNode;
  /**
  * 图标边长（GUI px，默认 16）
  */
  iconSize?: number;
  /**
  * 多态图标（IF 的 states 模式）；与 icon 二选一，icon 优先
  */
  icons?: readonly [ReactNode, ...ReactNode[]];
  /**
  * 可访问名称
  */
  label: string;
  left?: number;
  onClick?: () => void;
  /**
  * 两态按钮按下态（渲染 aria-pressed）
  */
  pressed?: boolean;
  /**
  * 配合 icons 的状态索引（默认 0，越界钳制）
  */
  state?: number;
  title?: string;
  top?: number;
  /**
  * 按钮宽（GUI px，默认 22）
  */
  width?: number;
}

/**
 * 通用 mod 图标按钮：几何由调用方给出，图标走纹理类或节点；悬停态走 CSS。
 */
export function ModIconButton({
  background,
  backgroundHover,
  buttonClassName = "mc-tex-btn",
  className,
  dataAttributes,
  disabled = false,
  height = 22,
  icon,
  iconClassName,
  iconHover,
  iconSize = 16,
  icons,
  label,
  left,
  onClick,
  pressed,
  state = 0,
  title = label,
  top,
  width = 22,
}: ModIconButtonProps) {
  const isPositioned = left !== undefined || top !== undefined;
  const iconIndex = icons && icons.length > 0
    ? Math.min(icons.length - 1, Math.max(0, state))
    : 0;
  const content = icon ?? icons?.[iconIndex];
  return (
    <button
      aria-label={label}
      aria-pressed={pressed}
      className={cn(
        "group flex items-center justify-center border-0 p-0",
        disabled ? "cursor-default" : "cursor-pointer",
        isPositioned ? "absolute" : "relative",
        buttonClassName,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      style={{
        height: gui(height),
        left: left === undefined ? undefined : gui(left),
        top: top === undefined ? undefined : gui(top),
        width: gui(width),
      }}
      title={title}
      type="button"
      {...dataAttributes}
    >
      {background
        ? <span className="pointer-events-none absolute inset-0">{background}</span>
        : null}
      {backgroundHover
        ? (
          <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
            {backgroundHover}
          </span>
        )
        : null}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {content ?? (
          <span
            aria-hidden="true"
            className={cn("block shrink-0", iconClassName)}
            style={{ height: gui(iconSize), width: gui(iconSize) }}
          />
        )}
      </span>
      {iconHover
        ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            {iconHover}
          </span>
        )
        : null}
    </button>
  );
}
