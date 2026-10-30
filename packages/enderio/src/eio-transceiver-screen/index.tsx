import type { EioSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import { PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { Fragment } from "react";

import { EioSprite } from "../eio-sprite/index";

export type EioTransceiverMode = "channel_select" | "general";

export interface EioTransceiverScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  mode?: EioTransceiverMode;
  onSlotClick?: (label: string) => void;
}

// coords from screen/transceiver_general pixel inspection (upstream Screen unavailable at pinned commit)
const CHANNEL_COLUMNS = [53, 71, 89, 107, 130, 148, 166, 184];
const CHANNEL_SLOTS = CHANNEL_COLUMNS.flatMap((left, column) =>
  [0, 1].map(row => ({
    label: `transceiver-channel-${row * 8 + column}`,
    left,
    top: 29 + row * 18,
  })),
);

const BACKGROUNDS: Record<EioTransceiverMode, EioSpriteName> = {
  channel_select: "screen/transceiver_channel_select",
  general: "screen/transceiver_general",
};

/**
 * 传输器（256×166，coords from screen/transceiver_general pixel inspection
 * (upstream Screen unavailable at pinned commit)）：general / channel_select
 * 双背景，8×2 信道槽位与玩家背包。左侧 x=10/22 起的两条 11×60 竖条是背景贴图
 * 自带的计量槽，不是物品槽。
 */
export function EioTransceiverScreen({
  className,
  items,
  mode = "general",
  onSlotClick,
}: EioTransceiverScreenProps) {
  const itemsMap = items ?? {};

  return (
    <ScreenPanel
      backgroundClassName="bg-transparent"
      className={className}
      data-eio-machine="transceiver"
      height={166}
      width={256}
    >
      <EioSprite
        crop={{ height: 166, width: 256, x: 0, y: 0 }}
        height={166}
        name={BACKGROUNDS[mode]}
        width={256}
      />
      {CHANNEL_SLOTS.map(slot => (
        <Fragment key={slot.label}>
          <ScreenItemSlot
            item={itemsMap[slot.label]}
            label={slot.label}
            left={slot.left}
            onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
            top={slot.top}
          />
        </Fragment>
      ))}
      <PlayerInventory
        bare
        hotbarY={144}
        x={46}
        y={86}
      />
    </ScreenPanel>
  );
}
