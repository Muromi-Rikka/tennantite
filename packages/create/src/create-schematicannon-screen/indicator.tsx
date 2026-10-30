import { gui } from "@tennantite/ui";

import type { CreateIndicatorState } from "../create-metrics";
import { CREATE_INDICATOR_COLORS } from "../create-metrics";

/**
 * 蓝图炮运行状态指示条（18×6，颜色取自 widgets atlas 中线取样）。
 */
export function Indicator({ left, state, top }: { left: number; state: CreateIndicatorState; top: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute"
      data-indicator-state={state}
      style={{
        background: CREATE_INDICATOR_COLORS[state],
        height: gui(6),
        left: gui(left),
        top: gui(top),
        width: gui(18),
      }}
    />
  );
}
