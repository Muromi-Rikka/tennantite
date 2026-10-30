import type { ScreenSlot } from "@tennantite/ui";

import type { EioRedstoneControl } from "../eio-machine-layout";
import { EIO_REDSTONE_LABELS, eioNextRedstone, eioRedstoneIcon } from "../eio-controls";
import { EioIconButton } from "../eio-icon-button/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioFluidRegions, EioMachineSlots } from "../eio-machine-parts";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioProgresses } from "../eio-progresses/index";
import { EioSprite } from "../eio-sprite/index";

export interface EioVatScreenProps {
  className?: string;
  items?: Record<string, ScreenSlot | undefined>;
  /**
   * 输出桶倾倒（`DUMP_OUTPUT_TANK_BUTTON_ID`）
   */
  onDumpOutputTank?: () => void;
  onIoConfig?: () => void;
  onRedstoneChange?: (control: EioRedstoneControl) => void;
  onSlotClick?: (label: string) => void;
  /**
   * 输出流体转入输出桶（`MOVE_TO_OUTPUT_TANK_BUTTON_ID`）
   */
  onTransferOutputTank?: () => void;
  progress?: number;
  redstone?: EioRedstoneControl;
}

/**
 * 发酵桶（176×166）：双试剂槽、15×47 输入 / 输出流体表、发酵盖覆盖层、
 * 14×14 竖向进度与转移 / 倾倒按钮。
 */
export function EioVatScreen({
  className,
  items,
  onDumpOutputTank,
  onIoConfig,
  onRedstoneChange,
  onSlotClick,
  onTransferOutputTank,
  progress = 0,
  redstone = "always_active",
}: EioVatScreenProps) {
  const layout = EIO_MACHINES.vat;

  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      className={className}
      height={layout.height}
      machine="vat"
      player={layout.player}
      width={layout.width}
    >
      {layout.fluids ? <EioFluidRegions regions={layout.fluids} /> : null}
      <EioSprite
        height={28}
        left={76}
        name="sprites/vat_cover"
        top={34}
        width={26}
      />
      <EioProgresses
        label="发酵桶进度"
        progresses={layout.progresses}
        progress={progress}
      />
      <EioIconButton
        icon="sprites/buttons/move_fluid"
        label="转移输出流体"
        left={29}
        onClick={onTransferOutputTank}
        top={62}
      />
      <EioIconButton
        icon="sprites/buttons/void_fluid"
        label="倾倒输出流体"
        left={131}
        onClick={onDumpOutputTank}
        top={62}
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
      <EioMachineSlots
        items={items ?? {}}
        onSlotClick={onSlotClick}
        slots={layout.slots}
      />
    </EioMachineScreen>
  );
}
