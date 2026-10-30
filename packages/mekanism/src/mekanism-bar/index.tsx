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

interface MekanismBarFillProps {
  cssVar: string;
  fillName: MekanismSpriteName;
  horizontal: boolean;
  innerHeight: number;
  innerWidth: number;
  tint?: { from: string; to: string };
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
  const { innerHeight, innerWidth } = mekanismBarSize(kind, horizontal, height, width);
  const outerWidth = innerWidth + 2;
  const outerHeight = innerHeight + 2;
  const fillName = mekanismBarFillName(kind, horizontal);
  const fillMeta = mekanismSpriteMeta[fillName];

  return (
    <ModProgress
      ariaValue="percent"
      className={cn(className)}
      direction={horizontal ? "right" : "up"}
      fill={(
        <MekanismBarFill
          cssVar={fillMeta.cssVar}
          fillName={fillName}
          horizontal={horizontal}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          tint={tint}
        />
      )}
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

/**
 * 条形填充：有 `tint` 时以渐变按贴图遮罩绘制，否则直接用原贴图。
 */
function MekanismBarFill({ cssVar, fillName, horizontal, innerHeight, innerWidth, tint }: MekanismBarFillProps) {
  return tint
    ? (
        <div
          style={{
            backgroundImage: `linear-gradient(${horizontal ? "to right" : "to top"}, ${tint.from}, ${tint.to})`,
            height: "100%",
            maskImage: `var(${cssVar})`,
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
            width: "100%",
          }}
        />
      )
    : <MekanismSprite height={innerHeight} name={fillName} width={innerWidth} />;
}

/**
 * 按种类与方向取填充贴图名。
 */
function mekanismBarFillName(kind: MekanismBarProps["kind"], isHorizontal: boolean): MekanismSpriteName {
  if (kind === "dynamic") {
    return "bar/dynamic_rate";
  }
  if (isHorizontal) {
    return kind === "power" ? "bar/horizontal_power" : "bar/horizontal_rate";
  }
  return kind === "power" ? "bar/vertical_power" : "bar/vertical_rate";
}

/**
 * 按种类与方向取条形内框尺寸（GUI px）。
 */
function mekanismBarSize(kind: MekanismBarProps["kind"], isHorizontal: boolean, height?: number, width?: number) {
  return {
    innerHeight: height ?? (kind === "rate" ? (isHorizontal ? 8 : 58) : (isHorizontal ? 4 : 52)),
    innerWidth: width ?? (kind === "rate" ? (isHorizontal ? 78 : 6) : 4),
  };
}
