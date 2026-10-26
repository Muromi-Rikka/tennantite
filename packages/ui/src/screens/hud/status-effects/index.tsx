import type { PixelIconName } from "@verdigris/textures";
import { Icon } from "../../../containers/icon/index";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../../../primitives/tooltip/index";

export interface StatusEffect {
  /**
  * 增强等级文本（如 "II"）
  */
  amplifier?: string;
  /**
  * 剩余时间文本（tooltip 次行）
  */
  duration?: string;
  icon?: PixelIconName;
  /**
  * 效果名称（tooltip 主行）
  */
  name: string;
  src?: string;
}

export interface StatusEffectsProps {
  className?: string;
  effects: StatusEffect[];
  /**
  * 图标边长（px，默认 32）
  */
  size?: number;
}

/**
 * MC 状态效果栏（规格 §6.1）：Icon + Tooltip，overlay 语义。
*/
export function StatusEffects({
  className,
  effects,
  size = 32,
}: StatusEffectsProps) {
  if (effects.length === 0) {
    return null;
  }
  return (
    <div className={className} data-hud="">
      {effects.map((effect, index) => (
        <Tooltip key={`${effect.name}-${index}`}>
          <TooltipTrigger className="mc-tex-slot block cursor-default">
            <Icon
              name={effect.icon}
              size={size}
              src={effect.src}
            />
            <span className="sr-only">
              {`${effect.name}${effect.amplifier ? ` ${effect.amplifier}` : ""}`}
            </span>
          </TooltipTrigger>
          <TooltipPopup>
            <div>
              {effect.name}
              {effect.amplifier ? ` ${effect.amplifier}` : ""}
            </div>
            {effect.duration
              ? (
                  <div className="text-mc-text-dim">{effect.duration}</div>
                )
              : null}
          </TooltipPopup>
        </Tooltip>
      ))}
    </div>
  );
}
