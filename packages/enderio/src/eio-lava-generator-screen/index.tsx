import type { ScreenSlot } from "@tennantite/ui";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioLavaGeneratorScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  items?: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
}

/**
 * 岩浆发电机（176×166，coords from screen/lava_generator pixel inspection (upstream Screen unavailable at pinned commit)）：66×60 岩浆槽、16×52 流体表与 9×42 能量条。
 */
export function EioLavaGeneratorScreen({
  className,
  energy,
  items,
  onSlotClick,
}: EioLavaGeneratorScreenProps) {
  const layout = EIO_MACHINES.lavaGenerator;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="lavaGenerator"
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
