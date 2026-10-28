/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
"use client";

import type { GuiSpriteName, PixelIconName } from "@tennantite/textures";
import type { ReactNode } from "react";
import { useState } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { Icon } from "../../../containers/icon/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface BeaconPower {
  /**
  * 18×18 状态效果图标：`effect-speed` / `effect-haste` / `effect-resistance` /
  * `effect-jump boost` / `effect-strength` / `effect-regeneration`
  */
  icon?: PixelIconName;
  id: string;
  label: string;
}

export interface BeaconScreenProps {
  className?: string;
  onCancel?: () => void;
  onConfirm?: (selection: {
    payment: boolean;
    primary: null | string;
    secondary: null | string;
  }) => void;
  onSelectPrimary?: (id: null | string) => void;
  onSelectSecondary?: (id: null | string) => void;
  payment?: ScreenSlot;
  primary?: null | string;
  primaryOptions?: BeaconPower[];
  secondary?: null | string;
  secondaryOptions?: BeaconPower[];
  title?: ReactNode;
}

/**
 * 原版 5 个主效果按金字塔层数排布：1 级 2 个、2 级 2 个、3 级 1 个（居中）。
 */
const PRIMARY_POSITIONS = [
  [53, 22],
  [77, 22],
  [53, 47],
  [77, 47],
  [65, 72],
] as const;
const SECONDARY_POSITION = [144, 47] as const;

/**
 * 支付材料行：原版界面固定展示 5 种可用矿物（左起下界合金锭、绿宝石、钻石、金锭、铁锭）。
 */
const PAYMENT_MATERIALS = [
  ["netherite-ingot", 20],
  ["emerald", 41],
  ["diamond", 63],
  ["gold-ingot", 86],
  ["iron-ingot", 108],
] as const satisfies readonly (readonly [PixelIconName, number])[];

const PAYMENT_MATERIAL_TOP = 109;

/**
 * 信标界面（规格 §6）：`container/beacon.png` 230×219。
 *
 * 背景纹理烘焙了双栏标题、三层金字塔图标与支付材料分隔符；
 * 本组件只铺动态层：效果按钮、支付材料图标、支付槽与完成/取消。
 */
export function BeaconScreen({
  className,
  onCancel,
  onConfirm,
  onSelectPrimary,
  onSelectSecondary,
  payment,
  primary: primaryProperty,
  primaryOptions = [],
  secondary: secondaryProperty,
  secondaryOptions = [],
  title,
}: BeaconScreenProps) {
  const [primaryState, setPrimaryState] = useState<null | string>(null);
  const [secondaryState, setSecondaryState] = useState<null | string>(null);
  const primary = primaryProperty === undefined ? primaryState : primaryProperty;
  const secondary = secondaryProperty === undefined ? secondaryState : secondaryProperty;
  // 原版：投入矿物前所有效果按钮禁用（按钮为 button_disabled 暗色态）
  const hasPayment = Boolean(payment);
  const secondaryOption = secondaryOptions[0];

  const select = (kind: "primary" | "secondary", id: string) => {
    if (kind === "primary") {
      setPrimaryState(id);
      onSelectPrimary?.(id);
    }
    else {
      setSecondaryState(id);
      onSelectSecondary?.(id);
    }
  };

  return (
    <ScreenPanel
      background="container/beacon.png"
      className={className}
      height={219}
      title={title}
      width={230}
    >
      <span
        className="absolute text-center font-mc mc-text text-mc-text-main mc-text-shadow"
        style={{ left: gui(0), top: gui(9), width: gui(124) }}
      >
        主效果
      </span>
      <span
        className="absolute text-center font-mc mc-text text-mc-text-main mc-text-shadow"
        style={{ left: gui(106), top: gui(9), width: gui(124) }}
      >
        辅助效果
      </span>
      {PRIMARY_POSITIONS.map(([left, top], index) => {
        const option = primaryOptions[index];
        return (
          <PowerButton
            disabled={!hasPayment || !option}
            icon={option?.icon}
            key={`primary-${index}`}
            label={option?.label ?? `主效果 ${index + 1}`}
            left={left}
            onSelect={() => {
              if (option)
                select("primary", option.id);
            }}
            selected={Boolean(option && primary === option.id)}
            top={top}
          />
        );
      })}
      <PowerButton
        disabled={!hasPayment || !secondaryOption}
        icon={secondaryOption?.icon}
        label={secondaryOption?.label ?? "辅助效果 1"}
        left={SECONDARY_POSITION[0]}
        onSelect={() => {
          if (secondaryOption)
            select("secondary", secondaryOption.id);
        }}
        selected={Boolean(secondaryOption && secondary === secondaryOption.id)}
        top={SECONDARY_POSITION[1]}
      />
      {PAYMENT_MATERIALS.map(([icon, left]) => (
        <Icon
          className="absolute"
          key={icon}
          name={icon}
          size={16}
          style={{ left: gui(left), top: gui(PAYMENT_MATERIAL_TOP) }}
        />
      ))}
      <ScreenItemSlot item={payment} label="信标支付槽" left={135} top={109} />
      <BeaconActionButton
        disabled={!hasPayment || !primary}
        icon="sprites/container/beacon/confirm.png"
        label="完成"
        left={164}
        onClick={() => {
          onConfirm?.({
            payment: hasPayment,
            primary,
            secondary,
          });
        }}
        top={107}
      />
      <BeaconActionButton
        icon="sprites/container/beacon/cancel.png"
        label="取消"
        left={190}
        onClick={onCancel}
        top={107}
      />
      <PlayerInventory bare hotbarY={194} x={35} y={136} />
    </ScreenPanel>
  );
}

