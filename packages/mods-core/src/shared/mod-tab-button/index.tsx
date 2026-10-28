import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

export interface ModTabButtonProps {
  className?: string;
  /**
  * 自定义图标节点（如 AE2 贴图裁剪件）；与 `iconClassName` 二选一
  */
  icon?: ReactNode;
  iconClassName?: string;
  label: string;
  left: number;
  onClick?: () => void;
  selected?: boolean;
  top: number;
}

/**
 * 通用 mod 顶部标签按钮：20×20，选中态由 `selected` 切换纹理。
 */
export function ModTabButton({
  className,
  icon,
  iconClassName,
  label,
  left,
  onClick,
  selected = false,
  top,
}: ModTabButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "mc-tex-ae2-tab absolute flex cursor-pointer items-center justify-center border-0 p-0",
        selected && "mc-tex-ae2-tab-selected",
        className,
      )}
      onClick={onClick}
      style={{ height: gui(20), left: gui(left), top: gui(top), width: gui(20) }}
      title={label}
      type="button"
    >
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {icon
          ?? (iconClassName
            ? (
                <span
                  aria-hidden="true"
                  className={cn("block shrink-0", iconClassName)}
                  style={{ height: gui(16), width: gui(16) }}
                />
              )
            : null)}
      </span>
    </button>
  );
}
