import type { CSSProperties } from "react";

import { cn, gui } from "@tennantite/ui";
import { JeiSprite } from "../jei-sprite/index";

export interface JeiSearchFieldProps {
  className?: string;
  defaultValue?: string;
  /**
   * 可访问名称（默认“搜索”）
   */
  label?: string;
  left: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  top: number;
  /**
   * 宽（GUI px，默认 80 —— `search_background_v2` 九宫格拉伸）
   */
  width?: number;
}

/**
 * JEI 搜索框：`search_background_v2` 九宫格做底、透明输入覆盖，
 * 高 12 GUI px（GuiTextFieldFilter）。
 */
export function JeiSearchField({
  className,
  defaultValue,
  label = "搜索",
  left,
  onChange,
  placeholder,
  top,
  width = 80,
}: JeiSearchFieldProps) {
  const style: CSSProperties = {
    height: gui(12),
    left: gui(left),
    top: gui(top),
    width: gui(width),
  };
  return (
    <div
      className={cn("absolute", className)}
      style={style}
    >
      <JeiSprite
        className="absolute inset-0"
        height={12}
        name="search_background_v2"
        width={width}
      />
      <input
        aria-label={label}
        className="absolute inset-0 w-full cursor-text border-0 bg-transparent px-1.5 font-mc mc-text text-mc-jei-field-text outline-none"
        defaultValue={defaultValue}
        onChange={event => onChange?.(event.currentTarget.value)}
        placeholder={placeholder}
        style={{ paddingLeft: gui(4), paddingRight: gui(4) }}
        type="text"
      />
    </div>
  );
}
