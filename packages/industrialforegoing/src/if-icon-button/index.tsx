import { cn, gui } from "@tennantite/ui";
import { useState } from "react";
import type { IfCropKey } from "../if-metrics";

import { IF_CROPS } from "../if-metrics";
import { IfSprite } from "../if-sprite/index";

export interface IfIconButtonProps {
  className?: string;
  disabled?: boolean;
  height: number;
  label: string;
  left: number;
  onClick?: () => void;
  state?: number;
  states: readonly [IfCropKey, ...IfCropKey[]];
  tooltip?: string;
  top: number;
  width: number;
}

/**
 * Industrial Foregoing 图集按钮：状态图 + 悬停 1px 白色内描边。
 */
export function IfIconButton({
  className,
  disabled,
  height,
  label,
  left,
  onClick,
  state = 0,
  states,
  tooltip = label,
  top,
  width,
}: IfIconButtonProps) {
  const [highlighted, setHighlighted] = useState(false);
  const crop = states[Math.min(Math.max(state, 0), states.length - 1)] as IfCropKey;

  return (
    <button
      aria-label={label}
      className={cn(
        "absolute border-0 bg-transparent p-0",
        disabled ? "cursor-default opacity-60" : (onClick ? "cursor-pointer" : undefined),
        className,
      )}
      data-if-button={label}
      data-if-crop={crop}
      disabled={disabled}
      onBlur={() => { setHighlighted(false); }}
      onClick={onClick}
      onFocus={() => { setHighlighted(true); }}
      onMouseEnter={() => { setHighlighted(true); }}
      onMouseLeave={() => { setHighlighted(false); }}
      style={{
        boxShadow: highlighted ? "inset 0 0 0 1px #fff" : undefined,
        height: gui(height),
        left: gui(left),
        padding: 0,
        top: gui(top),
        width: gui(width),
      }}
      title={tooltip}
      type="button"
    >
      <IfSprite
        crop={crop}
        height={height}
        left={0}
        name={IF_CROPS[crop].sprite}
        top={0}
        width={width}
      />
    </button>
  );
}
