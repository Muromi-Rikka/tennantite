import type { ScreenSlot } from "@tennantite/ui";
import type { EioRedstoneControl } from "../eio-machine-layout";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots, EioRangeStepButton } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioXpVacuumScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  onRangeDecrease?: () => void;
  onRangeIncrease?: () => void;
  onRangeToggle?: (isVisible: boolean) => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  rangeVisible?: boolean;
  redstone?: EioRedstoneControl;
}

/**
 * 经验真空机（176×166）：32×32 经验流体区、范围控件与红石控制。
 */
export function EioXpVacuumScreen({
  className,
  items,
  onRangeDecrease,
  onRangeIncrease,
  onRangeToggle,
  onRedstoneChange,
  onSlotClick,
  rangeVisible = false,
  redstone = "always_active",
}: EioXpVacuumScreenProps) {
  const layout = EIO_MACHINES.xpVacuum;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="xpVacuum"
      player={layout.player}
      title={undefined}
      width={layout.width}
    >
      {layout.fluids ? <EioFluidRegions regions={layout.fluids} /> : null}
      <EioIconButton
        icon={rangeVisible ? "sprites/icon/range_enable" : "sprites/icon/range_disable"}
        label="范围显示"
        left={154}
        onClick={() => { onRangeToggle?.(!rangeVisible); }}
        title={rangeVisible ? "范围：显示" : "范围：隐藏"}
        top={34}
      />
      <EioRangeStepButton
        icon="sprites/buttons/plus_small"
        label="扩大范围"
        left={144}
        onClick={onRangeIncrease}
        top={34}
      />
      <EioRangeStepButton
        icon="sprites/buttons/minus_small"
        label="缩小范围"
        left={144}
        onClick={onRangeDecrease}
        top={42}
      />
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
