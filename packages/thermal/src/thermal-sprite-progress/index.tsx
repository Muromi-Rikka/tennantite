import { ModProgress } from "@tennantite/mods-core";

import type { ThermalSpriteName } from "@tennantite/textures";

import type { ThermalSpriteCrop } from "../thermal-sprite/index";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalSpriteProgressProps {
  direction: "right" | "up";
  fillCrop: ThermalSpriteCrop;
  height: number;
  label: string;
  left: number;
  progress: number;
  sprite: ThermalSpriteName;
  top: number;
  trackCrop: ThermalSpriteCrop;
  width: number;
}

/**
 * Thermal 贴图进度：图集背景 + `ModProgress` 裁剪的图集填充。
 */
export function ThermalSpriteProgress({
  direction,
  fillCrop,
  height,
  label,
  left,
  progress,
  sprite,
  top,
  trackCrop,
  width,
}: ThermalSpriteProgressProps) {
  return (
    <>
      <ThermalSprite
        crop={trackCrop}
        height={height}
        left={left}
        name={sprite}
        top={top}
        width={width}
      />
      <ModProgress
        direction={direction}
        fill={<ThermalSprite crop={fillCrop} height={height} name={sprite} width={width} />}
        height={height}
        label={label}
        left={left}
        progress={progress}
        top={top}
        width={width}
      />
    </>
  );
}
