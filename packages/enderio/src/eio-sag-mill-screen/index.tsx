import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModProgress } from "@tennantite/mods-core";
import { ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";

import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioGrindingBall } from "../eio-grinding-ball/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";
import { EioSprite } from "../eio-sprite/index";

export interface EioSagMillScreenProps {
  capacitor?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  grindingBall?: { durability: number };
  grindingBallSlot?: ScreenSlot;
  input?: ScreenSlot;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  outputs?: Array<null | ScreenSlot>;
  progress?: number;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
  title?: ReactNode;
}

/**
 * SAG 磨粉机（176×208）：输入、4 输出、研磨球槽与 4×16 耐久条、
 * 16×24 竖向进度、能量与右侧控件。
 */
export function EioSagMillScreen({
  capacitor,
  className,
  energy,
  grindingBall,
  grindingBallSlot,
  input,
  onIoConfig,
  onRedstoneChange,
  onSlotClick,
  outputs = [],
  progress = 0,
  redstone = "always_active",
  state = "idle",
  title,
}: EioSagMillScreenProps) {
  const layout = EIO_MACHINES.sagMill;
  const items: Record<string, ScreenSlot> = {
    "sag-mill-capacitor": capacitor,
    "sag-mill-grinding-ball": grindingBallSlot,
    "sag-mill-input": input,
    "sag-mill-output-0": outputs[0],
    "sag-mill-output-1": outputs[1],
    "sag-mill-output-2": outputs[2],
    "sag-mill-output-3": outputs[3],
  };

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      labels={layout.labels}
      machine="sagMill"
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
      {layout.progresses.map(entry => (
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
          label="磨粉机进度"
          left={entry.left}
          progress={progress}
          top={entry.top}
          width={entry.width}
        />
      ))}
      {grindingBall && layout.grindingBall
        ? (
            <EioGrindingBall
              durability={grindingBall.durability}
              left={layout.grindingBall.left}
              top={layout.grindingBall.top}
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
