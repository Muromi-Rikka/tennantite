import type { EioSpriteName } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import { EioSprite } from "../eio-sprite/index";

export type EioMachineState = "active" | "disabled" | "error" | "idle";

const STATE_LABELS: Record<EioMachineState, string> = {
  active: "运行",
  disabled: "已禁用",
  error: "错误",
  idle: "待机",
};

const STATE_ICONS = {
  active: "sprites/icon/machine_state_type_new/active",
  disabled: "sprites/icon/machine_state_type_new/disabled",
  error: "sprites/icon/machine_state_type_new/error",
  idle: "sprites/icon/machine_state_type_new/idle",
} satisfies Record<EioMachineState, EioSpriteName>;

export interface EioMachineStateProps {
  className?: string;
  left: number;
  state: EioMachineState;
  top: number;
}

/**
 * Ender IO 机器状态指示（16×16 新图标）。
 */
export function EioMachineState({ className, left, state, top }: EioMachineStateProps) {
  const label = STATE_LABELS[state];
  return (
    <span
      aria-label={`机器状态：${label}`}
      className={className}
      role="img"
      style={{ height: gui(16), left: gui(left), position: "absolute", top: gui(top), width: gui(16) }}
      title={label}
    >
      <EioSprite height={16} name={STATE_ICONS[state]} width={16} />
    </span>
  );
}
