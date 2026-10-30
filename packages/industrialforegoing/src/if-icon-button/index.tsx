import type { ReactNode } from "react";
import { ModIconButton } from "@tennantite/mods-core";
import { cn } from "@tennantite/ui";
import type { IfCropKey } from "../if-metrics";
import { IF_CROPS } from "../if-metrics";
import { IfSprite } from "../if-sprite/index";

export interface IfIconButtonProps {
  className?: string;
  disabled?: boolean;
  height: number;
  label: string;
  left: number;
  onClick?: () => void;
  state?: number;
  states: readonly [IfCropKey, ...IfCropKey[]];
  tooltip?: string;
  top: number;
  width: number;
}

/**
 * Industrial Foregoing 图集按钮：状态图 + 悬停 1px 白色内描边（CSS 悬停，SSR 安全）。
 */
export function IfIconButton({
  className,
  disabled,
  height,
  label,
  left,
  onClick,
  state = 0,
  states,
  tooltip = label,
  top,
  width,
}: IfIconButtonProps) {
  const crop = states[Math.min(Math.max(state, 0), states.length - 1)] as IfCropKey;

  // `states` 为非空元组，`map` 后按长度回断言，保留 ModIconButton 的非空契约。
  const icons = states.map((spriteCrop, index) => (
    // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 数据模型无稳定 id，列表顺序即身份
    <IfSprite
      crop={spriteCrop}
      height={height}
      key={`${spriteCrop}-${index}`}
      left={0}
      name={IF_CROPS[spriteCrop].sprite}
      top={0}
      width={width}
    />
  )) as unknown as readonly [ReactNode, ...ReactNode[]];

  return (
    <ModIconButton
      buttonClassName=""
      className={cn(
        "bg-transparent hover:shadow-[inset_0_0_0_1px_#fff] focus-visible:shadow-[inset_0_0_0_1px_#fff]",
        disabled ? "opacity-60" : undefined,
        className,
      )}
      dataAttributes={{
        "data-if-button": label,
        "data-if-crop": crop,
      }}
      disabled={disabled}
      height={height}
      icons={icons}
      label={label}
      left={left}
      onClick={onClick}
      state={state}
      title={tooltip}
      top={top}
      width={width}
    />
  );
}
