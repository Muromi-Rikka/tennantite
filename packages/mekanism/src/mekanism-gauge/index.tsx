import type { MekanismSpriteName } from "@tennantite/textures";

import { progressClipPath } from "@tennantite/mods-core";
import { cn, gui } from "@tennantite/ui";
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
  const ratio = Math.min(1, Math.max(0, max === 0 ? 0 : value / max));
  const resolvedTint = gaugeTint(kind, tint);

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * 100)}
      className={cn("absolute", className)}
      role="progressbar"
      style={{
        height: gui(targetHeight),
        left: gui(left),
        top: gui(top),
        width: gui(targetWidth),
      }}
      title={label}
    >
      <MekanismSprite height={targetHeight} name="gauge/normal" width={targetWidth} />
      <div
        className="absolute overflow-hidden"
        style={{ height: gui(targetHeight - 2), left: gui(1), top: gui(1), width: gui(targetWidth - 2) }}
      >
        <div
          style={{
            clipPath: progressClipPath("up", ratio),
            height: "100%",
            width: "100%",
          }}
        >
          <MekanismSprite
            height={targetHeight - 2}
            name={fillSprite ?? DEFAULT_FILLS[kind]}
            tint={resolvedTint}
            width={targetWidth - 2}
          />
        </div>
      </div>
      <MekanismSprite
        className="absolute"
        height={targetHeight - 2}
        left={1}
        name={`gauge/overlay/${MEKANISM_GAUGE_OVERLAYS[type]}` as MekanismSpriteName}
        top={1}
        width={targetWidth - 2}
      />
    </div>
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
