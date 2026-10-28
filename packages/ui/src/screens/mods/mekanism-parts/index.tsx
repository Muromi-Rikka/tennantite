import type { MekanismSpriteName } from "@verdigris/textures";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

import type { ScreenSlot } from "../../containers/types";
import { cn, gui } from "../../../lib/utils";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSprite } from "../mekanism-sprite/index";

const VARIANT_COLORS = {
  "button": "text-mc-mekanism-button",
  "button-inactive": "text-mc-mekanism-button-inactive",
  "screen": "text-mc-mekanism-screen",
  "subheading": "text-mc-mekanism-subheading",
  "title": "text-mc-mekanism-title",
} as const;

export interface MekanismArmorSlotsProps {
  armor?: ScreenSlot[];
  /**
   * 装备槽左上角 x
   */
  left: number;
  offhand?: ScreenSlot;
  offhandY: number;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  /**
   * 第一格顶部 y
   */
  top: number;
}

export interface MekanismArrowProps {
  className?: string;
  dir: "down" | "right" | "up";
  left: number;
  top: number;
}

export interface MekanismButtonProps {
  active?: boolean;
  className?: string;
  disabled?: boolean;
  /**
   * 按钮高（GUI px，默认 20）
   */
  height?: number;
  label: ReactNode;
  left: number;
  onClick?: () => void;
  top: number;
  variant?: "default" | "digital";
  /**
   * 按钮宽（GUI px）
   */
  width: number;
}

export interface MekanismGasModeProps {
  className?: string;
  label: string;
  left: number;
  mode?: "dump" | "dump_excess" | "idle";
  onChange?: (mode: "dump" | "dump_excess" | "idle") => void;
  top: number;
}

export interface MekanismImageButtonProps {
  /**
   * 是否绘制原生 button 底板（默认 true；倾倒按钮为 false）
   */
  background?: boolean;
  className?: string;
  /**
   * 图标目标高（GUI px，默认精灵高）
   */
  height?: number;
  label: string;
  left: number;
  name: MekanismSpriteName;
  onClick?: () => void;
  tint?: string;
  top: number;
  /**
   * 图标目标宽（GUI px，默认精灵宽）
   */
  width?: number;
}

export interface MekanismInnerScreenProps {
  children?: ReactNode;
  className?: string;
  height: number;
  left: number;
  /**
   * 内边距（GUI px，默认 3）
   */
  padding?: number;
  top: number;
  width: number;
}

export interface MekanismLabelProps {
  children?: ReactNode;
  className?: string;
  left: number;
  top: number;
  variant?: MekanismLabelVariant;
  /**
   * 可选最大宽度（GUI px，超出省略）
   */
  width?: number;
}

export type MekanismLabelVariant = keyof typeof VARIANT_COLORS;

export interface MekanismSecurityLightProps {
  className?: string;
  left: number;
  mode?: "disabled" | "enabled" | "not_applicable";
  top: number;
}

export interface MekanismSwitchProps {
  className?: string;
  /**
   * 开关图标
   */
  icon: "eject" | "input" | "inverse" | "silk";
  isChecked?: boolean;
  label: string;
  left: number;
  onChange?: (isChecked: boolean) => void;
  top: number;
}

export interface MekanismTextFieldProps {
  className?: string;
  defaultValue?: string;
  /**
   * 输入框高（GUI px，默认 12）
   */
  height?: number;
  label: string;
  left: number;
  onChange?: (value: string) => void;
  placeholder?: string;
  top: number;
  width: number;
}

export interface MekanismTitleProps {
  children?: ReactNode;
  className?: string;
  /**
   * 标题右界（GUI px，默认面板宽 - 4）
   */
  titleEnd?: number;
  /**
   * 标题左界（GUI px，默认 4）
   */
  titleX?: number;
  /**
   * 标题基线 y（GUI px，默认 6）
   */
  top?: number;
}

export interface MekanismWarningLightProps {
  className?: string;
  enabled?: boolean;
  left: number;
  top: number;
}

/**
 * 4 个装备槽（头盔 / 胸甲 / 护腿 / 靴子）+ 副手槽，18 px 步距。
 */
