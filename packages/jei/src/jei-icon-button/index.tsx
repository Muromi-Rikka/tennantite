import type { JeiSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";

import { cn, gui } from "@tennantite/ui";
import { JeiSprite } from "../jei-sprite/index";

export interface JeiIconButtonProps {
  className?: string;
  disabled?: boolean;
  /**
   * 按钮高（GUI px，默认 20 —— jei `button_*_v2` 原始尺寸）
   */
  height?: number;
  /**
   * 图标精灵（jei `icons/*`）
   */
  icon: JeiSpriteName;
  /**
   * 图标高（GUI px，默认精灵原始高）
   */
  iconHeight?: number;
  /**
   * 图标宽（GUI px，默认精灵原始宽）
   */
  iconWidth?: number;
  /**
   * 可访问名称
   */
  label: string;
  left?: number;
  onClick?: () => void;
  /**
   * 按下态（使用 `button_pressed_v2`）
   */
  pressed?: boolean;
  style?: CSSProperties;
  top?: number;
  width?: number;
}

/**
 * JEI 图标按钮：`button_*_v2` 九宫格拉伸做底，`icons/*` 精灵居中。
 * 13×13 导航按钮与 16×16 选项按钮共用（`RecipesGui` / `RecipeOptionButtons`）。
 */
export function JeiIconButton({
  className,
  disabled = false,
  height = 20,
  icon,
  iconHeight,
  iconWidth,
  label,
  left,
  onClick,
  pressed = false,
  style,
  top,
  width = 20,
}: JeiIconButtonProps) {
  const background = disabled
    ? "button_disabled_v2"
    : (pressed
        ? "button_pressed_v2"
        : "button_enabled_v2");
  const isPositioned = left !== undefined || top !== undefined;
  return (
    <button
      aria-label={label}
      aria-pressed={pressed || undefined}
      className={cn(
        "flex cursor-pointer items-center justify-center border-0 bg-transparent p-0",
        isPositioned ? "absolute" : "relative",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      style={{
        height: gui(height),
        left: left === undefined ? undefined : gui(left),
        top: top === undefined ? undefined : gui(top),
        width: gui(width),
        ...style,
      }}
      title={label}
      type="button"
    >
      <JeiSprite
        className="absolute inset-0"
        height={height}
        name={background}
        width={width}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <JeiSprite height={iconHeight} name={icon} width={iconWidth} />
      </span>
    </button>
  );
}
