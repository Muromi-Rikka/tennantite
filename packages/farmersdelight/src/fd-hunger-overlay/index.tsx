import { Fragment } from "react";

import { FD_HUD_ICON, FD_HUD_ICON_COUNT, FD_HUD_ICON_STEP } from "../fd-metrics";
import { FdSprite } from "../fd-sprite/index";

export interface FdHungerOverlayProps {
  className?: string;
  /**
   * 饥饿值（0..20，半单位）
   */
  foodLevel: number;
  /**
   * 自然恢复中：改用金边图标（源图 x 27 / 36）
   */
  naturalHealing?: boolean;
  /**
   * 行左上角 x（GUI px；上游右端 = 屏幕中线 + 91，行左 = 中线 + 10）
   */
  x?: number;
  /**
   * 行左上角 y（GUI px）
   */
  y?: number;
}

/**
 * Farmer's Delight 饱食（Nourishment）覆盖层：10 枚 9×9 图标叠在饥饿栏上，
 * 图标步进 8 px（互相重叠 1 px）。上游低饱食度的随机抖动不实现，保持确定性。
 */
export function FdHungerOverlay({
  className,
  foodLevel,
  naturalHealing = false,
  x = 0,
  y = 0,
}: FdHungerOverlayProps) {
  return (
    <div aria-hidden="true" className={className} data-fd-overlay="nourishment">
      {Array.from({ length: FD_HUD_ICON_COUNT }, (_, index) => {
        const column = FD_HUD_ICON_COUNT - 1 - index;
        const left = x + column * FD_HUD_ICON_STEP;
        const overlay = hungerOverlayIcon(foodLevel / 2 - index, naturalHealing);
        return (
          <Fragment key={column}>
            <FdSprite
              crop={FD_HUD_ICON.hungerEmpty}
              height={FD_HUD_ICON.hungerEmpty.height}
              left={left}
              name="fd_icons"
              top={y}
              width={FD_HUD_ICON.hungerEmpty.width}
            />
            {overlay
              ? (
                  <FdSprite
                    crop={overlay}
                    height={overlay.height}
                    left={left}
                    name="fd_icons"
                    top={y}
                    width={overlay.width}
                  />
                )
              : null}
          </Fragment>
        );
      })}
    </div>
  );
}

/**
 * 单格叠加图标：上游 `effectiveHungerOfBar >= 1` 用满格、`>= .5` 用半格，
 * 自然恢复时整体右移 18 px（金边图标）。
 */
function hungerOverlayIcon(effective: number, isNaturalHealing: boolean) {
  if (effective >= 1) {
    return isNaturalHealing ? FD_HUD_ICON.hungerFullRegen : FD_HUD_ICON.hungerFull;
  }
  if (effective >= 0.5) {
    return isNaturalHealing ? FD_HUD_ICON.hungerHalfRegen : FD_HUD_ICON.hungerHalf;
  }
  return null;
}
