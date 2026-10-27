import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface GrindstoneScreenProps {
  additional?: ScreenSlot;
  className?: string;
  error?: boolean;
  hotbarItems?: ScreenSlot[];
  input?: ScreenSlot;
  onSlotClick?: (area: "hotbar" | "input" | "main" | "output", index: number) => void;
  output?: ScreenSlot;
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 砂轮界面（规格 §6）：`container/grindstone.png` 176×166。
 */
export function GrindstoneScreen({
  additional,
  className,
  error = false,
  hotbarItems = [],
  input,
  onSlotClick,
  output,
  selectedIndex,
  title,
}: GrindstoneScreenProps) {
  return (
    <ScreenPanel
      background="container/grindstone.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        item={input}
        label="grindstone-input"
        left={48}
        onActivate={onSlotClick ? () => onSlotClick("input", 0) : undefined}
        top={18}
      />
      <ScreenItemSlot
        item={additional}
        label="grindstone-additional"
        left={48}
        onActivate={onSlotClick ? () => onSlotClick("input", 1) : undefined}
        top={39}
      />
      <ScreenItemSlot
        item={output}
        label="grindstone-output"
        left={128}
        onActivate={onSlotClick ? () => onSlotClick("output", 0) : undefined}
        top={33}
      />
      {error
        ? (
            <GuiSprite
              className="absolute"
              height={21}
              name="sprites/container/grindstone/error.png"
              style={{ left: gui(92), top: gui(31) }}
              width={28}
            />
          )
        : null}
      <PlayerInventory
        bare
        hotbarItems={hotbarItems}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
      />
    </ScreenPanel>
  );
}