export function MekanismArmorSlots({
  armor = [],
  left,
  offhand,
  offhandY,
  onSlotClick,
  top,
}: MekanismArmorSlotsProps) {
  return (
    <>
      {Array.from({ length: 5 }, (_, index) => {
        const isOffhand = index === 4;
        const item = isOffhand ? offhand : armor[index];
        return (
          <MekanismSlot
            item={item}
            key={isOffhand ? "offhand" : `armor-${index}`}
            label={isOffhand ? "offhand" : `armor-${index}`}
            left={left}
            onActivate={onSlotClick ? () => onSlotClick(index, item) : undefined}
            top={isOffhand ? offhandY : top + index * 18}
            type="normal"
          />
        );
      })}
    </>
  );
}

/**
 * 方向箭头（up 8×10 / down 8×9 / right 22×15）。
 */
export function MekanismArrow({ className, dir, left, top }: MekanismArrowProps) {
  return (
    <MekanismSprite
      className={className}
      left={left}
      name={`arrow/${dir}` as MekanismSpriteName}
      top={top}
    />
  );
}

/**
 * Mekanism 按钮：button / button_digital 背景 + 居中文本。
 */
export function MekanismButton({
  active = true,
  className,
  disabled = false,
  height = 20,
  label,
  left,
  onClick,
  top,
  variant = "default",
  width,
}: MekanismButtonProps) {
  const name = variant === "digital"
    ? (active ? "button_digital" : "button_digital_inactive")
    : (active ? "button" : "button_inactive");
  return (
    <button
      className={cn("absolute cursor-pointer border-0 p-0", disabled && "cursor-not-allowed", className)}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
      type="button"
    >
      <MekanismSprite height={height} name={name} width={width} />
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-mc mc-text mc-text-shadow",
          active ? "text-mc-mekanism-button" : "text-mc-mekanism-button-inactive",
        )}
      >
        {label}
      </span>
    </button>
  );
}

/**
 * 气体模式按钮（10×10），点击循环 idle → dump → dump_excess。
 */
export function MekanismGasMode({
  className,
  label,
  left,
  mode = "idle",
  onChange,
  top,
}: MekanismGasModeProps) {
  return (
    <button
      aria-label={label}
      className={cn("absolute cursor-pointer border-0 bg-transparent p-0", className)}
      onClick={onChange
        ? () => {
            onChange(mode === "idle" ? "dump" : (mode === "dump" ? "dump_excess" : "idle"));
          }
        : undefined}
      style={{ height: gui(10), left: gui(left), top: gui(top), width: gui(10) }}
      title={label}
      type="button"
    >
      <MekanismSprite height={10} name="button" width={10} />
      <MekanismSprite height={10} name={`chemical_mode/${mode}` as MekanismSpriteName} width={10} />
    </button>
  );
}

/**
 * 纯图标按钮（无背景），用于关闭 / 固定 / 清空侧面等。
 */
export function MekanismImageButton({
  background = true,
  className,
  height,
  label,
  left,
  name,
  onClick,
  tint,
  top,
  width,
}: MekanismImageButtonProps) {
  return (
    <button
      aria-label={label}
      className={cn("absolute cursor-pointer border-0 bg-transparent p-0", className)}
      onClick={onClick}
      style={{ height: gui(height ?? 14), left: gui(left), top: gui(top), width: gui(width ?? 14) }}
      title={label}
      type="button"
    >
      {background ? <MekanismSprite height={height ?? 14} name="button" width={width ?? 14} /> : null}
      <span className="absolute inset-0 flex items-center justify-center">
        <MekanismSprite
          height={height}
          name={name}
          tint={tint}
          width={width}
        />
      </span>
    </button>
  );
}

/**
 * 内嵌屏幕：九宫格 inner_screen + 可滚动内容的静态裁切。
 */
