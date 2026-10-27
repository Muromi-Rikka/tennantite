import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface LoomScreenProps {
  banner?: ScreenSlot;
  className?: string;
  dye?: ScreenSlot;
  error?: boolean;
  hotbarItems?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "input" | "main" | "output", index: number) => void;
  output?: ScreenSlot;
  pattern?: ScreenSlot;
  patterns?: string[];
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 织布机界面（规格 §6）：`container/loom.png` 176×166。
 */
export function LoomScreen({
  banner,
  className,
  dye,
  error = false,
  hotbarItems = [],
  onSlotClick,
  output,
  pattern,
  patterns = [],
  selectedIndex,
  title,
}: LoomScreenProps) {
  return (
    <ScreenPanel
      background="container/loom.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        item={banner}
        label="loom-banner"
        left={12}
        onActivate={onSlotClick ? () => onSlotClick("input", 0) : undefined}
        top={25}
      />
      <ScreenItemSlot
        item={dye}
        label="loom-dye"
        left={32}
        onActivate={onSlotClick ? () => onSlotClick("input", 1) : undefined}
        top={25}
      />
      <ScreenItemSlot
        item={pattern}
        label="loom-pattern"
        left={22}
        onActivate={onSlotClick ? () => onSlotClick("input", 2) : undefined}
        top={44}
      />
      {patterns.slice(0, 4).map((name, index) => (
        <GuiSprite
          className="absolute"
          height={14}
          key={name}
          name={name as never}
          style={{ left: gui(56 + (index % 2) * 18), top: gui(20 + Math.floor(index / 2) * 18) }}
          width={14}
        />
      ))}
      <ScreenItemSlot
        item={output}
        label="loom-output"
        left={138}
        onActivate={onSlotClick ? () => onSlotClick("output", 0) : undefined}
        size={26}
        top={52}
      />
      {error
        ? (
            <GuiSprite
              className="absolute"
              height={26}
              name="sprites/container/loom/error.png"
              style={{ left: gui(108), top: gui(44) }}
              width={26}
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
