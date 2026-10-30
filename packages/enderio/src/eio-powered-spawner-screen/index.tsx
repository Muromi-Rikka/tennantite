import type { EioSpriteName } from "@tennantite/textures";
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

export type EioPoweredSpawnerMode = "capture" | "spawn";

export interface EioPoweredSpawnerScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  items?: Record<string, ScreenSlot | undefined>;
  mode?: EioPoweredSpawnerMode;
  onIoConfig?: () => void;
  onModeChange?: (mode: EioPoweredSpawnerMode) => void;
  onRangeToggle?: (isVisible: boolean) => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  progress?: number;
  rangeVisible?: boolean;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
  title?: ReactNode;
}

const MODE_LABELS: Record<EioPoweredSpawnerMode, string> = {
  capture: "捕获",
  spawn: "生成",
};

const MODE_BACKGROUNDS: Record<EioPoweredSpawnerMode, EioSpriteName> = {
  capture: "screen/powered_spawner_capture",
  spawn: "screen/powered_spawner_spawn",
};

const MODE_ICONS: Record<EioPoweredSpawnerMode, EioSpriteName> = {
  capture: "sprites/icon/powered_spawner_mode/capture",
  spawn: "sprites/icon/powered_spawner_mode/spawn",
};

const MODE_PROGRESS_SPRITES: Record<EioPoweredSpawnerMode, EioSpriteName> = {
  capture: "sprites/screen/powered_spawner/capture_progress",
  spawn: "sprites/screen/powered_spawner/spawn_progress",
};

/**
 * 刷怪笼（176×187）：生成 / 捕获双背景，生成 14×14 竖向 / 捕获 24×16 横向进度，
 * 18×52 能量条、模式与范围控件、状态 / 红石 / IO 按钮。
 */
export function EioPoweredSpawnerScreen({
  className,
  energy,
  items,
  mode = "spawn",
  onIoConfig,
  onModeChange,
  onRangeToggle,
  onRedstoneChange,
  onSlotClick,
  progress = 0,
  rangeVisible = false,
  redstone = "always_active",
  state = "idle",
  title,
}: EioPoweredSpawnerScreenProps) {
  const layout = EIO_MACHINES.poweredSpawner;
  const itemsMap = items ?? {};
  const nextMode = mode === "spawn" ? "capture" : "spawn";

  return (
    <EioMachineScreen
      background={MODE_BACKGROUNDS[mode]}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="poweredSpawner"
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
        label="刷怪笼进度"
        progresses={layout.progresses.filter(entry => entry.sprite === MODE_PROGRESS_SPRITES[mode])}
        progress={progress}
      />
      {layout.state
        ? <EioMachineStateIcon left={layout.state.left} state={state} top={layout.state.top} />
        : null}
      <EioIconButton
        icon={MODE_ICONS[mode]}
        label="刷怪模式"
        left={136}
        onClick={() => { onModeChange?.(nextMode); }}
        title={`刷怪模式：${MODE_LABELS[mode]}`}
        top={6}
      />
      <EioIconButton
        icon={rangeVisible ? "sprites/icon/range_enable" : "sprites/icon/range_disable"}
        label="范围显示"
        left={154}
        onClick={() => { onRangeToggle?.(!rangeVisible); }}
        title={rangeVisible ? "范围：显示" : "范围：隐藏"}
        top={24}
      />
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
      <EioMachineSlots items={itemsMap} onSlotClick={onSlotClick} slots={layout.slots} />
    </EioMachineScreen>
  );
}