export function MekanismInnerScreen({
  children,
  className,
  height,
  left,
  padding = 3,
  top,
  width,
}: MekanismInnerScreenProps) {
  return (
    <div
      className={cn("absolute overflow-hidden", className)}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    >
      <MekanismSprite height={height} name="inner_screen" width={width} />
      <div
        className="absolute flex flex-col font-mc mc-text text-mc-mekanism-screen"
        style={{
          bottom: gui(padding),
          left: gui(padding),
          right: gui(padding),
          top: gui(padding),
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Mekanism 文本（绝对定位，按层级取色）。
 */
export function MekanismLabel({
  children,
  className,
  left,
  top,
  variant = "title",
  width,
}: MekanismLabelProps) {
  return (
    <span
      className={cn(
        "absolute font-mc mc-text whitespace-pre",
        VARIANT_COLORS[variant],
        className,
      )}
      style={{
        left: gui(left),
        top: gui(top),
        ...(width !== undefined && { overflow: "hidden", textOverflow: "ellipsis", width: gui(width) }),
      }}
    >
      {children}
    </span>
  );
}

/**
 * 安全灯（18×18）。
 */
export function MekanismSecurityLight({
  className,
  left,
  mode = "enabled",
  top,
}: MekanismSecurityLightProps) {
  return (
    <MekanismSprite
      className={className}
      height={18}
      left={left}
      name={`light/security/${mode}` as MekanismSpriteName}
      top={top}
      width={18}
    />
  );
}

/**
 * 15×8 开关 + 5×5 图标。
 */
export function MekanismSwitch({
  className,
  icon,
  isChecked = false,
  label,
  left,
  onChange,
  top,
}: MekanismSwitchProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={isChecked}
      className={cn("absolute cursor-pointer border-0 bg-transparent p-0", className)}
      onClick={onChange ? () => onChange(!isChecked) : undefined}
      style={{ height: gui(8), left: gui(left), top: gui(top), width: gui(15) }}
      title={label}
      type="button"
    >
      <MekanismSprite height={8} name={isChecked ? "switch/selected" : "switch/unselected"} width={15} />
      <MekanismSprite
        className="absolute"
        height={5}
        left={5}
        name={`switch/${icon}` as MekanismSpriteName}
        top={1.5}
        width={5}
      />
    </button>
  );
}

/**
 * 12 px 高数字/文本输入框（深色底 + 内屏绿字），保留原生键盘行为。
 */
export function MekanismTextField({
  className,
  defaultValue,
  height = 12,
  label,
  left,
  onChange,
  placeholder,
  top,
  width,
}: MekanismTextFieldProps) {
  return (
    <input
      aria-label={label}
      className={cn(
        "absolute mc-border border-mc-stone-darker bg-[#0a0a0a] px-1 font-mc mc-text text-mc-mekanism-screen outline-none placeholder:text-[#3a6b52]",
        className,
      )}
      defaultValue={defaultValue}
      onChange={onChange ? event => onChange(event.currentTarget.value) : undefined}
      onKeyDown={handleTextFieldKeyDown}
      placeholder={placeholder}
      style={{ height: gui(height), left: gui(left), top: gui(top), width: gui(width) }}
    />
  );
}

/**
 * Mekanism 面板标题：左界 / 右界之间居中，无阴影。
 */
export function MekanismTitle({
  children,
  className,
  titleEnd,
  titleX = 4,
  top = 6,
}: MekanismTitleProps) {
  const style: CSSProperties = { left: gui(titleX), top: gui(top) };
  if (titleEnd === undefined) {
    style.right = gui(4);
  }
  else {
    style.width = gui(Math.max(0, titleEnd - titleX));
  }
  return (
    <span
      className={cn(
        "absolute text-center font-mc mc-text whitespace-pre text-mc-mekanism-title",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}

/**
 * 大警告灯（18×18）。
 */
export function MekanismWarningLight({
  className,
  enabled = false,
  left,
  top,
}: MekanismWarningLightProps) {
  return (
    <MekanismSprite
      className={className}
      height={18}
      left={left}
      name={`light/big/${enabled ? "enabled" : "disabled"}` as MekanismSpriteName}
      top={top}
      width={18}
    />
  );
}

function handleTextFieldKeyDown(event: KeyboardEvent<HTMLInputElement>) {
  if (event.key === "Enter") {
    event.currentTarget.blur();
  }
}
