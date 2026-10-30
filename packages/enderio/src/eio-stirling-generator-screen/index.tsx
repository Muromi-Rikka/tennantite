import type { ScreenSlot } from "@tennantite/ui";
import { gui } from "@tennantite/ui";

import type { EioRedstoneControl } from "../eio-machine-layout";
import type { EioMachineState } from "../eio-machine-state/index";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioMachineState as EioMachineStateIcon } from "../eio-machine-state/index";
import { EIO_TEXT_COLOR } from "../eio-metrics";
import { EioProgresses } from "../eio-progresses/index";

export interface EioStirlingGeneratorScreenProps {
  /**
   * 燃烧进度 0..1
   */
  burn?: number;
  capacitor?: ScreenSlot;
  capacitorInstalled?: boolean;
  className?: string;
  efficiency?: number;
  energy?: { max: number; value: number };
  fuel?: ScreenSlot;
  generating?: number;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  redstone?: EioRedstoneControl;
  state?: EioMachineState;
}

/**
 * 斯特林发电机（176×166）：燃料槽、14×14 燃烧进度、9×42 能量条、
 * 产能 / 效率文本与右侧控件。
 */
export function EioStirlingGeneratorScreen({
  burn = 0,
  capacitor,
  capacitorInstalled = true,
  className,
  efficiency = 0,
  energy,
  fuel,
  generating = 0,
  onIoConfig,
  onRedstoneChange,
  onSlotClick,
  redstone = "always_active",
  state = "idle",
}: EioStirlingGeneratorScreenProps) {
  const layout = EIO_MACHINES.stirlingGenerator;
  const items: Record<string, ScreenSlot> = {
    "stirling-generator-capacitor": capacitor,
    "stirling-generator-fuel": fuel,
  };

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="stirlingGenerator"
      player={layout.player}
      width={layout.width}
    >
      {energy && layout.energy
        ? (
            <EioEnergyBar
              capacitorInstalled={capacitorInstalled}
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
        label="斯特林发电机燃烧进度"
        progress={burn}
        progresses={layout.progresses}
      />
      <span
        className="absolute font-mc mc-text whitespace-pre"
        style={{
          color: EIO_TEXT_COLOR,
          left: 0,
          right: 0,
          textAlign: "center",
          top: gui(9),
        }}
      >
        {`产能 ${generating.toFixed(2)} µI/t`}
      </span>
      {capacitorInstalled
        ? (
            <span
              className="absolute font-mc mc-text whitespace-pre"
              style={{
                color: EIO_TEXT_COLOR,
                left: 0,
                right: 0,
                textAlign: "center",
                top: gui(20),
              }}
            >
              {`效率 ${Math.trunc(efficiency)}%`}
            </span>
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
      <EioMachineSlots items={items} onSlotClick={onSlotClick} slots={layout.slots} />
    </EioMachineScreen>
  );
}
