import type { ComponentProps } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "../../lib/utils";

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>;

/**
 * MC 复选框（规格 §4 #4）：原版 20×20 `checkbox` / `checkbox_selected` 精灵。
 * 选中态由 CSS 读取 `data-checked` 切换，无内联 SVG。
 */
export function Checkbox({ className, ...properties }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "mc-tex-checkbox size-20 shrink-0 cursor-pointer outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    />
  );
}
