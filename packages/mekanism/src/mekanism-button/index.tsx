import type { ReactNode } from "react";

import { cn, gui } from "@tennantite/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismButtonProps {
  active?: boolean;
  className?: string;
  disabled?: boolean;
  /**
   * 按钮高（GUI px，默认 20）
   */
  height?: number;
  label: ReactNode;
  left: number;
  onClick?: () => void;
  top: number;
  variant?: "default" | "digital";
  /**
   * 按钮宽（GUI px）
   */
  width: number;
}

/**
 * Mekanism 按钮：button / button_digital 背景 + 居中文本。
 */
export function MekanismButton({
  active = true,
  className,
  disabled = false,
  height = 20,
  label,
  left,
  onClick,
  top,
  variant = "default",
  width,
}: MekanismButtonProps) {
  const name = variant === "digital"
    ? (active ? "button_digital" : "button_digital_inactive")
    : (active ? "button" : "button_inactive");
  return (
    <button
      className={cn("absolute cursor-pointer border-0 p-0", disabled && "cursor-not-allowed", className)}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
      type="button"
    >
      <MekanismSprite height={height} name={name} width={width} />
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-mc mc-text mc-text-shadow",
          active ? "text-mc-mekanism-button" : "text-mc-mekanism-button-inactive",
        )}
      >
        {label}
      </span>
    </button>
  );
}
