import type { MekanismSpriteName } from "@tennantite/textures";

import { cn, gui } from "@tennantite/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismImageButtonProps {
  /**
   * 是否绘制原生 button 底板（默认 true；倾倒按钮为 false）
   */
  background?: boolean;
  className?: string;
  /**
   * 图标目标高（GUI px，默认精灵高）
   */
  height?: number;
  label: string;
  left: number;
  name: MekanismSpriteName;
  onClick?: () => void;
  tint?: string;
  top: number;
  /**
   * 图标目标宽（GUI px，默认精灵宽）
   */
  width?: number;
}

/**
 * 纯图标按钮（无背景），用于关闭 / 固定 / 清空侧面等。
 */
export function MekanismImageButton({
  background = true,
  className,
  height,
  label,
  left,
  name,
  onClick,
  tint,
  top,
  width,
}: MekanismImageButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn("absolute cursor-pointer border-0 bg-transparent p-0", className)}
      onClick={onClick}
      style={{ height: gui(height ?? 14), left: gui(left), top: gui(top), width: gui(width ?? 14) }}
      title={label}
      type="button"
    >
      {background ? <MekanismSprite height={height ?? 14} name="button" width={width ?? 14} /> : null}
      <span className="absolute inset-0 flex items-center justify-center">
        <MekanismSprite
          height={height}
          name={name}
          tint={tint}
          width={width}
        />
      </span>
    </button>
  );
}
