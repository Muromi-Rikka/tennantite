import { AE2_TERMINAL, AE2_TERMINAL_SLICES } from "../ae2-layout";
import { Ae2TerminalBody } from "./index";

const ITEMS = [
  { count: 64, icon: "diamond" as const, tooltip: "钻石" },
  { count: 32, icon: "iron-ingot" as const, tooltip: "铁锭" },
  { count: 16, icon: "gold-ingot" as const, tooltip: "金锭" },
];

export function Ae2TerminalBodyDemo() {
  const rows = 3;
  return (
    <Ae2TerminalBody
      grid={{
        columns: AE2_TERMINAL.columns,
        labelPrefix: "demo-terminal",
        left: AE2_TERMINAL.gridLeft,
        rows,
        slotSize: AE2_TERMINAL.slotSize,
        top: AE2_TERMINAL.gridTop,
      }}
      height={AE2_TERMINAL.headerHeight + rows * AE2_TERMINAL.rowHeight + AE2_TERMINAL.bottomHeight}
      panel={{ slices: AE2_TERMINAL_SLICES, sprite: AE2_TERMINAL.sprite, width: AE2_TERMINAL.panelWidth }}
      scrollbar={{ left: AE2_TERMINAL.scrollbar.left, rowHeight: AE2_TERMINAL.rowHeight, top: AE2_TERMINAL.scrollbar.top }}
      search={AE2_TERMINAL.search}
      slots={ITEMS}
      title="ME 终端"
    />
  );
}
