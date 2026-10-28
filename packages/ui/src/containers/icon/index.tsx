import type { PixelIconName } from "@tennantite/textures";
import type { ComponentProps } from "react";
import { pixelIcons } from "@tennantite/textures";
import { cn, gui } from "../../lib/utils";

export interface IconProps extends Omit<ComponentProps<"img">, "alt" | "src"> {
  /**
  * 内置图标名（textures 包原版 PNG data URI）
  */
  name?: PixelIconName;
  /**
  * 像素渲染（默认开启，规格 §0.4）
  */
  pixelated?: boolean;
  /**
  * 边长（GUI px，默认 16 —— 原版物品图标）
  */
  size?: number;
  /**
  * 自定义图片 URL（与 name 二选一）
  */
  src?: string;
}

/**
 * MC 像素图标容器（规格 §5 #4）：16×16 基底按 size 放大，pixelated 无模糊缩放。
 * 纯展示组件，RSC 兼容。
 */
export function Icon({
  className,
  name,
  pixelated = true,
  size = 16,
  src,
  style,
  ...properties
}: IconProps) {
  const href = name ? pixelIcons[name] : src;
  if (!href) {
    return null;
  }
  return (
    // alt 语义由调用方通过 aria-label / title 提供，图标默认装饰性；
    // 像素图标为原版 PNG data URI，需原位 img 渲染，不适用 next/image
    // eslint-disable-next-line next/no-img-element -- 同上
    <img
      alt=""
      aria-hidden="true"
      className={cn("shrink-0", pixelated && "pixelated", className)}
      data-icon={name}
      src={href}
      style={{ height: gui(size), width: gui(size), ...style }}
      {...properties}
    />
  );
}
