import type { ReactNode } from "react";

import type { ScreenSlot } from "../containers/types";
import { progressClipPath } from "../../lib/progress";
import { cn, gui } from "../../lib/utils";
import { ScreenItemSlot } from "../containers/screen-slot";

export interface ModIconButtonProps {
  /**
  * 按钮纹理类（默认原版 `mc-tex-btn`）
  */
  buttonClassName?: string;
  className?: string;
  /**
  * 按钮高（GUI px，默认 22）
  */
  height?: number;
  /**
  * 图标纹理类
  */
  iconClassName: string;
  /**
  * 图标边长（GUI px，默认 16）
  */
  iconSize?: number;
  /**
  * 可访问名称
  */
  label: string;
  left?: number;
  onClick?: () => void;
  title?: string;
  top?: number;
  /**
  * 按钮宽（GUI px，默认 22）
  */
  width?: number;
}

export interface ModProgressProps {
  /**
  * 填充方向（默认向下）
  */
  direction?: "down" | "left" | "right" | "up";
  /**
  * 填充纹理类
  */
  fillClassName: string;
  /**
  * 纹理高（GUI px）
  */
  height: number;
  /**
  * 填充层向内缩进（GUI px，默认 0；用于让填充落在轨道边框内）
  */
  inset?: number;
  /**
  * 无障碍标签（提供时暴露 progressbar 语义）
  */
  label?: string;
  left: number;
  /**
  * 进度 0..1
  */
  progress: number;
  top: number;
  /**
  * 轨道纹理类（省略时仅绘制填充层）
  */
  trackClassName?: string;
  /**
  * 纹理宽（GUI px）
  */
  width: number;
}

export interface ModScrollbarProps {
  height: number;
  left: number;
  top: number;
  /**
  * 滚动位置 0..1（默认 0）
  */
  value?: number;
}

export interface ModSearchFieldProps {
  className?: string;
  defaultValue?: string;
  /**
  * 可访问名称（默认“搜索”）
  */
  label?: string;
  left: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  top: number;
  /**
  * 输入框宽（GUI px，默认 89）
  */
  width?: number;
}

export interface ModSlotGridProps {
  /**
  * 单元格边长（GUI px，默认 18）
  */
  cellSize?: number;
  columns: number;
  /**
  * 槽框纹理类（默认原版 `mc-tex-slot`）
  */
  frameClassName?: string;
  items?: ScreenSlot[];
  /**
  * 无障碍名称前缀（`${prefix}-${index}`）
  */
  labelPrefix: string;
  /**
  * 第一个槽框左上角 x
  */
  left: number;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  rows: number;
  /**
  * 第一个槽框左上角 y
  */
  top: number;
}

export interface ModTabButtonProps {
  className?: string;
  iconClassName?: string;
  label: string;
  left: number;
  onClick?: () => void;
  selected?: boolean;
  top: number;
}

export interface ModTitleProps {
  children: ReactNode;
  className?: string;
  left?: number;
  right?: number;
  top?: number;
}

export interface ModToolbarItem {
  iconClassName: string;
  label: string;
  onClick?: () => void;
}

export interface ModToolbarProps {
  className?: string;
  items: ModToolbarItem[];
  /**
  * 工具栏左边（GUI px，默认 0）
  */
  left?: number;
  /**
  * 工具栏顶边（GUI px，默认 0）
  */
  top?: number;
}

/**
 * 通用 mod 图标按钮：几何由调用方给出，图标走纹理类。
 */
export function ModIconButton({
  buttonClassName = "mc-tex-btn",
  className,
  height = 22,
  iconClassName,
  iconSize = 16,
  label,
  left,
  onClick,
  title = label,
  top,
  width = 22,
}: ModIconButtonProps) {
  const isPositioned = left !== undefined || top !== undefined;
  return (
    <button
      aria-label={label}
      className={cn(
        "flex cursor-pointer items-center justify-center border-0 p-0",
        isPositioned ? "absolute" : "relative",
        buttonClassName,
        className,
      )}
      onClick={onClick}
      style={{
        height: gui(height),
        left: left === undefined ? undefined : gui(left),
        top: top === undefined ? undefined : gui(top),
        width: gui(width),
      }}
      title={title}
      type="button"
    >
      <span
        aria-hidden="true"
        className={cn("block", iconClassName)}
        style={{ height: gui(iconSize), width: gui(iconSize) }}
      />
    </button>
  );
}

/**
 * 通用 mod 进度条：轨道 + 按比例裁剪的填充层，坐标为面板 GUI px。
 */
export function ModProgress({
  direction = "down",
  fillClassName,
  height,
  inset = 0,
  label,
  left,
  progress,
  top,
  trackClassName,
  width,
}: ModProgressProps) {
  const ratio = Math.min(1, Math.max(0, progress));
  return (
    <div
      aria-label={label}
      aria-valuemax={1}
      aria-valuemin={0}
      aria-valuenow={ratio}
      className="absolute"
      role={label ? "progressbar" : undefined}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    >
      {trackClassName
        ? <div aria-hidden="true" className={cn("absolute inset-0", trackClassName)} />
        : null}
      <div
        aria-hidden="true"
        className={cn("absolute", fillClassName)}
        style={{ clipPath: progressClipPath(direction, ratio), inset: gui(inset) }}
      />
    </div>
  );
}

