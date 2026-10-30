import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";
import { EioProgresses } from "../eio-progresses/index";

export interface EioSliceAndSpliceScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  items?: Record<string, ScreenSlot | undefined>;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  progress?: number;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
  title?: ReactNode;
}

/**
 * 切片拼接机（176×208）：斧 / 剪刀工具槽、6 输入 + 输出、24×16 横向进度与 18×52 能量条。
 */
export function EioSliceAndSpliceScreen({
  className,
  energy,
  items,
  onIoConfig,
  onRedstoneChange,
  onSlotClick,
  progress = 0,
  redstone = "always_active",
  state = "idle",
  title,
}: EioSliceAndSpliceScreenProps) {
  const layout = EIO_MACHINES.sliceAndSplice;
  const slots = layout.slots;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="sliceAndSplice"
      player={layout.player}
      title={title ?? layout.title}
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
      <EioProgresses
        label="切片拼接机进度"
        labels={layout.progresses.length > 1
          ? layout.progresses.map((_, index) => `切片拼接机进度 ${index + 1}`)
          : undefined}
        progress={progress}
        progresses={layout.progresses}
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
