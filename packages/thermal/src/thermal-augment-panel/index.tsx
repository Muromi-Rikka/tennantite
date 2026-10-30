import type { ScreenSlot } from "@tennantite/ui";
import { gui, padSlots, ScreenItemSlot } from "@tennantite/ui";

import { THERMAL_AUGMENT_PANEL, THERMAL_AUGMENT_TAB, THERMAL_TEXT_COLOR } from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalAugmentPanelProps {
  augments?: ScreenSlot[];
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  onToggle?: () => void;
  open?: boolean;
}

/**
 * Thermal 强化页签与 9 宫格强化面板（视觉复刻上游 AugmentPanel）。
 */
export function ThermalAugmentPanel({
  augments = [],
  onSlotClick,
  onToggle,
  open = false,
}: ThermalAugmentPanelProps) {
  const visibleAugments = Math.min(augments.length, THERMAL_AUGMENT_PANEL.slots.count);
  return (
    <>
      <button
        aria-expanded={open}
        aria-label="强化"
        className="absolute cursor-pointer border-0 bg-transparent p-0"
        onClick={onToggle}
        style={{
          height: gui(THERMAL_AUGMENT_TAB.height),
          left: gui(THERMAL_AUGMENT_TAB.left),
          top: gui(THERMAL_AUGMENT_TAB.top),
          width: gui(THERMAL_AUGMENT_TAB.width),
        }}
        type="button"
      >
        <ThermalSprite height={16} name="icons/icon_augment" width={16} />
      </button>
      {open
        ? (
            <div
              data-thermal-augment-panel=""
              style={{
                height: gui(THERMAL_AUGMENT_PANEL.height),
                left: gui(THERMAL_AUGMENT_TAB.left),
                position: "absolute",
                top: 0,
                width: gui(THERMAL_AUGMENT_PANEL.width),
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  borderImageOutset: "0",
                  borderImageSlice: "4 fill",
                  borderImageSource: "var(--mc-thermal-elements-panel-right)",
                  borderImageWidth: `${gui(4)} ${gui(4)} ${gui(4)} ${gui(4)}`,
                  borderStyle: "solid",
                  borderWidth: gui(4),
                  boxSizing: "border-box",
                  height: "100%",
                  imageRendering: "pixelated",
                  position: "absolute",
                  width: "100%",
                }}
              />
              <span
                className="absolute font-mc mc-text"
                style={{
                  color: THERMAL_TEXT_COLOR,
                  left: gui(THERMAL_AUGMENT_PANEL.titleLeft),
                  top: gui(THERMAL_AUGMENT_PANEL.titleTop),
                }}
              >
                {THERMAL_AUGMENT_PANEL.title}
              </span>
              <ThermalSprite
                height={THERMAL_AUGMENT_PANEL.icon.size}
                left={THERMAL_AUGMENT_PANEL.icon.left}
                name="icons/icon_augment"
                top={THERMAL_AUGMENT_PANEL.icon.top}
                width={THERMAL_AUGMENT_PANEL.icon.size}
              />
              <div
                aria-hidden="true"
                style={{
                  backgroundColor: THERMAL_AUGMENT_PANEL.borderColor,
                  height: gui(THERMAL_AUGMENT_PANEL.border.height),
                  left: gui(THERMAL_AUGMENT_PANEL.border.left),
                  position: "absolute",
                  top: gui(THERMAL_AUGMENT_PANEL.border.top),
                  width: gui(THERMAL_AUGMENT_PANEL.border.width),
                }}
              />
              {padSlots(augments, visibleAugments).map((item, index) => {
                const augmentLeft = THERMAL_AUGMENT_PANEL.slots.origin.left + (index % 3) * THERMAL_AUGMENT_PANEL.slots.gap;
                const augmentTop = THERMAL_AUGMENT_PANEL.slots.origin.top + Math.floor(index / 3) * THERMAL_AUGMENT_PANEL.slots.gap;
                return (
                  <ScreenItemSlot
                    frame
                    frameClassName="mc-tex-slot"
                    item={item}
                    key={`${augmentLeft}-${augmentTop}`}
                    label={`augment-${index}`}
                    left={augmentLeft}
                    onActivate={onSlotClick ? () => onSlotClick(`augment-${index}`, item) : undefined}
                    top={augmentTop}
                  />
                );
              })}
            </div>
          )
        : null}
    </>
  );
}
