import type { ModSpriteRect } from "@tennantite/mods-core";
import { ModProgress, ModSprite } from "@tennantite/mods-core";
import { ic2SpriteMeta } from "@tennantite/textures";

import { IC2_BLAST_FURNACE } from "../ic2-layout";

/**
 * 热量表源矩形（`common.png`）：
 * // coords from common.png pixel inspection (upstream Gauge heatcentrifuge rect unavailable)
 * - 填充：右侧黄色渐变竖条 (252,33) 3×28
 * - 底：左侧灰白竖条 (247,33) 3×28
 */
export const HEAT_FILL: ModSpriteRect = IC2_BLAST_FURNACE.heat.fill;
export const HEAT_BACKGROUND: ModSpriteRect = IC2_BLAST_FURNACE.heat.background;

export interface Ic2HeatGaugeProps {
  className?: string;
  /**
  * 无障碍标签
  */
  label: string;
  /**
  * 填充原点 x（GUI px）
  */
  left: number;
  /**
  * 热量上限（IC2 高炉固定 100）
  */
  max: number;
  /**
  * 填充原点 y（GUI px）
  */
  top: number;
  /**
  * 当前热量
  */
  value: number;
}

/**
 * IC2 热量竖条（原版贴图）：灰白底 + 黄色填充自下而上裁剪，数值按原样暴露。
 */
export function Ic2HeatGauge({
  className,
  label,
  left,
  max,
  top,
  value,
}: Ic2HeatGaugeProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <ModProgress
      ariaValue="raw"
      className={className}
      dataAttributes={{ "data-ic2-heat-gauge": "" }}
      direction="up"
      fill={ratio > 0
        ? (
            <ModSprite
              dataAttributes={{ "data-ic2-heat-gauge-fill": "" }}
              sprite={ic2SpriteMeta.common}
              src={HEAT_FILL}
            />
          )
        : undefined}
      height={HEAT_FILL.height}
      label={label}
      left={left}
      max={max}
      top={top}
      track={<ModSprite sprite={ic2SpriteMeta.common} src={HEAT_BACKGROUND} />}
      value={value}
      width={HEAT_FILL.width}
    />
  );
}
