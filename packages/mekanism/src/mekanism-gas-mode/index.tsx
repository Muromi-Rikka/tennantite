import type { MekanismSpriteName } from "@tennantite/textures";

import { cn, gui } from "@tennantite/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismGasModeProps {
  className?: string;
  label: string;
  left: number;
  mode?: "dump" | "dump_excess" | "idle";
  onChange?: (mode: "dump" | "dump_excess" | "idle") => void;
  top: number;
}

/**
 * 气体模式按钮（10×10），点击循环 idle → dump → dump_excess。
 */
export function MekanismGasMode({
  className,
  label,
  left,
  mode = "idle",
  onChange,
  top,
}: MekanismGasModeProps) {
  return (
    <button
      aria-label={label}
      className={cn("absolute cursor-pointer border-0 bg-transparent p-0", className)}
      onClick={onChange
        ? () => {
            onChange(mode === "idle" ? "dump" : (mode === "dump" ? "dump_excess" : "idle"));
          }
        : undefined}
      style={{ height: gui(10), left: gui(left), top: gui(top), width: gui(10) }}
      title={label}
      type="button"
    >
      <MekanismSprite height={10} name="button" width={10} />
      <MekanismSprite height={10} name={`chemical_mode/${mode}` as MekanismSpriteName} width={10} />
    </button>
  );
}
