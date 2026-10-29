import { cn, gui, GuiSprite } from "@tennantite/ui";

import { FD_RECIPE_BOOK_BUTTON } from "../fd-metrics";

export interface FdRecipeBookButtonProps {
  className?: string;
  /**
   * 可访问名称（默认「配方书」）
   */
  label?: string;
  /**
   * 绝对定位左（GUI px，默认 5）
   */
  left?: number;
  /**
   * 点击回调（宿主切换配方书面板）
   */
  onToggle?: () => void;
  /**
   * 配方书是否展开（渲染 aria-pressed）
   */
  open?: boolean;
  /**
   * 绝对定位上（GUI px，默认 34）
   */
  top?: number;
}

/**
 * 厨锅配方书开关：上游在 `leftPos + 5, height / 2 - 49` 处绘制原版
 * `minecraft:recipe_book/button`（20×18）；面板垂直居中时即面板内 (5, 34)。
 * 上游 normal / hover 使用同一张精灵，故不实现高亮切换。
 */
export function FdRecipeBookButton({
  className,
  label = "配方书",
  left,
  onToggle,
  open = false,
  top,
}: FdRecipeBookButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={open}
      className={cn(
        "absolute cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-1 focus-visible:outline-white",
        className,
      )}
      onClick={onToggle}
      style={{
        height: gui(FD_RECIPE_BOOK_BUTTON.height),
        left: gui(left ?? FD_RECIPE_BOOK_BUTTON.left),
        top: gui(top ?? FD_RECIPE_BOOK_BUTTON.top),
        width: gui(FD_RECIPE_BOOK_BUTTON.width),
      }}
      title={label}
      type="button"
    >
      <GuiSprite
        height={FD_RECIPE_BOOK_BUTTON.height}
        name="sprites/recipe_book/button.png"
        width={FD_RECIPE_BOOK_BUTTON.width}
      />
    </button>
  );
}
