import type { ScreenSlot } from "@tennantite/ui";
import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";

export interface EioImpulseHopperScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  items?: Record<string, ScreenSlot | undefined>;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
}

/**
 * 脉冲漏斗（176×166）：6 输入 / 6 幽影 / 6 输出槽、9×47 能量条与右侧控件。
 */
export function EioImpulseHopperScreen({
  className,
  energy,
  items,
  onIoConfig,
  onRedstoneChange,
  onSlotClick,
  redstone = "always_active",
  state = "idle",
}: EioImpulseHopperScreenProps) {
  const layout = EIO_MACHINES.impulseHopper;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="impulseHopper"
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
      {layout.state
        ? <EioMachineStateIcon left={layout.state.left} state={state} top={layout.state.top} />
        : null}
      <EioIconButton
        icon={eioRedstoneIcon(redstone)}
        label="红石控制"
        left={layout.redstone?.left ?? 0}
        onClick={() => { onRedstoneChange?.(eioNextRedstone(redstone)); }}
        title={`红石控制：${EIO_REDSTONE_LABELS[redstone]}`}
        top={layout.redstone?.top ?? 0}
      />
      <EioIconButton
        icon="sprites/buttons/io_config"
        label="IO 配置"
        left={layout.io?.left ?? 0}
        onClick={onIoConfig}
        top={layout.io?.top ?? 0}
      />
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
