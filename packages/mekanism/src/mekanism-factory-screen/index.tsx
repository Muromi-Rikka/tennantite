import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { useEffect, useRef, useState } from "react";
import type {
  MekanismDataType,
  MekanismRedstoneMode,
  MekanismSecurityMode,
  MekanismSide,
  MekanismTabKind,
  MekanismWindowKind,
} from "../mekanism-types";
import type { MekanismFactoryTier, MekanismFactoryType } from "./mekanism-factory-layout";
import { MekanismBar } from "../mekanism-bar/index";
import { MekanismImageButton } from "../mekanism-image-button/index";
import { mekanismNextRedstone, mekanismNextSecurity, mekanismNextSide } from "../mekanism-mode-state";
import { MekanismProgress } from "../mekanism-progress/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";
import { MekanismUpgradeWindow } from "../mekanism-upgrade-window/index";
import { mekanismFactoryLayout } from "./mekanism-factory-layout";

export interface MekanismFactoryScreenProps {
  chemical?: { amount: number; capacity: number; tint?: string };
  className?: string;
  defaultWindows?: MekanismWindowKind[];
  energy?: { max: number; value: number };
  factory: MekanismFactoryType;
  onRedstoneChange?: (mode: MekanismRedstoneMode) => void;
  onSecurityChange?: (mode: MekanismSecurityMode) => void;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  onSortingChange?: (isSorting: boolean) => void;
  onWindowsChange?: (windows: MekanismWindowKind[]) => void;
  playerName?: ReactNode;
  progress?: Record<string, number>;
  redstone?: MekanismRedstoneMode;
  security?: MekanismSecurityMode;
  slots?: Record<string, ScreenSlot>;

  sorting?: boolean;
  tier: MekanismFactoryTier;
  title?: ReactNode;
  warning?: boolean;
}

const CHEMICAL_BAR = { from: "#c9071f", to: "#e03030" };

interface FactoryTabActions {
  cycleRedstone: () => void;
  cycleSecurity: () => void;
  setSorting: (isSorting: boolean) => void;
  toggleWindow: (kind: MekanismWindowKind) => void;
}

/**
 * Mekanism 工厂屏：9 类 × 4 档，逐进程输入 / 输出列、进度条、化学条 + 倾倒按钮与分类标签。
 */
