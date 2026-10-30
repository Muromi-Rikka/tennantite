import { EioIconButton } from "../eio-icon-button/index";
import { EioMachineScreen } from "../eio-machine-screen/index";

// coords from screen/dialing_device pixel inspection (upstream Screen unavailable at pinned commit)
const BUTTONS = [
  { label: "频率操作 1", left: 152, top: 46 },
  { label: "频率操作 2", left: 152, top: 83 },
] as const;

export interface EioDialingDeviceScreenProps {
  className?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

/**
 * 拨号装置（176×230，coords from screen/dialing_device pixel inspection
 * (upstream Screen unavailable at pinned commit)）：整幅背景、频率操作按钮 ×2
 * 与玩家背包。
 */
export function EioDialingDeviceScreen({
  className,
  onPrimaryAction,
  onSecondaryAction,
}: EioDialingDeviceScreenProps) {
  const handlers = [onPrimaryAction, onSecondaryAction];

  return (
    <EioMachineScreen
      background="screen/dialing_device"
      backgroundHeight={230}
      className={className}
      height={230}
      machine="dialingDevice"
      player={{ hotbarY: 196, left: 7, top: 138 }}
      width={176}
    >
      {BUTTONS.map((button, index) => (
        <EioIconButton
          key={button.label}
          label={button.label}
          left={button.left}
          onClick={handlers[index]}
          top={button.top}
        />
      ))}
    </EioMachineScreen>
  );
}
