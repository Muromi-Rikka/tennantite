import type { ScreenSlot } from "@tennantite/ui";
import { ModProgress } from "@tennantite/mods-core";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioSprite } from "../eio-sprite/index";

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
      {layout.progresses.map((entry, index) => (
        <ModProgress
          direction={entry.direction}
          fill={(
            <EioSprite
              crop={entry.crop}
              height={entry.height}
              name={entry.sprite}
              width={entry.width}
            />
          )}
          height={entry.height}
          key={`${entry.sprite}-${entry.left}-${entry.top}`}
          label={`天气方尖碑进度${layout.progresses.length > 1 ? ` ${index + 1}` : ""}`}
          left={entry.left}
          progress={progress}
          top={entry.top}
          width={entry.width}
        />
      ))}
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
