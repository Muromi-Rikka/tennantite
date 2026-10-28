import type { Ic2RedstoneMode } from "./ic2-types";
import { gui } from "../../lib/utils";
import { ModIconButton, ModProgress } from "./mod-parts";

const REDSTONE_ORDER: Ic2RedstoneMode[] = ["normal", "inverted", "none"];

const REDSTONE_LABEL: Record<Ic2RedstoneMode, string> = {
  inverted: "红石模式：反向",
  none: "红石模式：忽略",
  normal: "红石模式：普通",
};

export interface Ic2ProgressProps {
  /**
  * 填充方向：向下（IC2 机器经典布局）或向右
  */
  direction?: "down" | "right";
  /**
  * 纹理高（GUI px：纵向 24 / 横向 16）
  */
  height: number;
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  left: number;
  /**
  * 处理进度 0..1
  */
  progress: number;
  top: number;
  /**
  * 纹理宽（GUI px：纵向 13 / 横向 24）
  */
  width: number;
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
 * IC2 闪电图标 6×9（EU 能量槽旁的能量符号，绝对定位装饰）。
 */
export function Ic2BoltIcon({ left, top }: { left: number; top: number }) {
  return (
    <span
      aria-hidden="true"
      className="mc-tex-ic2-bolt absolute"
      style={{ left: gui(left), top: gui(top) }}
    />
  );
}

/**
 * 储电箱充/放电极性标记 9×9（绝对定位装饰）。
 */
export function Ic2ChargeMarker({ kind, left, top }: { kind: "minus" | "plus"; left: number; top: number }) {
  return (
    <span
      aria-hidden="true"
      className={kind === "plus" ? "mc-tex-ic2-charge-plus absolute" : "mc-tex-ic2-charge-minus absolute"}
      style={{ left: gui(left), top: gui(top) }}
    />
  );
}

/**
 * IC2 进度箭头（工业时代 2 视觉复刻）：灰色轨道 + 白色填充按比例裁剪。
 * 轨道不烘焙在背景里（`.mc-tex-ic2-machine` 只画窗口与噪点），由本组件成对绘制。
 */
export function Ic2Progress({
  direction = "down",
  height,
  label,
  left,
  progress,
  top,
  width,
}: Ic2ProgressProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  return (
    <ModProgress
      direction={direction}
      fillClassName={direction === "right" ? "mc-tex-ic2-arrow-fill" : "mc-tex-ic2-arrow-down-fill"}
      height={height}
      label={label}
      left={left}
      progress={ratio}
      top={top}
      trackClassName={direction === "right" ? "mc-tex-ic2-arrow" : "mc-tex-ic2-arrow-down"}
      width={width}
    />
  );
}

/**
 * IC2 红石模式按钮（工业时代 2 视觉复刻）：原版按钮几何 + 火把状态图标，
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
    <ModIconButton
      buttonClassName="mc-tex-btn"
      height={22}
      iconClassName={`mc-tex-ic2-redstone-${mode}`}
      label={text}
      left={left}
      onClick={onChange ? cycle : undefined}
      title={text}
      top={top}
      width={22}
    />
  );
}
