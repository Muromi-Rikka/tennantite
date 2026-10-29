import { cn, gui } from "@tennantite/ui";

export interface IfTextFieldProps {
  className?: string;
  height?: number;
  label: string;
  left: number;
  onChange?: (value: string) => void;
  top: number;
  value?: string;
  width?: number;
}

/**
 * 上游为原版 `EditBox`（无 GUI 图集）：深色内嵌框 + 1px #A0A0A0 边框。
 */
export function IfTextField({
  className,
  height = 12,
  label,
  left,
  onChange,
  top,
  value = "",
  width = 40,
}: IfTextFieldProps) {
  return (
    <input
      aria-label={label}
      className={cn(
        "absolute m-0 border border-solid bg-black p-0 font-mc outline-none",
        className,
      )}
      data-if-text-field={label}
      inputMode="numeric"
      onChange={(event) => { onChange?.(event.target.value); }}
      style={{
        borderColor: "#A0A0A0",
        boxSizing: "border-box",
        color: "#E0E0E0",
        fontSize: gui(8),
        height: gui(height),
        left: gui(left),
        lineHeight: 1,
        padding: `0 ${gui(2)}`,
        top: gui(top),
        width: gui(width),
      }}
      type="text"
      value={value}
    />
  );
}
