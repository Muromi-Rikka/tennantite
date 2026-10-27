import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { GuiSprite } from "../../../containers/gui-sprite/index";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface SmithingScreenProps {
  addition?: ScreenSlot;
  base?: ScreenSlot;
  className?: string;
  error?: boolean;
  hotbarItems?: ScreenSlot[];
  onSlotClick?: (
    area: "addition" | "base" | "hotbar" | "main" | "output" | "template",
    index: number,
  ) => void;
  output?: ScreenSlot;
  selectedIndex?: number;
  template?: ScreenSlot;
  title?: ReactNode;
}

/**
 * 锻造台界面（规格 §6）：`container/smithing.png` 176×166。
 */
export function SmithingScreen({
  addition,
  base,
  className,
  error = false,
  hotbarItems = [],
  onSlotClick,
  output,
  selectedIndex,
  template,
  title,
}: SmithingScreenProps) {
  return (
    <ScreenPanel
      background="container/smithing.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        ghost="sprites/container/slot/smithing_template_armor_trim.png"
        item={template}
        label="smithing-template"
        left={7}
        onActivate={onSlotClick ? () => onSlotClick("template", 0) : undefined}
        top={47}
      />
      <ScreenItemSlot
        ghost="sprites/container/slot/chestplate.png"
        item={base}
        label="smithing-base"
        left={25}
        onActivate={onSlotClick ? () => onSlotClick("base", 0) : undefined}
        top={47}
      />
      <ScreenItemSlot
        ghost="sprites/container/slot/ingot.png"
        item={addition}
        label="smithing-addition"
        left={43}
        onActivate={onSlotClick ? () => onSlotClick("addition", 0) : undefined}
        top={47}
      />
      <ScreenItemSlot
        item={output}
        label="smithing-output"
        left={97}
        onActivate={onSlotClick ? () => onSlotClick("output", 0) : undefined}
        top={47}
      />
      {error
        ? (
            <GuiSprite
              className="absolute"
              height={21}
              name="sprites/container/smithing/error.png"
              style={{ left: gui(65), top: gui(46) }}
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