function BeaconActionButton({
  disabled = false,
  icon,
  label,
  left,
  onClick,
  top,
}: {
  disabled?: boolean;
  icon: "sprites/container/beacon/cancel.png" | "sprites/container/beacon/confirm.png";
  label: string;
  left: number;
  onClick?: () => void;
  top: number;
}) {
  return (
    <button
      aria-label={label}
      className="group absolute cursor-pointer border-0 bg-transparent p-0 disabled:cursor-default"
      disabled={disabled}
      onClick={onClick}
      style={{ height: gui(22), left: gui(left), top: gui(top), width: gui(22) }}
      type="button"
    >
      <GuiSprite
        className="absolute inset-0"
        height={22}
        name={disabled
          ? "sprites/container/beacon/button_disabled.png"
          : "sprites/container/beacon/button.png"}
        width={22}
      />
      {disabled
        ? null
        : (
            <GuiSprite
              className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              height={22}
              name="sprites/container/beacon/button_highlighted.png"
              width={22}
            />
          )}
      <GuiSprite
        className="absolute"
        height={18}
        name={icon}
        style={{ left: gui(2), top: gui(2) }}
        width={18}
      />
    </button>
  );
}

function PowerButton({
  disabled,
  icon,
  label,
  left,
  onSelect,
  selected,
  top,
}: {
  disabled: boolean;
  icon?: PixelIconName;
  label: string;
  left: number;
  onSelect: () => void;
  selected: boolean;
  top: number;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className="group absolute cursor-pointer border-0 bg-transparent p-0 disabled:cursor-default"
      disabled={disabled}
      onClick={onSelect}
      style={{ height: gui(22), left: gui(left), top: gui(top), width: gui(22) }}
      type="button"
    >
      <GuiSprite
        className="absolute inset-0"
        height={22}
        name={powerButtonSprite(disabled, selected)}
        width={22}
      />
      {disabled
        ? null
        : (
            <GuiSprite
              className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              height={22}
              name="sprites/container/beacon/button_highlighted.png"
              width={22}
            />
          )}
      {icon
        ? (
            <Icon
              className="absolute"
              name={icon}
              size={18}
              style={{ left: gui(2), top: gui(2) }}
            />
          )
        : null}
    </button>
  );
}

function powerButtonSprite(isDisabled: boolean, isSelected: boolean): GuiSpriteName {
  if (isDisabled) {
    return "sprites/container/beacon/button_disabled.png";
  }
  return isSelected
    ? "sprites/container/beacon/button_selected.png"
    : "sprites/container/beacon/button.png";
}
