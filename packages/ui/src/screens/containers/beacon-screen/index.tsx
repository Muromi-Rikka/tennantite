/* eslint-disable react/no-array-index-key -- 固定槽位/列表以位置为身份 */
"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface BeaconPower {
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

const PRIMARY_POSITIONS = [
  [76, 22],
  [100, 22],
] as const;
const SECONDARY_POSITIONS = [
  [76, 47],
  [100, 47],
] as const;

/**
 * 信标界面（规格 §6）：`container/beacon.png` 230×219，效果按钮 + 支付槽 + 确认/取消。
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
  const [openPicker, setOpenPicker] = useState<"primary" | "secondary" | null>(null);
  const primary = primaryProperty === undefined ? primaryState : primaryProperty;
  const secondary = secondaryProperty === undefined ? secondaryState : secondaryProperty;

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
      {PRIMARY_POSITIONS.map(([left, top], index) => {
        const option = primaryOptions[index];
        return (
          <PowerButton
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
      {SECONDARY_POSITIONS.map(([left, top], index) => {
        const option = secondaryOptions[index];
        return (
          <PowerButton
            key={`secondary-${index}`}
            label={option?.label ?? `副效果 ${index + 1}`}
            left={left}
            onSelect={() => {
              if (option)
                select("secondary", option.id);
            }}
            selected={Boolean(option && secondary === option.id)}
            top={top}
          />
        );
      })}
      <button aria-label="主效果" className="sr-only" onClick={() => setOpenPicker("primary")} type="button">
        主效果
      </button>
      <button aria-label="副效果" className="sr-only" onClick={() => setOpenPicker("secondary")} type="button">
        副效果
      </button>
      {openPicker
        ? (
            <div className="absolute z-10 flex flex-col bg-black p-1" style={{ left: gui(120), top: gui(22) }}>
              {(openPicker === "primary" ? primaryOptions : secondaryOptions).map(option => (
                <button
                  className="cursor-pointer border-0 bg-transparent px-2 py-1 text-left font-mc mc-text text-mc-text-main hover:bg-white/10"
                  key={option.id}
                  onClick={() => {
                    select(openPicker, option.id);
                    setOpenPicker(null);
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )
        : null}
      <button
        aria-label="完成"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={() => {
          onConfirm?.({
            payment: payment !== undefined,
            primary,
            secondary,
          });
        }}
        style={{ height: gui(18), left: gui(166), top: gui(109), width: gui(18) }}
        type="button"
      >
        <GuiSprite height={18} name="sprites/container/beacon/confirm.png" width={18} />
      </button>
      <button
        aria-label="取消"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={onCancel}
        style={{ height: gui(18), left: gui(192), top: gui(109), width: gui(18) }}
        type="button"
      >
        <GuiSprite height={18} name="sprites/container/beacon/cancel.png" width={18} />
      </button>
      <ScreenItemSlot item={payment} label="信标支付槽" left={135} top={109} />
      <PlayerInventory bare hotbarY={194} x={35} y={136} />
    </ScreenPanel>
  );
}

function PowerButton({
  label,
  left,
  onSelect,
  selected,
  top,
}: {
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
      className="absolute cursor-pointer border-0 bg-transparent p-0"
      onClick={onSelect}
      style={{ height: gui(22), left: gui(left), top: gui(top), width: gui(22) }}
      type="button"
    >
      <GuiSprite
        height={22}
        name={selected
          ? "sprites/container/beacon/button_selected.png"
          : "sprites/container/beacon/button.png"}
        width={22}
      />
    </button>
  );
}
