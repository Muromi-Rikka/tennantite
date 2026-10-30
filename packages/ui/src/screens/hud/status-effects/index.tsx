/* eslint-disable react/no-array-index-key -- 状态效果是固定顺序的纵向列表 */
import type { PixelIconName } from "@tennantite/textures";

import { GuiSprite } from "../../../containers/gui-sprite/index";
import { Icon } from "../../../containers/icon/index";
import { Tooltip, TooltipPopup, TooltipTrigger } from "../../../primitives/tooltip/index";

export interface StatusEffect {
  /**
  * 环境效果（不同背景）
  */
  ambient?: boolean;
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
}

/**
 * MC 状态效果栏（规格 §6.1）：原版 24×24 背景 + 18×18 图标，纵向堆叠。
 */
export function StatusEffects({ className, effects }: StatusEffectsProps) {
  if (effects.length === 0) {
    return null;
  }
  return (
    <div className={className} data-hud="">
      {effects.map((effect, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 数据模型无稳定 id，列表顺序即身份
        <Tooltip key={`${effect.name}-${index}`}>
          <TooltipTrigger className="block cursor-default">
            <div className="relative size-24">
              <GuiSprite
                className="absolute inset-0"
                height={24}
                name={effect.ambient
                  ? "sprites/hud/effect_background_ambient.png"
                  : "sprites/hud/effect_background.png"}
                width={24}
              />
              <Icon
                className="absolute top-3 left-3"
                name={effect.icon}
                size={18}
                src={effect.src}
              />
            </div>
            <span className="sr-only">
              {`${effect.name}${effect.amplifier ? ` ${effect.amplifier}` : ""}`}
            </span>
          </TooltipTrigger>
          <TooltipPopup>
            <div className="text-mc-text-main">
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
