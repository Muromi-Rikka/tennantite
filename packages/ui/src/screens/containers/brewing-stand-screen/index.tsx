import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { CroppedProgress } from "../screen-parts";
import { ScreenItemSlot } from "../screen-slot";

const BOTTLE_POSITIONS = [
  [55, 50],
  [78, 57],
  [101, 50],
] as const;

export interface BrewingStandScreenProps {
  blazeFuel?: ScreenSlot;
  bottles?: ScreenSlot[];
  brewProgress?: number;
  className?: string;
  /**
  * 燃料剩余 0..1
  */
  fuelProgress?: number;
  ingredient?: ScreenSlot;
  title?: ReactNode;
}

/**
 * 酿造台界面（规格 §6）：`container/brewing_stand.png` 176×166。
 */
export function BrewingStandScreen({
  blazeFuel,
  bottles = [],
  brewProgress = 0,
  className,
  fuelProgress = 0,
  ingredient,
  title,
}: BrewingStandScreenProps) {
  return (
    <ScreenPanel
      background="container/brewing_stand.png"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <ScreenItemSlot
        ghost="sprites/container/slot/brewing_fuel.png"
        item={blazeFuel}
        label="brewing-fuel"
        left={16}
        top={16}
      />
      <ScreenItemSlot item={ingredient} label="brewing-ingredient" left={79} top={16} />
      {BOTTLE_POSITIONS.map(([left, top], index) => (
        <ScreenItemSlot
          ghost="sprites/container/slot/potion.png"
          item={bottles[index]}
          key={left}
          label={`brewing-bottle-${index}`}
          left={left}
          top={top}
        />
      ))}
      <CroppedProgress
        direction="up"
        height={29}
        label="酿造进度"
        left={63}
        name="sprites/container/brewing_stand/bubbles.png"
        progress={brewProgress}
        top={14}
        width={12}
      />
      <CroppedProgress
        height={28}
        left={97}
        name="sprites/container/brewing_stand/brew_progress.png"
        progress={brewProgress}
        top={16}
        width={9}
      />
      <CroppedProgress
        height={4}
        left={60}
        name="sprites/container/brewing_stand/fuel_length.png"
        progress={fuelProgress}
        top={44}
        width={18}
      />
      <PlayerInventory bare />
    </ScreenPanel>
  );
}
