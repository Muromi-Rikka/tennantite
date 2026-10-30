import type { ScreenSlot } from "@tennantite/ui";
import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineSlots, EioRangeStepButton } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";

export interface EioWirelessChargerScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  items?: Record<string, ScreenSlot | undefined>;
  onIoConfig?: () => void;
  onRangeDecrease?: () => void;
  onRangeIncrease?: () => void;
  onRangeToggle?: (isVisible: boolean) => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  rangeVisible?: boolean;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
}

/**
 * 无线充电器（176×166）：电容槽、9×42 能量条、范围控件与状态。
 */
export function EioWirelessChargerScreen({
  className,
  energy,
  items,
  onIoConfig,
  onRangeDecrease,
  onRangeIncrease,
  onRangeToggle,
  onRedstoneChange,
  onSlotClick,
  rangeVisible = false,
  redstone = "always_active",
  state = "idle",
}: EioWirelessChargerScreenProps) {
  const layout = EIO_MACHINES.wirelessCharger;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="wirelessCharger"
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
      <EioIconButton
        icon={rangeVisible ? "sprites/icon/range_enable" : "sprites/icon/range_disable"}
        label="范围显示"
        left={154}
        onClick={() => { onRangeToggle?.(!rangeVisible); }}
        title={rangeVisible ? "范围：显示" : "范围：隐藏"}
        top={50}
      />
      <EioRangeStepButton
        icon="sprites/buttons/plus_small"
        label="扩大范围"
        left={144}
        onClick={onRangeIncrease}
        top={51}
      />
      <EioRangeStepButton
        icon="sprites/buttons/minus_small"
        label="缩小范围"
        left={144}
        onClick={onRangeDecrease}
        top={59}
      />
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
