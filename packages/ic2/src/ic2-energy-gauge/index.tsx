import { ModSprite, progressClipPath } from "@tennantite/mods-core";
import type { ModSpriteRect } from "@tennantite/mods-core";

import { ic2SpriteMeta } from "@tennantite/textures";

import { cn, gui, Tooltip, TooltipPopup, TooltipTrigger } from "@tennantite/ui";

import type { Ic2EnergyVariant } from "../ic2-types";

export interface Ic2EnergyGaugeProps {
  className?: string;
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  /**
  * 填充原点 x（GUI px，即 IC2 gauge 坐标）
  */
  left: number;
  /**
  * 最大存储 EU
  */
  max: number;
  /**
  * 悬浮显示 "X / Y EU" 物品提示（交互经水合增强）
  */
  tooltip?: boolean;
  /**
  * 填充原点 y（GUI px）
  */
  top: number;
  /**
  * 当前存储 EU
  */
  value: number;
  /**
  * 形态：机器闪电（默认）或储电箱横条
  */
  variant?: Ic2EnergyVariant;
}

interface GaugeGeometry {
  background: ModSpriteRect;
  direction: "right" | "up";
  fill: ModSpriteRect;
  offset: { x: number; y: number };
}

/**
 * 源矩形与背景偏移来自 IC2 `Gauge`：
 * - 闪电：填充 (116,65) 7×13，底 (96,64) 16×16，背景偏移 (-4,-1)
 * - 横条：填充 (132,43) 24×9，底 (128,0) 32×32，背景偏移 (-4,-11)
 */
const GAUGES: Record<Ic2EnergyVariant, GaugeGeometry> = {
  bar: {
    background: { height: 32, width: 32, x: 128, y: 0 },
    direction: "right",
    fill: { height: 9, width: 24, x: 132, y: 43 },
    offset: { x: -4, y: -11 },
  },
  bolt: {
    background: { height: 16, width: 16, x: 96, y: 64 },
    direction: "up",
    fill: { height: 13, width: 7, x: 116, y: 65 },
    offset: { x: -4, y: -1 },
  },
};

/**
 * IC2 EU 能量表（1.12.2 原版贴图）：机器红色闪电自下而上填充，
 * 储电箱红色横条自左向右填充；数据注入、无游戏逻辑。
 */
export function Ic2EnergyGauge({
  className,
  label,
  left,
  max,
  tooltip = false,
  top,
  value,
  variant = "bolt",
}: Ic2EnergyGaugeProps) {
  const gauge = GAUGES[variant];
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;

  const gaugeNode = (
    <div
      aria-label={label}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn("absolute", className)}
      data-ic2-gauge={variant}
      role={label ? "progressbar" : undefined}
      style={{
        height: gui(gauge.fill.height),
        left: gui(left),
        top: gui(top),
        width: gui(gauge.fill.width),
      }}
    >
      <ModSprite
        left={gauge.offset.x}
        sprite={ic2SpriteMeta.common}
        src={gauge.background}
        top={gauge.offset.y}
      />
      {ratio > 0
        ? (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              data-ic2-gauge-fill=""
              style={{ clipPath: progressClipPath(gauge.direction, ratio) }}
            >
              <ModSprite sprite={ic2SpriteMeta.common} src={gauge.fill} />
            </div>
          )
        : null}
    </div>
  );

  if (!tooltip) {
    return gaugeNode;
  }

  const text = `${value} / ${max} EU`;
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        {gaugeNode}
        <span className="sr-only">{label ?? text}</span>
      </TooltipTrigger>
      <TooltipPopup>{text}</TooltipPopup>
    </Tooltip>
  );
}
