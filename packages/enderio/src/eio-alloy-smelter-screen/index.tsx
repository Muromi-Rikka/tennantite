import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModProgress } from "@tennantite/mods-core";
import { ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";

import type { EioAlloySmelterMode, EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_ALLOY_MODE_LABELS, EIO_REDSTONE_LABELS, eioAlloyModeIcon, eioNextAlloyMode, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_ALLOY_SMELTER_BACKGROUNDS, EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";
import { EioSprite } from "../eio-sprite/index";

export interface EioAlloySmelterScreenProps {
  /**
   * 电容槽
   */
  capacitor?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  inputs?: Array<null | ScreenSlot>;
  mode?: EioAlloySmelterMode;
  onIoConfig?: () => void;
  onModeChange?: (mode: EioAlloySmelterMode) => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  output?: ScreenSlot;
  /**
   * 双火焰进度共用 0..1
   */
  progress?: number;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
  title?: ReactNode;
}

/**
 * 合金炉（`AlloySmelterScreen` 176×208）：三种模式背景、3 输入 + 输出、
 * 双火焰进度、18×52 能量条、状态 / 模式 / 红石 / IO 按钮。
 */
export function EioAlloySmelterScreen({
  capacitor,
  className,
  energy,
  inputs = [],
  mode = "all",
  onIoConfig,
  onModeChange,
  onRedstoneChange,
  onSlotClick,
  output,
  progress = 0,
  redstone = "always_active",
  state = "idle",
  title,
}: EioAlloySmelterScreenProps) {
  const layout = EIO_MACHINES.alloySmelter;
  const items: Record<string, ScreenSlot> = {
    "alloy-smelter-capacitor": capacitor,
    "alloy-smelter-input-0": inputs[0],
    "alloy-smelter-input-1": inputs[1],
    "alloy-smelter-input-2": inputs[2],
    "alloy-smelter-output": output,
  };

  return (
    <EioMachineScreen
      background={EIO_ALLOY_SMELTER_BACKGROUNDS[mode]}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="alloySmelter"
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
          label={`合金炉进度 ${index + 1}`}
          left={entry.left}
          progress={progress}
          top={entry.top}
          width={entry.width}
        />
      ))}
      {layout.state
        ? <EioMachineStateIcon left={layout.state.left} state={state} top={layout.state.top} />
        : null}
      <EioIconButton
        icon={eioAlloyModeIcon(mode)}
        label="熔炼模式"
        left={layout.mode?.left ?? 0}
        onClick={() => { onModeChange?.(eioNextAlloyMode(mode)); }}
        title={`熔炼模式：${EIO_ALLOY_MODE_LABELS[mode]}`}
        top={layout.mode?.top ?? 0}
      />
      <EioIconButton
        icon={eioRedstoneIcon(redstone)}
        label="红石控制"
        left={layout.redstone.left}
        onClick={() => { onRedstoneChange?.(eioNextRedstone(redstone)); }}
        title={`红石控制：${EIO_REDSTONE_LABELS[redstone]}`}
        top={layout.redstone.top}
      />
      <EioIconButton
        icon="sprites/buttons/io_config"
        label="IO 配置"
        left={layout.io.left}
        onClick={onIoConfig}
        top={layout.io.top}
      />
      {layout.slots.map(slot => (
        <Fragment key={slot.label}>
          {slot.label.endsWith("-capacitor")
            ? (
                <EioSprite
                  height={16}
                  left={slot.left + 1}
                  name="sprites/widget/empty_capacitor_slot"
                  top={slot.top + 1}
                  width={16}
                />
              )
            : null}
          <ScreenItemSlot
            item={items[slot.label]}
            label={slot.label}
            left={slot.left}
            onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
            top={slot.top}
          />
        </Fragment>
      ))}
    </EioMachineScreen>
  );
}
