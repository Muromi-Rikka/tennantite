import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineSlots, EioRangeStepButton } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";

export interface EioVacuumChestScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  onRangeDecrease?: () => void;
  onRangeIncrease?: () => void;
  onRangeToggle?: (isVisible: boolean) => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  rangeVisible?: boolean;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
  title?: ReactNode;
}

/**
 * 真空箱（176×206）：过滤槽 + 27 格收纳、范围控件与红石控制。
 */
export function EioVacuumChestScreen({
  className,
  items,
  onRangeDecrease,
  onRangeIncrease,
  onRangeToggle,
  onRedstoneChange,
  onSlotClick,
  rangeVisible = false,
  redstone = "always_active",
  state = "idle",
  title,
}: EioVacuumChestScreenProps) {
  const layout = EIO_MACHINES.vacuumChest;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="vacuumChest"
      player={layout.player}
      title={title ?? layout.title}
      width={layout.width}
    >
      <EioIconButton
        icon={rangeVisible ? "sprites/icon/range_enable" : "sprites/icon/range_disable"}
        label="范围显示"
        left={134}
        onClick={() => { onRangeToggle?.(!rangeVisible); }}
        title={rangeVisible ? "范围：显示" : "范围：隐藏"}
        top={105}
      />
      <EioRangeStepButton
        icon="sprites/buttons/plus_small"
        label="扩大范围"
        left={160}
        onClick={onRangeIncrease}
        top={86}
      />
      <EioRangeStepButton
        icon="sprites/buttons/minus_small"
        label="缩小范围"
        left={160}
        onClick={onRangeDecrease}
        top={94}
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
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={slots}
      />
    </EioMachineScreen>
  );
}
