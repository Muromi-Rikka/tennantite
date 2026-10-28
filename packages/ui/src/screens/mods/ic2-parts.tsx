import type { ReactNode } from "react";

import { ic2SpriteMeta } from "@verdigris/textures";

import type { Ic2ProgressStyle, Ic2RedstoneMode } from "./ic2-types";
import type { ModSpriteRect } from "./mod-parts";

import { progressClipPath } from "../../lib/progress";
import { gui } from "../../lib/utils";
import { ModSprite } from "./mod-parts";

const REDSTONE_ORDER: Ic2RedstoneMode[] = ["normal", "inverted", "none"];

const REDSTONE_LABEL: Record<Ic2RedstoneMode, string> = {
  inverted: "红石模式：反向",
  none: "红石模式：忽略",
  normal: "红石模式：普通",
};

interface ProgressGeometry {
  background: ModSpriteRect;
  fill: ModSpriteRect;
  offset: { x: number; y: number };
}

/**
 * 进度贴图源矩形（`common.png`）。背景偏移为相对填充原点的负偏移，
 * 与 IC2 `Gauge.drawBackground` 一致。
 */
const PROGRESS: Record<Ic2ProgressStyle, ProgressGeometry> = {
  arrow: {
    background: { height: 16, width: 32, x: 160, y: 0 },
    fill: { height: 15, width: 22, x: 165, y: 16 },
    offset: { x: -5, y: 0 },
  },
  crush: {
    background: { height: 16, width: 32, x: 160, y: 32 },
    fill: { height: 11, width: 21, x: 165, y: 52 },
    offset: { x: -5, y: -3 },
  },
  drop: {
    background: { height: 16, width: 32, x: 160, y: 96 },
    fill: { height: 15, width: 22, x: 165, y: 112 },
    offset: { x: -5, y: 0 },
  },
  triangle: {
    background: { height: 16, width: 32, x: 160, y: 64 },
    fill: { height: 15, width: 22, x: 165, y: 80 },
    offset: { x: -5, y: 0 },
  },
};

export interface Ic2LabelProps {
  children: ReactNode;
  className?: string;
  left: number;
  top: number;
}

export interface Ic2ProgressProps {
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  left: number;
  /**
  * 处理进度 0..1
  */
  progress: number;
  /**
  * 进度贴图：粉碎 / 熔炼箭头 / 滴落 / 三角
  */
  style: Ic2ProgressStyle;
  top: number;
}

export interface Ic2RedstoneButtonProps {
  /**
  * 可访问名称；默认按当前模式描述（悬浮提示同文案）
  */
  label?: string;
  left: number;
  /**
  * 当前红石模式
  */
  mode?: Ic2RedstoneMode;
  /**
  * 切换回调（普通 → 反向 → 忽略循环）；省略时为纯展示
  */
  onChange?: (mode: Ic2RedstoneMode) => void;
  top: number;
}

/**
 * IC2 左上角信息按钮图标（10×10，纯展示）。
 */
export function Ic2InfoIcon({ left, top }: { left: number; top: number }) {
  return (
    <ModSprite
      left={left}
      sprite={ic2SpriteMeta.infoButton}
      src={{ height: 10, width: 10, x: 0, y: 0 }}
      top={top}
    />
  );
}

/**
 * IC2 界面文字（绝对定位，`#404040`）。
 */
export function Ic2Label({ children, className, left, top }: Ic2LabelProps) {
  return (
    <span
      className={className
        ? `absolute font-mc mc-text whitespace-pre text-mc-ic2-text ${className}`
        : "absolute font-mc mc-text whitespace-pre text-mc-ic2-text"}
      style={{ left: gui(left), top: gui(top) }}
    >
      {children}
    </span>
  );
}

/**
 * IC2 机器进度（原版贴图）：背景 + 白色填充自左向右裁剪。
 */
export function Ic2Progress({ label, left, progress, style, top }: Ic2ProgressProps) {
  const geometry = PROGRESS[style];
  const ratio = Math.min(1, Math.max(0, progress));
  return (
    <div
      aria-label={label}
      aria-valuemax={1}
      aria-valuemin={0}
      aria-valuenow={ratio}
      className="absolute"
      data-ic2-progress={style}
      role={label ? "progressbar" : undefined}
      style={{
        height: gui(geometry.fill.height),
        left: gui(left),
        top: gui(top),
        width: gui(geometry.fill.width),
      }}
    >
      <ModSprite
        left={geometry.offset.x}
        sprite={ic2SpriteMeta.common}
        src={geometry.background}
        top={geometry.offset.y}
      />
      {ratio > 0
        ? (
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ clipPath: progressClipPath("right", ratio) }}
            >
              <ModSprite sprite={ic2SpriteMeta.common} src={geometry.fill} />
            </div>
          )
        : null}
    </div>
  );
}

/**
 * IC2 红石模式按钮（20×20 原版按钮 + 16×16 红石粉图标），
 * 悬浮提示用原生 title（避免与 Tooltip 触发器嵌套出 button-in-button）。
 */
export function Ic2RedstoneButton({
  label,
  left,
  mode = "normal",
  onChange,
  top,
}: Ic2RedstoneButtonProps) {
  const text = label ?? REDSTONE_LABEL[mode];
  const cycle = () => {
    if (!onChange) {
      return;
    }
    const next = REDSTONE_ORDER[(REDSTONE_ORDER.indexOf(mode) + 1) % REDSTONE_ORDER.length];
    onChange(next ?? "normal");
  };
  return (
    <button
      aria-label={text}
      className="mc-tex-ic2-btn absolute cursor-pointer border-0 p-0"
      onClick={onChange ? cycle : undefined}
      style={{ height: gui(20), left: gui(left), top: gui(top), width: gui(20) }}
      title={text}
      type="button"
    >
      <ModSprite
        left={2}
        sprite={ic2SpriteMeta.redstone}
        src={{ height: 16, width: 16, x: 0, y: 0 }}
        top={2}
      />
    </button>
  );
}

/**
 * IC2 界面标题：水平居中、y=6、`#404040`、无阴影。
 */
export function Ic2Title({ children }: { children: ReactNode }) {
  return (
    <span
      className="absolute inset-x-0 text-center font-mc mc-text text-mc-ic2-text"
      style={{ top: gui(6) }}
    >
      {children}
    </span>
  );
}