export function MekanismFactoryScreen({
  chemical,
  className,
  defaultWindows = [],
  energy,
  factory,
  onRedstoneChange,
  onSecurityChange,
  onSlotClick,
  onSortingChange,
  onWindowsChange,
  playerName = "玩家",
  progress = {},
  redstone: initialRedstone = "disabled",
  security: initialSecurity = "public",
  slots = {},
  sorting: initialSorting = false,
  tier,
  title,
  warning = false,
}: MekanismFactoryScreenProps) {
  const layout = mekanismFactoryLayout(factory, tier);
  const [windows, setWindows] = useState<MekanismWindowKind[]>(defaultWindows);
  const windowsRef = useRef(windows);
  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);
  const [security, setSecurity] = useState<MekanismSecurityMode>(initialSecurity);
  const [redstone, setRedstone] = useState<MekanismRedstoneMode>(initialRedstone);
  const [sorting, setSorting] = useState(initialSorting);
  const [transmission, setTransmission] = useState(layout.transmissions[0] ?? "energy");
  const [sides, setSides] = useState<Partial<Record<MekanismSide, MekanismDataType>>>({});
  const [ejecting, setEjecting] = useState(false);

  const updateWindows = (next: MekanismWindowKind[]) => {
    windowsRef.current = next;
    setWindows(next);
    onWindowsChange?.(next);
  };
  const toggleWindow = (kind: MekanismWindowKind) => {
    const current = windowsRef.current;
    updateWindows(current.includes(kind) ? current.filter(value => value !== kind) : [...current, kind]);
  };

  const cycleSecurity = () => {
    const next = mekanismNextSecurity(security);
    setSecurity(next);
    onSecurityChange?.(next);
  };
  const cycleRedstone = () => {
    const next = mekanismNextRedstone(redstone);
    setRedstone(next);
    onRedstoneChange?.(next);
  };

  const handleTabClick = (kind: MekanismTabKind) => {
    handleFactoryTabClick(kind, {
      cycleRedstone,
      cycleSecurity,
      setSorting: (next) => {
        setSorting(next);
        onSortingChange?.(next);
      },
      toggleWindow,
    }, sorting);
  };

  const activeTabs = factoryActiveTabs(windows);
  const tabs = factoryTabs(warning);

  return (
    <MekanismScreen
      className={className}
      height={layout.height}
      inventoryLabel={{ text: playerName, x: layout.inventoryLabel.x, y: layout.inventoryLabel.y }}
      playerInventory={{ hotbarY: layout.player.hotbarY, x: layout.player.x, y: layout.player.y }}
      tabs={(
        <MekanismTabBar
          active={activeTabs}
          onTabClick={handleTabClick}
          redstone={redstone}
          security={security}
          tabs={tabs}
          texts={{ sorting: sorting ? "开" : "关" }}
          width={layout.width}
        />
      )}
      title={title ?? layout.title}
      titleY={4}
      width={layout.width}
      windows={(
        <>
          {windows.includes("side-config")
            ? (
                <MekanismSideConfigWindow
                  ejecting={ejecting}
                  left={(layout.width - 156) / 2}
                  onClose={() => updateWindows(windows.filter(value => value !== "side-config"))}
                  onSideCycle={(side) => {
                    const current = sides[side] ?? "NONE";
                    const next = mekanismNextSide(current);
                    setSides(value => ({ ...value, [side]: next }));
                  }}
                  onToggleEject={() => setEjecting(value => !value)}
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
                  left={(layout.width - 198) / 2}
                  onClose={() => updateWindows(windows.filter(value => value !== "upgrade"))}
                  top={15}
                />
              )
            : null}
        </>
      )}
    >
      <MekanismBar
        height={layout.power.height}
        kind="power"
        label="能量"
        left={layout.power.left}
        top={layout.power.top}
        value={meterRatio(energy?.value, energy?.max)}
      />
      {layout.chemical
        ? (
            <MekanismBar
              height={layout.chemical.height}
              horizontal
              kind="rate"
              label="化学物质"
              left={layout.chemical.left}
              tint={chemicalTint(chemical)}
              top={layout.chemical.top}
              value={meterRatio(chemical?.amount, chemical?.capacity)}
              width={layout.chemical.width}
            />
          )
        : null}
      {layout.dump
        ? (
            <MekanismImageButton
              background={false}
              height={layout.dump.height}
              label="倾倒化学物质"
              left={layout.dump.left}
              name="button/dump"
              top={layout.dump.top}
              width={layout.dump.width}
            />
          )
        : null}
      {Object.entries(layout.slots).map(([role, slot]) => (
        <MekanismSlot
          item={slots[role]}
          key={role}
          label={role}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(role, slots[role]) : undefined}
          top={slot.top}
          type={slot.type}
        />
      ))}
      {layout.progress.map(bar => (
        <MekanismProgress
          key={bar.role}
          label={bar.role}
          left={bar.left}
          progress={progress[bar.role] ?? 0}
          top={bar.top}
          type={bar.type}
          warning={warning}
        />
      ))}
    </MekanismScreen>
  );
}

/**
 * 化学条染色：优先化学物质自身色，否则用默认红色渐变。
 */
function chemicalTint(chemical?: MekanismFactoryScreenProps["chemical"]) {
  return chemical?.tint ? { from: chemical.tint, to: chemical.tint } : CHEMICAL_BAR;
}

/**
 * 当前激活标签：对应已打开的配置 / 升级窗口。
 */
function factoryActiveTabs(windows: MekanismWindowKind[]): MekanismTabKind[] {
  return [
    ...(windows.includes("side-config") ? ["config" as const] : []),
    ...(windows.includes("upgrade") ? ["upgrade" as const] : []),
  ];
}

/**
 * 顶部标签页：警告时在安全页后追加警告页。
 */
function factoryTabs(hasWarning: boolean): MekanismTabKind[] {
  const tabs: MekanismTabKind[] = ["config", "transporter", "sorting", "upgrade", "security", "redstone", "energy"];
  if (hasWarning) {
    tabs.push("warning");
  }
  return tabs;
}

/**
 * 顶部标签点击分发：窗口类切换开关，模式类循环切换。
 */
function handleFactoryTabClick(kind: MekanismTabKind, actions: FactoryTabActions, isSorting: boolean) {
  switch (kind) {
    case "config": {
      actions.toggleWindow("side-config");
      break;
    }
    case "redstone": {
      actions.cycleRedstone();
      break;
    }
    case "security": {
      actions.cycleSecurity();
      break;
    }
    case "sorting": {
      actions.setSorting(!isSorting);
      break;
    }
    case "upgrade": {
      actions.toggleWindow("upgrade");
      break;
    }
    default: {
      break;
    }
  }
}

/**
 * 能量 / 化学物质占比：缺省或容量非正时为 0。
 */
function meterRatio(value: number | undefined, max: number | undefined) {
  return value !== undefined && max !== undefined && max > 0 ? value / max : 0;
}
