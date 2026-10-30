import { EioIconButton } from "../eio-icon-button/index";
import { EioMachineScreen } from "../eio-machine-screen/index";

// coords from screen/tele_pad pixel inspection (upstream Screen unavailable at pinned commit)
const BUTTONS = [
  { label: "传送操作 1", left: 152, top: 46 },
  { label: "传送操作 2", left: 152, top: 83 },
] as const;

export interface EioTelePadScreenProps {
  className?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

/**
 * 传送板（218×230，coords from screen/tele_pad pixel inspection
 * (upstream Screen unavailable at pinned commit)）：整幅背景（含右侧 26×124
 * 光柱区）、传送操作按钮 ×2 与玩家背包。
 */
export function EioTelePadScreen({
  className,
  onPrimaryAction,
  onSecondaryAction,
}: EioTelePadScreenProps) {
  const handlers = [onPrimaryAction, onSecondaryAction];

  return (
    <EioMachineScreen
      background="screen/tele_pad"
      backgroundHeight={230}
      className={className}
      height={230}
      machine="telePad"
      player={{ hotbarY: 196, left: 7, top: 138 }}
      width={218}
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
