import type { MekanismSpriteName } from "@tennantite/textures";

import { ModProgress } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";
import type { MekanismGaugeKind, MekanismGaugeType } from "../mekanism-types";
import { MEKANISM_GAUGE_OVERLAYS, MEKANISM_GAUGE_SIZES } from "../mekanism-metrics";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismGaugeProps {
  className?: string;
  /**
   * 填充贴图；默认按 `kind` 选择
   */
  fillSprite?: MekanismSpriteName;
  /**
   * 目标高度（GUI px）；默认按 `type`
   */
  height?: number;
  /**
   * 传输类型
   */
  kind: MekanismGaugeKind;
  /**
   * 可访问名称
   */
  label?: string;
  /**
   * 仪表左上角 x（GUI px）
   */
  left: number;
  /**
   * 最大值（默认 1）
   */
  max?: number;
  /**
   * 填充染色
   */
  tint?: string;
  /**
   * 仪表左上角 y（GUI px）
   */
  top: number;
  /**
   * 仪表类型（决定外框尺寸与 overlay）
   */
  type: MekanismGaugeType;
  /**
   * 当前值（默认 0）
   */
  value?: number;
  /**
   * 目标宽度（GUI px）；默认按 `type`
   */
  width?: number;
}

const DEFAULT_FILLS: Record<MekanismGaugeKind, MekanismSpriteName> = {
  chemical: "mek_chemical/slurry/clean",
  energy: "mek_liquid/energy",
  fluid: "mek_liquid/liquid",
};

/**
 * Mekanism 纵向仪表：外框 + 下→上裁剪的填充 + 覆盖层。
 */
export function MekanismGauge({
  className,
  fillSprite,
  height,
  kind,
  label,
  left,
  max = 1,
  tint,
  top,
  type,
  value = 0,
  width,
}: MekanismGaugeProps) {
  const size = MEKANISM_GAUGE_SIZES[type];
  const targetWidth = width ?? size.width;
  const targetHeight = height ?? size.height;
  const resolvedTint = gaugeTint(kind, tint);

  return (
    <>
      <ModProgress
        ariaValue="percent"
        className={cn(className)}
        direction="up"
        fill={(
          <MekanismSprite
            height={targetHeight - 2}
            name={fillSprite ?? DEFAULT_FILLS[kind]}
            tint={resolvedTint}
            width={targetWidth - 2}
          />
        )}
        height={targetHeight}
        inset={1}
        label={label}
        left={left}
        max={max}
        top={top}
        track={<MekanismSprite height={targetHeight} name="gauge/normal" width={targetWidth} />}
        value={value}
        width={targetWidth}
      />
      <MekanismSprite
        className="absolute"
        height={targetHeight - 2}
        left={left + 1}
        name={`gauge/overlay/${MEKANISM_GAUGE_OVERLAYS[type]}` as MekanismSpriteName}
        top={top + 1}
        width={targetWidth - 2}
      />
    </>
  );
}

function gaugeTint(kind: MekanismGaugeKind, tint: string | undefined): string | undefined {
  if (tint) {
    return tint;
  }
  if (kind === "chemical") {
    return "#c9071f";
  }
  return kind === "fluid" ? "#3c7fe0" : undefined;
}
