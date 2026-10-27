import type { ComponentProps } from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "../../lib/utils";

export type InputProps = ComponentProps<typeof BaseInput>;

/**
 * MC 文本输入框（规格 §4 #2）：黑底 + 1 GUI px #A0A0A0 边框，聚焦变白。
 * 用于告示牌 / 铁砧 / 聊天输入。
 */
export function Input({ className, ...properties }: InputProps) {
  return (
    <BaseInput
      className={cn(
        "mc-tex-text-field h-20 w-full cursor-text px-4",
        "font-mc mc-text text-mc-text-main caret-white outline-none",
        "placeholder:text-mc-text-dim",
        "disabled:cursor-not-allowed disabled:text-mc-text-dim",
        className,
      )}
      {...properties}
    />
  );
}
