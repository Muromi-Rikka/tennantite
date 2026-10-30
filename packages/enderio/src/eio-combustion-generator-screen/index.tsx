import type { ScreenSlot } from "@tennantite/ui";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioCombustionGeneratorScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  items?: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
}

/**
 * 燃烧发电机（200×166，coords from screen/combustion_gen pixel inspection (upstream Screen unavailable at pinned commit)）：双 16×48 流体表与 9×42 能量条。
 */
export function EioCombustionGeneratorScreen({
  className,
  energy,
  items,
  onSlotClick,
}: EioCombustionGeneratorScreenProps) {
  const layout = EIO_MACHINES.combustionGenerator;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="combustionGenerator"
      player={layout.player}
      title={undefined}
      width={layout.width}
    >
      {energy && layout.energy
        ? (
            <EioEnergyBar
              height={layout.energy.height}
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
              variant={layout.energy.variant}
              width={layout.energy.width}
            />
          )
        : null}
      {layout.fluids ? <EioFluidRegions regions={layout.fluids} /> : null}
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
