import type { ComponentProps } from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "../../lib/utils";

export interface DividerProps extends ComponentProps<typeof BaseSeparator> {
  /**
  * default 浮雕双线 / strong 单实线
  */
  variant?: "default" | "strong";
}

/**
 * MC 分隔线（规格 §5 #5）：Base UI Separator + 像素浮雕样式。
*/
export function Divider({
  className,
  variant = "default",
  ...properties
}: DividerProps) {
  return (
    <BaseSeparator
      className={cn(
        "bg-mc-stone-dark data-[orientation=horizontal]:h-[length:var(--mc-gui)] data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[length:var(--mc-gui)]",
        variant === "default"
        && "shadow-[var(--mc-gui)_var(--mc-gui)_0_0_#000]",
        className,
      )}
      {...properties}
    />
  );
}
