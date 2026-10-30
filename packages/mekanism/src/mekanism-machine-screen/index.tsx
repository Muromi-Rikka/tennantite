import type { MekanismSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import type {
  MekanismEditMode,
  MekanismRedstoneMode,
  MekanismSecurityMode,
  MekanismTabKind,
  MekanismWindowKind,
} from "../mekanism-types";
import type { MekanismMachineKey, MekanismMachineLayout } from "./mekanism-machine-layout";
import { useState } from "react";
import { MekanismScreen } from "../mekanism-screen/index";
import { useMekanismMachineChrome } from "../mekanism-screen/use-mekanism-machine-chrome";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";
import { MekanismUpgradeWindow } from "../mekanism-upgrade-window/index";
import { MEKANISM_MACHINE_TITLES, MEKANISM_MACHINES } from "./mekanism-machine-layout";
import {
  MekanismMachineButtonLayer,
  MekanismMachineMeters,
  MekanismMachineSlotArea,
  MekanismMachineTextLayer,
} from "./mekanism-machine-parts";

export interface MekanismMachineScreenProps {
  chemicals?: Record<string, { amount: number; capacity: number; fill?: MekanismSpriteName; tint?: string }>;
  className?: string;
  defaultWindows?: MekanismWindowKind[];
  editMode?: MekanismEditMode;
  energy?: { max: number; value: number };
  fields?: Record<string, string>;
  fluids?: Record<string, { amount: number; capacity: number; fill?: MekanismSpriteName; tint?: string }>;
  machine: MekanismMachineKey;
  onRedstoneChange?: (mode: MekanismRedstoneMode) => void;
  onSecurityChange?: (mode: MekanismSecurityMode) => void;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  onWindowsChange?: (windows: MekanismWindowKind[]) => void;
  playerName?: ReactNode;
  progress?: Record<string, number>;
  redstone?: MekanismRedstoneMode;
  security?: MekanismSecurityMode;
  slots?: Record<string, ScreenSlot>;
  texts?: Record<string, ReactNode>;
  title?: ReactNode;
  toggles?: Record<string, boolean>;
  warning?: boolean;
}

/**
 * Mekanism 机器屏：按 `MEKANISM_MACHINES` 数据表渲染槽位、仪表、进度、标签与窗口。
 */
export function MekanismMachineScreen({
  chemicals,
  className,
  defaultWindows = [],
  editMode: initialEditMode = "both",
  energy,
  fields,
  fluids,
  machine,
  onRedstoneChange,
  onSecurityChange,
  onSlotClick,
  onWindowsChange,
  playerName = "玩家",
  progress = {},
  redstone: initialRedstone = "disabled",
  security: initialSecurity = "public",
  slots = {},
  texts,
  title = MEKANISM_MACHINE_TITLES[machine],
  toggles = {},
  warning = false,
}: MekanismMachineScreenProps) {
  const layout: MekanismMachineLayout = MEKANISM_MACHINES[machine];
  const width = layout.width ?? 176;
  const height = layout.height ?? 166;
  const {
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
    toggleEjecting,
    toggleWindow,
    transmission,
    windows,
  } = useMekanismMachineChrome({
    defaultTransmission: layout.transmissions?.[0] ?? "energy",
    defaultWindows,
    initialEditMode,
    initialRedstone,
    initialSecurity,
    onRedstoneChange,
    onSecurityChange,
    onWindowsChange,
  });
  const [toggleState, setToggleState] = useState<Record<string, boolean>>({ condensentrating: true, ...toggles });

  const handleTabClick = (kind: MekanismTabKind) => {
    switch (kind) {
      case "config": {
        toggleWindow("side-config");
        break;
      }
      case "edit": {
        cycleEdit();
        break;
      }
      case "redstone": {
        cycleRedstone();
        break;
      }
      case "security": {
        cycleSecurity();
        break;
      }
      case "upgrade": {
        toggleWindow("upgrade");
        break;
      }
      default: {
        break;
      }
    }
  };

  const toggleButton = (button: { label: string; role?: string }) => {
    const key = button.role ?? button.label;
    if (key === "mode") {
      setToggleState((current) => {
        const isCondensing = current.condensentrating !== false;
        return { ...current, condensentrating: !isCondensing, decondensentrating: isCondensing };
      });
      return;
    }
    setToggleState(current => ({ ...current, [key]: !(current[key] ?? false) }));
  };

  const activeTabs: MekanismTabKind[] = [
    ...(windows.includes("side-config") ? ["config" as const] : []),
    ...(windows.includes("upgrade") ? ["upgrade" as const] : []),
  ];
  const tabs: MekanismTabKind[] = warning ? [...layout.tabs, "warning"] : layout.tabs;
  const isCondensentrating = toggleState.condensentrating !== false;

  return (
    <MekanismScreen
      className={className}
      height={height}
      inventoryLabel={layout.inventoryLabel
        ? { ...layout.inventoryLabel, text: playerName }
        : null}
      playerInventory={{ ...layout.player }}
      tabs={(
        <MekanismTabBar
          active={activeTabs}
          editMode={editMode}
          onTabClick={handleTabClick}
          redstone={redstone}
          security={security}
          tabs={tabs}
          warningSide={layout.warningSide}
          width={width}
        />
      )}
      title={title}
      titleEnd={layout.titleEnd}
      titleX={layout.titleX}
      titleY={layout.titleY}
      width={width}
      windows={(
        <>
          {windows.includes("side-config")
            ? (
                <MekanismSideConfigWindow
                  ejecting={ejecting}
                  left={(width - 156) / 2}
                  onClose={() => closeWindow("side-config")}
                  onSideCycle={cycleSide}
                  onToggleEject={toggleEjecting}
                  onTransmissionChange={setTransmission}
                  sides={sides}
                  top={15}
                  transmission={transmission}
                  transmissions={layout.transmissions}
                />
              )
            : null}
          {windows.includes("upgrade")
            ? (
                <MekanismUpgradeWindow
                  left={(width - 198) / 2}
                  onClose={() => closeWindow("upgrade")}
                  top={15}
                />
              )
            : null}
        </>
      )}
    >
      <MekanismMachineSlotArea
        holders={layout.holders}
        items={slots}
        onSlotClick={onSlotClick}
        slotGroups={layout.slotGroups}
        slots={layout.slots}
      />
      <MekanismMachineMeters
        arrows={layout.arrows}
        bars={layout.bars}
        chemicals={chemicals}
        energy={energy}
        fluids={fluids}
        gauges={layout.gauges}
        power={layout.power}
        progress={progress}
        progressSpecs={layout.progress}
        toggles={toggleState}
        warning={warning}
      />
      <MekanismMachineTextLayer
        condensentrating={isCondensentrating}
        fieldValues={fields}
        fields={layout.fields}
        innerDefaults={layout.innerDefaults}
        inners={layout.inners}
        textDefaults={layout.textDefaults}
        texts={texts}
        textSpecs={layout.texts}
      />
      <MekanismMachineButtonLayer
        buttons={layout.buttons}
        onButtonClick={toggleButton}
        toggles={toggleState}
      />
    </MekanismScreen>
  );
}
