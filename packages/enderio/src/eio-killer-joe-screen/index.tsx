import type { ScreenSlot } from "@tennantite/ui";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioKillerJoeScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
}

/**
 * 杀戮乔（176×166，coords from screen/killer_joe pixel inspection (upstream Screen unavailable at pinned commit)）：食物槽与 18×48 流体表。
 */
export function EioKillerJoeScreen({
  className,
  items,
  onSlotClick,
}: EioKillerJoeScreenProps) {
  const layout = EIO_MACHINES.killerJoe;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="killerJoe"
      player={layout.player}
      title={undefined}
      width={layout.width}
    >
      {layout.fluids ? <EioFluidRegions regions={layout.fluids} /> : null}
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
