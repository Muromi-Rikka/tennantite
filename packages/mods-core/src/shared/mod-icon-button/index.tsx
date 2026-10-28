import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

export interface ModIconButtonProps {
  /**
  * 按钮纹理类（默认原版 `mc-tex-btn`）
  */
  buttonClassName?: string;
  className?: string;
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
  * 图标边长（GUI px，默认 16）
  */
  iconSize?: number;
  /**
  * 可访问名称
  */
  label: string;
  left?: number;
  onClick?: () => void;
  title?: string;
  top?: number;
  /**
  * 按钮宽（GUI px，默认 22）
  */
  width?: number;
}

/**
 * 通用 mod 图标按钮：几何由调用方给出，图标走纹理类。
 */
export function ModIconButton({
  buttonClassName = "mc-tex-btn",
  className,
  height = 22,
  icon,
  iconClassName,
  iconSize = 16,
  label,
  left,
  onClick,
  title = label,
  top,
  width = 22,
}: ModIconButtonProps) {
  const isPositioned = left !== undefined || top !== undefined;
  return (
    <button
      aria-label={label}
      className={cn(
        "flex cursor-pointer items-center justify-center border-0 p-0",
        isPositioned ? "absolute" : "relative",
        buttonClassName,
        className,
      )}
      onClick={onClick}
      style={{
        height: gui(height),
        left: left === undefined ? undefined : gui(left),
        top: top === undefined ? undefined : gui(top),
        width: gui(width),
      }}
      title={title}
      type="button"
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {icon ?? (
          <span
            aria-hidden="true"
            className={cn("block shrink-0", iconClassName)}
            style={{ height: gui(iconSize), width: gui(iconSize) }}
          />
        )}
      </span>
    </button>
  );
}
