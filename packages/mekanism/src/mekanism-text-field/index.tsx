import type { KeyboardEvent } from "react";

import { cn, gui } from "@tennantite/ui";

export interface MekanismTextFieldProps {
  className?: string;
  defaultValue?: string;
  /**
   * 输入框高（GUI px，默认 12）
   */
  height?: number;
  label: string;
  left: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  top: number;
  width: number;
}

/**
 * 12 px 高数字/文本输入框（深色底 + 内屏绿字），保留原生键盘行为。
 */
export function MekanismTextField({
  className,
  defaultValue,
  height = 12,
  label,
  left,
  onChange,
  placeholder,
  top,
  width,
}: MekanismTextFieldProps) {
  return (
    <input
      aria-label={label}
      className={cn(
        "absolute mc-border border-mc-stone-darker bg-[#0a0a0a] px-1 font-mc mc-text text-mc-mekanism-screen outline-none placeholder:text-[#3a6b52]",
        className,
      )}
      defaultValue={defaultValue}
      onChange={onChange ? event => onChange(event.currentTarget.value) : undefined}
      onKeyDown={handleTextFieldKeyDown}
      placeholder={placeholder}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    />
  );
}

function handleTextFieldKeyDown(event: KeyboardEvent<HTMLInputElement>) {
  if (event.key === "Enter") {
    event.currentTarget.blur();
  }
}
