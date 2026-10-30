import type { EioSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots, EioRangeStepButton } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";

export interface EioNiardScreenProps {
  /**
  * 背景贴图（方尖碑四兄弟共用布局，仅贴图不同）
  */
  background?: EioSpriteName;
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
 * 泼洒器（176×166，与流体坦克同版式）：电容槽、充 / 排槽位、39×56 流体区与范围控件。
 */
export function EioNiardScreen({
  background = "screen/niard",
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
}: EioNiardScreenProps) {
  const layout = EIO_MACHINES.tank;
  const slots = layout.slots.filter(slot => ["tank-capacitor", "tank-fill-input", "tank-fill-output"].includes(slot.label));

  return (
    <EioMachineScreen
      background={background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="tank"
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
      {layout.fluids ? <EioFluidRegions regions={[...layout.fluids, { height: 56, left: 112, top: 28, width: 39 }]} /> : null}
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
