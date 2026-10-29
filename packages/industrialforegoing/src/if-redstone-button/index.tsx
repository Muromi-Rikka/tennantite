import type { IfRedstoneMode } from "../if-markers";
import { IfIconButton } from "../if-icon-button/index";
import { IF_REDSTONE_LABELS, IF_REDSTONE_ORDER } from "../if-markers";
import { IF_REDSTONE } from "../if-metrics";

const REDSTONE_CROPS = ["redstoneIgnored", "redstoneNo", "redstoneYes", "redstoneOnce"] as const;

export interface IfRedstoneButtonProps {
  className?: string;
  onClick?: () => void;
  value: IfRedstoneMode;
}

/**
 * 红石模式按钮 @ (154,84)：IGNORE → NO_REDSTONE → WITH_REDSTONE → ONCE。
 */
export function IfRedstoneButton({ className, onClick, value }: IfRedstoneButtonProps) {
  return (
    <IfIconButton
      className={className}
      height={14}
      label="redstone"
      left={IF_REDSTONE.left}
      onClick={onClick}
      state={IF_REDSTONE_ORDER.indexOf(value)}
      states={REDSTONE_CROPS}
      tooltip={`红石：${IF_REDSTONE_LABELS[value]}`}
      top={IF_REDSTONE.top}
      width={14}
    />
  );
}
