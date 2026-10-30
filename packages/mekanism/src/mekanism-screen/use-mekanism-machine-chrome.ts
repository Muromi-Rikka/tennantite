import { useRef, useState } from "react";

import type {
  MekanismDataType,
  MekanismEditMode,
  MekanismRedstoneMode,
  MekanismSecurityMode,
  MekanismSide,
  MekanismTransmission,
  MekanismWindowKind,
} from "../mekanism-types";
import {
  mekanismNextEdit,
  mekanismNextRedstone,
  mekanismNextSecurity,
  mekanismNextSide,
} from "../mekanism-mode-state";

export interface MekanismMachineChromeOptions {
  defaultTransmission?: MekanismTransmission;
  defaultWindows?: MekanismWindowKind[];
  initialEditMode?: MekanismEditMode;
  initialRedstone?: MekanismRedstoneMode;
  initialSecurity?: MekanismSecurityMode;
  onRedstoneChange?: (mode: MekanismRedstoneMode) => void;
  onSecurityChange?: (mode: MekanismSecurityMode) => void;
  onWindowsChange?: (windows: MekanismWindowKind[]) => void;
}

export interface MekanismMachineChromeState {
  closeWindow: (kind: MekanismWindowKind) => void;
  cycleEdit: () => void;
  cycleRedstone: () => void;
  cycleSecurity: () => void;
  cycleSide: (side: MekanismSide) => void;
  editMode: MekanismEditMode;
  ejecting: boolean;
  redstone: MekanismRedstoneMode;
  security: MekanismSecurityMode;
  setTransmission: (value: MekanismTransmission) => void;
  sides: Partial<Record<MekanismSide, MekanismDataType>>;
  toggleEjecting: () => void;
  toggleWindow: (kind: MekanismWindowKind) => void;
  transmission: MekanismTransmission;
  windows: MekanismWindowKind[];
}

/**
 * Mekanism 机器公共 chrome 状态：窗口、安全/红石/编辑模式、侧面配置与弹出。
 */
export function useMekanismMachineChrome(
  options: MekanismMachineChromeOptions = {},
): MekanismMachineChromeState {
  const {
    defaultTransmission = "energy",
    defaultWindows = [],
    initialEditMode = "both",
    initialRedstone = "disabled",
    initialSecurity = "public",
  } = options;

  const [windows, setWindows] = useState<MekanismWindowKind[]>(defaultWindows);
  const [security, setSecurity] = useState<MekanismSecurityMode>(initialSecurity);
  const [redstone, setRedstone] = useState<MekanismRedstoneMode>(initialRedstone);
  const [editMode, setEditMode] = useState<MekanismEditMode>(initialEditMode);
  const [transmission, setTransmission] = useState<MekanismTransmission>(defaultTransmission);
  const [sides, setSides] = useState<Partial<Record<MekanismSide, MekanismDataType>>>({});
  const [ejecting, setEjecting] = useState(false);

  const windowsRef = useRef(windows);
  windowsRef.current = windows;
  const callbacks = useRef(options);
  callbacks.current = options;

  const updateWindows = (next: MekanismWindowKind[]) => {
    windowsRef.current = next;
    setWindows(next);
    callbacks.current.onWindowsChange?.(next);
  };

  const toggleWindow = (kind: MekanismWindowKind) => {
    const current = windowsRef.current;
    updateWindows(
      current.includes(kind)
        ? current.filter(value => value !== kind)
        : [...current, kind],
    );
  };

  const closeWindow = (kind: MekanismWindowKind) => {
    updateWindows(windowsRef.current.filter(value => value !== kind));
  };

  const cycleSecurity = () => {
    const next = mekanismNextSecurity(security);
    setSecurity(next);
    callbacks.current.onSecurityChange?.(next);
  };

  const cycleRedstone = () => {
    const next = mekanismNextRedstone(redstone);
    setRedstone(next);
    callbacks.current.onRedstoneChange?.(next);
  };

  const cycleEdit = () => {
    setEditMode(mekanismNextEdit(editMode));
  };

  const cycleSide = (side: MekanismSide) => {
    setSides(value => ({ ...value, [side]: mekanismNextSide(value[side] ?? "NONE") }));
  };

  return {
    closeWindow,
    cycleEdit,
    cycleRedstone,
    cycleSecurity,
    cycleSide,
    editMode,
    ejecting,
    redstone,
    security,
    setTransmission,
    sides,
    toggleEjecting: () => { setEjecting(value => !value); },
    toggleWindow,
    transmission,
    windows,
  };
}
