import { cn, gui } from "@tennantite/ui";

export interface ModSearchFieldProps {
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
  * 输入框宽（GUI px，默认 89）
  */
  width?: number;
}

/**
 * 通用 mod 搜索框：非受控输入，高 12 GUI px，左右内边距 3 GUI px。
 */
export function ModSearchField({
  className,
  defaultValue,
  label = "搜索",
  left,
  onChange,
  placeholder,
  top,
  width = 89,
}: ModSearchFieldProps) {
  return (
    <input
      aria-label={label}
      className={cn("mc-tex-ae2-text-field absolute", className)}
      defaultValue={defaultValue}
      onChange={event => onChange?.(event.currentTarget.value)}
      placeholder={placeholder}
      style={{
        height: gui(12),
        left: gui(left),
        paddingLeft: gui(3),
        paddingRight: gui(3),
        top: gui(top),
        width: gui(width),
      }}
      type="text"
    />
  );
}
