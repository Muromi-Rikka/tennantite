import type { ScreenSlot } from "@tennantite/ui";
import { ModProgress } from "@tennantite/mods-core";
import { ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";

import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioExperienceBar } from "../eio-experience-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";
import { EioSprite } from "../eio-sprite/index";

export interface EioSoulBinderScreenProps {
  capacitor?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  experience?: { level: number; progress: number };
  inputOther?: ScreenSlot;
  inputSoul?: ScreenSlot;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  outputs?: Array<null | ScreenSlot>;
  progress?: number;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
}

/**
 * 灵魂绑定器（176×166）：灵魂 / 材料输入、双输出、24×17 横向进度、
 * 65×5 经验条与 9×42 能量条。
 */
export function EioSoulBinderScreen({
  capacitor,
  className,
  energy,
  experience = { level: 0, progress: 0 },
  inputOther,
  inputSoul,
  onIoConfig,
  onRedstoneChange,
  onSlotClick,
  outputs = [],
  progress = 0,
  redstone = "always_active",
  state = "idle",
}: EioSoulBinderScreenProps) {
  const layout = EIO_MACHINES.soulBinder;
  const items: Record<string, ScreenSlot> = {
    "soul-binder-capacitor": capacitor,
    "soul-binder-input-other": inputOther,
    "soul-binder-input-soul": inputSoul,
    "soul-binder-output-0": outputs[0],
    "soul-binder-output-1": outputs[1],
  };

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="soulBinder"
      player={layout.player}
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
          label="灵魂绑定器进度"
          left={entry.left}
          progress={progress}
          top={entry.top}
          width={entry.width}
        />
      ))}
      {layout.experience
        ? (
            <EioExperienceBar
              left={layout.experience.left}
              level={experience.level}
              progress={experience.progress}
              top={layout.experience.top}
            />
          )
        : null}
      {layout.state
        ? <EioMachineStateIcon left={layout.state.left} state={state} top={layout.state.top} />
        : null}
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
