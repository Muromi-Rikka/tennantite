import type { ScreenSlot } from "@tennantite/ui";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioProgresses } from "../eio-progresses/index";

export interface EioWeatherObeliskScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  onSlotClick?: (label: string) => void;
  progress?: number;
}

/**
 * 天气方尖碑（176×166）：16×63 流体表与 12×32 竖向进度（无槽位与能量）。
 */
export function EioWeatherObeliskScreen({
  className,
  items,
  onSlotClick,
  progress = 0,
}: EioWeatherObeliskScreenProps) {
  const layout = EIO_MACHINES.weatherObelisk;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="weatherObelisk"
      player={layout.player}
      title={undefined}
      width={layout.width}
    >
      {layout.fluids ? <EioFluidRegions regions={layout.fluids} /> : null}
      <EioProgresses
        label="天气方尖碑进度"
        labels={layout.progresses.length > 1
          ? layout.progresses.map((_, index) => `天气方尖碑进度 ${index + 1}`)
          : undefined}
        progress={progress}
        progresses={layout.progresses}
      />
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
