import { useState } from "react";

import type { MekanismWindowKind } from "../mekanism-types";

export interface MekanismWindowsState {
  close: (kind: MekanismWindowKind) => void;
  open: (kind: MekanismWindowKind) => void;
  toggle: (kind: MekanismWindowKind) => void;
  windows: MekanismWindowKind[];
}

/**
 * 窗口开关状态；默认打开 `defaultWindows`。
 */
export function useMekanismWindows(defaultWindows: MekanismWindowKind[] = []): MekanismWindowsState {
  const [windows, setWindows] = useState<MekanismWindowKind[]>(defaultWindows);

  const open = (kind: MekanismWindowKind) => {
    setWindows(current => current.includes(kind) ? current : [...current, kind]);
  };
  const close = (kind: MekanismWindowKind) => {
    setWindows(current => current.filter(value => value !== kind));
  };
  const toggle = (kind: MekanismWindowKind) => {
    setWindows(current => current.includes(kind) ? current.filter(value => value !== kind) : [...current, kind]);
  };

  return { close, open, toggle, windows };
}
