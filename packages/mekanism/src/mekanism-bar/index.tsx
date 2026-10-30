import type { MekanismSpriteName } from "@tennantite/textures";
import { ModProgress } from "@tennantite/mods-core";
import { mekanismSpriteMeta } from "@tennantite/textures";
import { cn } from "@tennantite/ui";

import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismBarProps {
  className?: string;
  /**
   * 内部高度（GUI px）
   */
  height?: number;
  /**
   * 横向（否则纵向）
   */
  horizontal?: boolean;
  /**
   * 条形种类
   */
  kind: "dynamic" | "power" | "rate";
  /**
   * 可访问名称
   */
  label?: string;
  /**
   * 条形左上角 x（GUI px）
   */
  left: number;
  /**
   * 渐变染色
   */
  tint?: { from: string; to: string };
  /**
   * 条形左上角 y（GUI px）
   */
  top: number;
  /**
   * 当前值 0..1
   */
  value?: number;
  /**
   * 内部宽度（GUI px；dynamic 必传）
   */
  width?: number;
}

/**
 * Mekanism 功率 / 速率 / 动态条：九宫格外框 + 方向裁剪的填充。
 */
export function MekanismBar({
  className,
  height,
  horizontal = false,
  kind,
  label,
  left,
  tint,
  top,
  value = 0,
  width,
}: MekanismBarProps) {
  const innerWidth = width ?? (kind === "rate" ? (horizontal ? 78 : 6) : 4);
  const innerHeight = height ?? (kind === "rate" ? (horizontal ? 8 : 58) : (horizontal ? 4 : 52));
  const outerWidth = innerWidth + 2;
  const outerHeight = innerHeight + 2;
  let fillName: MekanismSpriteName;
  if (kind === "dynamic") {
    fillName = "bar/dynamic_rate";
  }
  else if (horizontal) {
    fillName = kind === "power" ? "bar/horizontal_power" : "bar/horizontal_rate";
  }
  else {
    fillName = kind === "power" ? "bar/vertical_power" : "bar/vertical_rate";
  }
  const fillMeta = mekanismSpriteMeta[fillName];
  const direction = horizontal ? "right" : "up";

  return (
    <ModProgress
      ariaValue="percent"
      className={cn(className)}
      direction={direction}
      fill={tint
        ? (
            <div
              style={{
                backgroundImage: `linear-gradient(${horizontal ? "to right" : "to top"}, ${tint.from}, ${tint.to})`,
                height: "100%",
                maskImage: `var(${fillMeta.cssVar})`,
                maskRepeat: "no-repeat",
                maskSize: "100% 100%",
                width: "100%",
              }}
            />
          )
        : <MekanismSprite height={innerHeight} name={fillName} width={innerWidth} />}
      height={outerHeight}
      inset={1}
      label={label}
      left={left}
      progress={value}
      top={top}
      track={<MekanismSprite height={outerHeight} name="bar/base" width={outerWidth} />}
      width={outerWidth}
    />
  );
}
