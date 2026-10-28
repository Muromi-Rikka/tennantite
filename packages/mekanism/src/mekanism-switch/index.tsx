import type { MekanismSpriteName } from "@verdigris/textures";

import { cn, gui } from "@verdigris/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismSwitchProps {
  className?: string;
  /**
   * 开关图标
   */
  icon: "eject" | "input" | "inverse" | "silk";
  isChecked?: boolean;
  label: string;
  left: number;
  onChange?: (isChecked: boolean) => void;
  top: number;
}

/**
 * 15×8 开关 + 5×5 图标。
 */
export function MekanismSwitch({
  className,
  icon,
  isChecked = false,
  label,
  left,
  onChange,
  top,
}: MekanismSwitchProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={isChecked}
      className={cn("absolute cursor-pointer border-0 bg-transparent p-0", className)}
      onClick={onChange ? () => onChange(!isChecked) : undefined}
      style={{ height: gui(8), left: gui(left), top: gui(top), width: gui(15) }}
      title={label}
      type="button"
    >
      <MekanismSprite height={8} name={isChecked ? "switch/selected" : "switch/unselected"} width={15} />
      <MekanismSprite
        className="absolute"
        height={5}
        left={5}
        name={`switch/${icon}` as MekanismSpriteName}
        top={1.5}
        width={5}
      />
    </button>
  );
}
