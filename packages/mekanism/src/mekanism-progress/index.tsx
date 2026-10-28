import type { MekanismSpriteName } from "@tennantite/textures";
import type { CSSProperties } from "react";
import { mekanismSpriteMeta } from "@tennantite/textures";

import type { MekanismProgressType } from "../mekanism-types";
import { cn, gui } from "@tennantite/ui";
import { MEKANISM_PROGRESS_SIZES, MEKANISM_PROGRESS_SPRITES } from "../mekanism-metrics";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismProgressProps {
  className?: string;
  /**
   * 可访问名称
   */
  label?: string;
  /**
   * 进度左上角 x（GUI px）
   */
  left: number;
  /**
   * 进度 0..1
   */
  progress: number;
  /**
   * 渐变染色（颜料等）
   */
  tint?: { from: string; to: string };
  /**
   * 进度左上角 y（GUI px）
   */
  top: number;
  /**
   * 进度类型
   */
  type: MekanismProgressType;
  /**
   * 警告态：使用 warning 填充
   */
  warning?: boolean;
}

/**
 * Mekanism 进度条：empty 轨道 + 按方向裁剪的 full/warning 填充。
 * 方向严格复刻 `GuiProgress`（含 BAR 的 1 px 内缩与 FLAME 的反向）。
 */
export function MekanismProgress({
  className,
  label,
  left,
  progress,
  tint,
  top,
  type,
  warning = false,
}: MekanismProgressProps) {
  const size = MEKANISM_PROGRESS_SIZES[type];
  const ratio = Math.min(1, Math.max(0, progress));
  const sprite = MEKANISM_PROGRESS_SPRITES[type];
  const fullName = `progress/${sprite}/${warning ? "warning" : "full"}` as MekanismSpriteName;
  const emptyName = `progress/${sprite}/empty` as MekanismSpriteName;
  const fullMeta = mekanismSpriteMeta[fullName];

  const fillWidth = size.vertical ? size.width : size.width * ratio;
  const fillHeight = size.vertical ? size.height * ratio : size.height;
  let fillStyle: CSSProperties;
  if (size.vertical) {
    fillStyle = {
      height: gui(fillHeight),
      left: 0,
      top: size.reverse ? gui(size.height - fillHeight) : 0,
      width: gui(size.width),
    };
  }
  else if (size.reverse) {
    fillStyle = {
      height: gui(size.height),
      left: gui(size.width - fillWidth),
      top: 0,
      width: gui(fillWidth),
    };
  }
  else {
    const inset = type === "BAR" ? 1 : 0;
    fillStyle = {
      height: gui(size.height),
      left: gui(inset),
      top: 0,
      width: gui(Math.max(0, (size.width - inset * 2) * ratio)),
    };
  }
  fillStyle.position = "absolute";

  const innerStyle: CSSProperties = size.vertical
    ? { bottom: size.reverse ? 0 : undefined, top: size.reverse ? undefined : 0 }
    : { left: size.reverse ? 0 : undefined, right: size.reverse ? 0 : undefined, top: 0 };
  if (size.vertical) {
    innerStyle.left = 0;
  }
  innerStyle.position = "absolute";

  return (
    <div
      aria-label={label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * 100)}
      className={cn("absolute", className)}
      role="progressbar"
      style={{
        height: gui(size.height),
        left: gui(left),
        top: gui(top),
        width: gui(size.width),
      }}
    >
      <MekanismSprite height={size.height} name={emptyName} width={size.width} />
      {ratio > 0
        ? (
            <div className="absolute overflow-hidden" style={fillStyle}>
              {tint
                ? (
                    <div
                      style={{
                        ...innerStyle,
                        backgroundImage: `linear-gradient(to right, ${tint.from}, ${tint.to})`,
                        height: gui(size.height),
                        maskImage: `var(${fullMeta.cssVar})`,
                        maskRepeat: "no-repeat",
                        maskSize: "100% 100%",
                        width: gui(size.width),
                      }}
                    />
                  )
                : (
                    <MekanismSprite
                      height={size.height}
                      name={fullName}
                      style={innerStyle}
                      width={size.width}
                    />
                  )}
            </div>
          )
        : null}
    </div>
  );
}