/**
 * 通用 mod 滚动条展示件：6 宽轨道 + 12×15 滑块。
 */
export function ModScrollbar({
  height,
  left,
  top,
  value = 0,
}: ModScrollbarProps) {
  const ratio = Math.min(1, Math.max(0, value));
  return (
    <div
      aria-hidden="true"
      className="absolute"
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(12) }}
    >
      <span
        className="mc-tex-ae2-scrollbar-track absolute"
        style={{ height: gui(height), left: gui(3), top: 0, width: gui(6) }}
      />
      <span
        className="mc-tex-ae2-scrollbar-thumb absolute"
        style={{
          height: gui(15),
          left: 0,
          top: gui(Math.round(ratio * Math.max(0, height - 15))),
          width: gui(12),
        }}
      />
    </div>
  );
}

/**
 * 通用 mod 搜索框：非受控输入，高 12 GUI px，左右内边距 3 GUI px。
 */
export function ModSearchField({
  className,
  defaultValue,
  label = "搜索",
  left,
  onChange,
  placeholder,
  top,
  width = 89,
}: ModSearchFieldProps) {
  return (
    <input
      aria-label={label}
      className={cn("mc-tex-ae2-text-field absolute", className)}
      defaultValue={defaultValue}
      onChange={event => onChange?.(event.currentTarget.value)}
      placeholder={placeholder}
      style={{
        height: gui(12),
        left: gui(left),
        paddingLeft: gui(3),
        paddingRight: gui(3),
        top: gui(top),
        width: gui(width),
      }}
      type="text"
    />
  );
}

/**
 * 通用 mod 槽位网格：按行优先排列，自动补齐到 `rows * columns`。
 */
export function ModSlotGrid({
  cellSize = 18,
  columns,
  frameClassName,
  items = [],
  labelPrefix,
  left,
  onSlotClick,
  rows,
  top,
}: ModSlotGridProps) {
  const slots = Array.from({ length: rows * columns }, (_, index) => items[index] ?? null);
  return (
    <>
      {slots.map((item, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = left + column * cellSize;
        const y = top + row * cellSize;
        return (
          <ScreenItemSlot
            frame
            frameClassName={frameClassName}
            item={item}
            key={`${x}-${y}`}
            label={`${labelPrefix}-${index}`}
            left={x}
            onActivate={onSlotClick ? () => onSlotClick(index, item) : undefined}
            size={cellSize}
            top={y}
          />
        );
      })}
    </>
  );
}

/**
 * 通用 mod 顶部标签按钮：20×20，选中态由 `selected` 切换纹理。
 */
export function ModTabButton({
  className,
  iconClassName,
  label,
  left,
  onClick,
  selected = false,
  top,
}: ModTabButtonProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={cn(
        "mc-tex-ae2-tab absolute flex cursor-pointer items-center justify-center border-0 p-0",
        selected && "mc-tex-ae2-tab-selected",
        className,
      )}
      onClick={onClick}
      style={{ height: gui(20), left: gui(left), top: gui(top), width: gui(20) }}
      title={label}
      type="button"
    >
      {iconClassName
        ? (
            <span
              aria-hidden="true"
              className={cn("block", iconClassName)}
              style={{ height: gui(16), width: gui(16) }}
            />
          )
        : null}
    </button>
  );
}

/**
 * 通用 mod 标题：普通像素文本，绝对定位，不使用原版标题栏。
 */
export function ModTitle({
  children,
  className,
  left,
  right,
  top,
}: ModTitleProps) {
  return (
    <span
      className={cn("absolute font-mc mc-text text-mc-ae2-text", className)}
      style={{
        left: left === undefined ? undefined : gui(left),
        right: right === undefined ? undefined : gui(right),
        top: top === undefined ? undefined : gui(top),
      }}
    >
      {children}
    </span>
  );
}

/**
 * 通用 mod 竖向工具栏：21 GUI px 浅色条 + 18×20 图标按钮。
 */
export function ModToolbar({
  className,
  items,
  left = 0,
  top = 0,
}: ModToolbarProps) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        height: gui(items.length * 26 + 2),
        left: gui(left),
        top: gui(top),
        width: gui(21),
      }}
    >
      <span aria-hidden="true" className="mc-tex-ae2-toolbar absolute inset-0" />
      {items.map((item, index) => (
        <ModIconButton
          buttonClassName="mc-tex-ae2-toolbar-button"
          height={20}
          iconClassName={item.iconClassName}
          key={item.label}
          label={item.label}
          left={4}
          onClick={item.onClick}
          top={3 + index * 26}
          width={18}
        />
      ))}
    </div>
  );
}
