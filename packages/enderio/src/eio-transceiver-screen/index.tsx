import type { EioSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";

import { EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";

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
  return (
    <EioMachineScreen
      background={BACKGROUNDS[mode]}
      backgroundHeight={166}
      className={className}
      height={166}
      machine="transceiver"
      player={{ hotbarY: 144, left: 46, top: 86 }}
      width={256}
    >
      <EioMachineSlots items={items ?? {}} onSlotClick={onSlotClick} slots={CHANNEL_SLOTS} />
    </EioMachineScreen>
  );
}
