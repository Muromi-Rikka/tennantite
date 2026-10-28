import type { MekanismSpriteName } from "@tennantite/textures";
import { mekanismSpriteMeta } from "@tennantite/textures";

import { progressClipPath } from "@tennantite/mods-core";
import { cn, gui } from "@tennantite/ui";
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
  const ratio = Math.min(1, Math.max(0, value));
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
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * 100)}
      className={cn("absolute", className)}
      role="progressbar"
      style={{
        height: gui(outerHeight),
        left: gui(left),
        top: gui(top),
        width: gui(outerWidth),
      }}
      title={label}
    >
      <MekanismSprite height={outerHeight} name="bar/base" width={outerWidth} />
      <div
        className="absolute overflow-hidden"
        style={{
          height: gui(innerHeight),
          left: gui(1),
          top: gui(1),
          width: gui(innerWidth),
        }}
      >
        <div
          style={{
            clipPath: progressClipPath(direction, ratio),
            height: "100%",
            width: "100%",
          }}
        >
          {tint
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
            : (
                <MekanismSprite height={innerHeight} name={fillName} width={innerWidth} />
              )}
        </div>
      </div>
    </div>
  );
}
