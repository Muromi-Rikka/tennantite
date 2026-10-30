import type { ScreenSlot } from "@tennantite/ui";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioBufferScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
}

/**
 * 缓冲器（252×166，coords from screen/buffer_full pixel inspection (upstream Screen unavailable at pinned commit)）：右侧 2×3 缓冲槽与玩家背包。
 */
export function EioBufferScreen({
  className,
  items,
  onSlotClick,
}: EioBufferScreenProps) {
  const layout = EIO_MACHINES.buffer;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="buffer"
      player={layout.player}
      title={undefined}
      width={layout.width}
    >
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
