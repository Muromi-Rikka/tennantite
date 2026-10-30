import type { MekanismSpriteName } from "@tennantite/textures";
import { ModProgress } from "@tennantite/mods-core";
import { mekanismSpriteMeta } from "@tennantite/textures";
import { cn } from "@tennantite/ui";

import type { MekanismProgressType } from "../mekanism-types";
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
  const sprite = MEKANISM_PROGRESS_SPRITES[type];
  const fullName = `progress/${sprite}/${warning ? "warning" : "full"}` as MekanismSpriteName;
  const emptyName = `progress/${sprite}/empty` as MekanismSpriteName;
  const fullMeta = mekanismSpriteMeta[fullName];
  const direction = size.vertical
    ? (size.reverse ? "up" : "down")
    : (size.reverse ? "left" : "right");
  const inset = !size.vertical && type === "BAR" ? 1 : 0;

  return (
    <ModProgress
      ariaValue="percent"
      className={cn(className)}
      direction={direction}
      fill={tint
        ? (
            <div
              style={{
                backgroundImage: `linear-gradient(to right, ${tint.from}, ${tint.to})`,
                height: "100%",
                maskImage: `var(${fullMeta.cssVar})`,
                maskRepeat: "no-repeat",
                maskSize: "100% 100%",
                width: "100%",
              }}
            />
          )
        : <MekanismSprite height={size.height} name={fullName} width={size.width} />}
      height={size.height}
      inset={inset}
      label={label}
      left={left}
      progress={progress}
      top={top}
      track={<MekanismSprite height={size.height} name={emptyName} width={size.width} />}
      width={size.width}
    />
  );
}
