import type { ComponentProps } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "../../lib/utils";

export type InputProps = ComponentProps<typeof BaseInput>;

/**
 * MC 文本输入框（规格 §4 #2）：黑底 + 灰描边，聚焦变白。
 * 用于告示牌 / 铁砧 / 聊天输入。
 */
export function Input({ className, ...properties }: InputProps) {
  return (
    <BaseInput
      className={cn(
        "h-32 w-full cursor-text border-2 border-mc-text-dim bg-mc-tooltip-bg",
        "px-8 font-readable text-mc text-mc-text-main caret-white outline-none",
        "placeholder:text-mc-text-dim",
        "focus:border-mc-highlight focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:border-mc-stone-dark disabled:text-mc-text-dim",
        className,
      )}
      {...properties}
    />
  );
}
