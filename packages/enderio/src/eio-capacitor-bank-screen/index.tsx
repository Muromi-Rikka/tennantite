import type { EioRedstoneControl } from "../eio-machine-layout";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";

export interface EioCapacitorBankScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  redstone?: EioRedstoneControl;
}

/**
 * 电容组（176×208 面板 / 176×166 背景）：9×68 能量条、红石与 IO 控件。
 */
export function EioCapacitorBankScreen({
  className,
  energy,
  onIoConfig,
  onRedstoneChange,
  redstone = "always_active",
}: EioCapacitorBankScreenProps) {
  const layout = EIO_MACHINES.capacitorBank;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="capacitorBank"
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
    </EioMachineScreen>
  );
}
