import type { ScreenSlot } from "@tennantite/ui";
import { gui, ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";

import { EioSprite } from "./eio-sprite/index";

export interface EioSlotRender {
  label: string;
  left: number;
  top: number;
}

/**
 * 流体表占位区域（`FluidStackWidget` 复刻：仅框选区域，流体由数据注入时着色）。
 */
export function EioFluidRegions({
  regions,
}: {
  regions: { height: number; left: number; top: number; width: number }[];
}) {
  return (
    <>
      {regions.map(region => (
        <div
          aria-hidden="true"
          className="absolute"
          data-eio-fluid={`${region.left},${region.top}`}
          key={`${region.left}-${region.top}`}
          style={{
            height: gui(region.height),
            left: gui(region.left),
            top: gui(region.top),
            width: gui(region.width),
          }}
        />
      ))}
    </>
  );
}

/**
 * 布局槽位渲染：电容槽补空电容底图，其余按 label 注入物品。
 */
export function EioMachineSlots({
  items,
  onSlotClick,
  slots,
}: {
  items: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
  slots: EioSlotRender[];
}) {
  return (
    <>
      {slots.map(slot => (
        <Fragment key={slot.label}>
          {slot.label.endsWith("-capacitor")
            ? (
                <EioSprite
                  height={16}
                  left={slot.left + 1}
                  name="sprites/widget/empty_capacitor_slot"
                  top={slot.top + 1}
                  width={16}
                />
              )
            : null}
          <ScreenItemSlot
            item={items[slot.label]}
            label={slot.label}
            left={slot.left}
            onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
            top={slot.top}
          />
        </Fragment>
      ))}
    </>
  );
}

/**
 * 8×8 范围增减小按钮（`sprites/buttons/plus_small` / `minus_small`）。
 */
export function EioRangeStepButton({
  icon,
  label,
  left,
  onClick,
  top,
}: {
  icon: "sprites/buttons/minus_small" | "sprites/buttons/plus_small";
  label: string;
  left: number;
  onClick?: () => void;
  top: number;
}) {
  return (
    <button
      aria-label={label}
      className="absolute p-0"
      data-eio-range-step={icon}
      onClick={onClick}
      style={{
        background: "transparent",
        border: 0,
        cursor: "pointer",
        height: gui(8),
        left: gui(left),
        padding: 0,
        position: "absolute",
        top: gui(top),
        width: gui(8),
      }}
      title={label}
      type="button"
    >
      <EioSprite height={8} left={0} name={icon} top={0} width={8} />
    </button>
  );
}
