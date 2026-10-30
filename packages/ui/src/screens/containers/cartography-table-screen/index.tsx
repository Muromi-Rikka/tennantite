import type { GuiSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export type CartographyOverlay = "duplicated" | "error" | "locked" | "map" | "scaled";

const OVERLAY_SPRITES: Record<CartographyOverlay, string> = {
  duplicated: "duplicated_map",
  error: "error",
  locked: "locked",
  map: "map",
  scaled: "scaled_map",
};

export interface CartographyTableScreenProps {
  additional?: ScreenSlot;
  className?: string;
  hotbarItems?: ScreenSlot[];
  input?: ScreenSlot;
  onSlotClick?: (area: "hotbar" | "input" | "main" | "output", index: number) => void;
  output?: ScreenSlot;
  overlay?: CartographyOverlay;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 制图台界面（规格 §6）：`container/cartography_table.png` 176×166。
 */
export function CartographyTableScreen({
  additional,
  className,
  hotbarItems = [],
  input,
  onSlotClick,
  output,
  overlay,
  selectedIndex,
  title,
}: CartographyTableScreenProps) {
  return (
    <ScreenPanel
      background="container/cartography_table.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        item={input}
        label="cartography-input"
        left={14}
        onActivate={onSlotClick ? () => onSlotClick("input", 0) : undefined}
        top={14}
      />
      <ScreenItemSlot
        item={additional}
        label="cartography-additional"
        left={14}
        onActivate={onSlotClick ? () => onSlotClick("input", 1) : undefined}
        top={51}
      />
      {overlay
        ? (
            <GuiSprite
              className="absolute"
              height={26}
              name={`sprites/container/cartography_table/${OVERLAY_SPRITES[overlay]}.png` as GuiSpriteName}
              style={{ left: gui(104), top: gui(48) }}
              width={26}
            />
          )
        : null}
      <ScreenItemSlot
        item={output}
        label="cartography-output"
        left={140}
        onActivate={onSlotClick ? () => onSlotClick("output", 0) : undefined}
        size={26}
        top={34}
      />
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
