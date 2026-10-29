import type { MekanismSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { gui } from "@tennantite/ui";
import { useRef, useState } from "react";
import type {
  MekanismDataType,
  MekanismEditMode,
  MekanismGaugeKind,
  MekanismRedstoneMode,
  MekanismSecurityMode,
  MekanismSide,
  MekanismTabKind,
  MekanismWindowKind,
} from "../mekanism-types";
import type { MekanismMachineKey, MekanismMachineLayout } from "./mekanism-machine-layout";
import { MekanismArrow } from "../mekanism-arrow/index";
import { MekanismBar } from "../mekanism-bar/index";
import { MekanismGasMode } from "../mekanism-gas-mode/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismImageButton } from "../mekanism-image-button/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismLabel } from "../mekanism-label/index";
import { MekanismProgress } from "../mekanism-progress/index";
import { MekanismScreen } from "../mekanism-screen/index";
import { MekanismSideConfigWindow } from "../mekanism-side-config-window/index";
import { MekanismSideHolder } from "../mekanism-side-holder/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTabBar } from "../mekanism-tab-bar/index";
import { MekanismTextField } from "../mekanism-text-field/index";
import { MekanismUpgradeWindow } from "../mekanism-upgrade-window/index";
import { MEKANISM_MACHINE_TITLES, MEKANISM_MACHINES } from "./mekanism-machine-layout";

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

const SECURITY_ORDER: MekanismSecurityMode[] = ["public", "private", "protected"];
const REDSTONE_ORDER: MekanismRedstoneMode[] = ["disabled", "high", "low", "pulse"];
const EDIT_ORDER: MekanismEditMode[] = ["both", "fill", "empty"];
const SIDE_ORDER: MekanismDataType[] = ["NONE", "INPUT", "OUTPUT", "ENERGY"];

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
  const [windows, setWindows] = useState<MekanismWindowKind[]>(defaultWindows);
  const windowsRef = useRef(windows);
  windowsRef.current = windows;
  const [security, setSecurity] = useState<MekanismSecurityMode>(initialSecurity);
  const [redstone, setRedstone] = useState<MekanismRedstoneMode>(initialRedstone);
  const [editMode, setEditMode] = useState<MekanismEditMode>(initialEditMode);
  const [toggleState, setToggleState] = useState<Record<string, boolean>>({ condensentrating: true, ...toggles });
  const [transmission, setTransmission] = useState(layout.transmissions?.[0] ?? "energy");
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
    const next = SECURITY_ORDER[(SECURITY_ORDER.indexOf(security) + 1) % SECURITY_ORDER.length] ?? "public";
    setSecurity(next);
    onSecurityChange?.(next);
  };
  const cycleRedstone = () => {
    const next = REDSTONE_ORDER[(REDSTONE_ORDER.indexOf(redstone) + 1) % REDSTONE_ORDER.length] ?? "disabled";
    setRedstone(next);
    onRedstoneChange?.(next);
  };
  const cycleEdit = () => {
    setEditMode(EDIT_ORDER[(EDIT_ORDER.indexOf(editMode) + 1) % EDIT_ORDER.length] ?? "both");
  };

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
                  onClose={() => updateWindows(windows.filter(value => value !== "side-config"))}
                  onSideCycle={(side) => {
                    const current = sides[side] ?? "NONE";
                    const next = SIDE_ORDER[(SIDE_ORDER.indexOf(current) + 1) % SIDE_ORDER.length] ?? "NONE";
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
                  left={(width - 198) / 2}
                  onClose={() => updateWindows(windows.filter(value => value !== "upgrade"))}
                  top={15}
                />
              )
            : null}
        </>
      )}
    >
      {layout.holders?.map(holder => (
        <MekanismSideHolder
          height={holder.height}
          key={`${holder.side}-${holder.left}-${holder.top}`}
          left={holder.left}
          side={holder.side}
          top={holder.top}
        />
      ))}
      {Object.entries(layout.slots).map(([role, slot]) => (
        <MekanismSlot
          height={slot.height}
          item={slots[role]}
          key={role}
          label={role}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(role, slots[role]) : undefined}
          overlay={slot.overlay}
          top={slot.top}
          type={slot.type}
          width={slot.width}
        />
      ))}
      {layout.slotGroups?.map(group => (
        Array.from({ length: group.columns * group.rows }, (_, index) => {
          const column = index % group.columns;
          const row = Math.floor(index / group.columns);
          const step = group.step ?? 18;
          const role = `${group.prefix}-${index}`;
          return (
            <MekanismSlot
              item={slots[role]}
              key={role}
              label={role}
              left={group.left + column * step}
              onActivate={onSlotClick ? () => onSlotClick(role, slots[role]) : undefined}
              top={group.top + row * step}
              type={group.type}
            />
          );
        })
      ))}
      {layout.progress?.map(bar => (
        bar.when === undefined || toggleState[bar.when] !== false
          ? (
              <MekanismProgress
                key={bar.role}
                label={bar.role}
                left={bar.left}
                progress={progress[bar.role] ?? 0}
                top={bar.top}
                type={bar.type}
                warning={warning}
              />
            )
          : null
      ))}
      {layout.power
        ? ("horizontal" in layout.power
            ? (
                <MekanismBar
                  horizontal
                  kind="power"
                  label="能量"
                  left={layout.power.left}
                  top={layout.power.top}
                  value={energy && energy.max > 0 ? energy.value / energy.max : 0}
                  width={layout.power.width}
                />
              )
            : (
                <MekanismBar
                  height={layout.power.height}
                  kind="power"
                  label="能量"
                  left={layout.power.left}
                  top={layout.power.top}
                  value={energy && energy.max > 0 ? energy.value / energy.max : 0}
                />
              ))
        : null}
      {layout.gauges?.map((gauge) => {
        const source = gaugeValue(gauge.kind, gauge.role, energy, chemicals, fluids);
        const data = gauge.kind === "fluid" ? fluids?.[gauge.role] : chemicals?.[gauge.role];
        return (
          <MekanismGauge
            fillSprite={data?.fill}
            height={gauge.height}
            key={gauge.role}
            kind={gauge.kind}
            label={gauge.role}
            left={gauge.left}
            max={source.max}
            tint={data?.tint}
            top={gauge.top}
            type={gauge.gauge}
            value={source.value}
            width={gauge.width}
          />
        );
      })}
      {layout.bars?.map(bar => (
        <MekanismBar
          height={bar.height}
          horizontal={bar.horizontal}
          key={bar.role}
          kind={bar.kind}
          label={bar.role}
          left={bar.left}
          tint={bar.tint}
          top={bar.top}
          value={progress[bar.role] ?? 0}
          width={bar.width}
        />
      ))}
      {layout.arrows?.map(arrow => (
        <MekanismArrow dir={arrow.dir} key={`${arrow.dir}-${arrow.left}-${arrow.top}`} left={arrow.left} top={arrow.top} />
      ))}
      {layout.inners?.map(inner => (
        <MekanismInnerScreen
          height={inner.height}
          key={inner.role}
          left={inner.left}
          padding={inner.padding}
          top={inner.top}
          width={inner.width}
        >
          <span className="truncate">{texts?.[inner.role] ?? layout.innerDefaults?.[inner.role] ?? ""}</span>
        </MekanismInnerScreen>
      ))}
      {layout.texts?.map(text => (
        <MekanismLabel
          key={text.role}
          left={text.left}
          top={text.top}
          variant={text.variant}
          width={text.width}
        >
          {text.role === "mode"
            ? (texts?.mode ?? (isCondensentrating ? "冷凝中" : "去冷凝"))
            : (texts?.[text.role] ?? layout.textDefaults?.[text.role] ?? "")}
        </MekanismLabel>
      ))}
      {layout.fields?.map(field => (
        <div className="absolute" key={field.role} style={{ height: gui(field.height ?? 12), left: gui(field.left), top: gui(field.top), width: gui(field.width) }}>
          <MekanismTextField
            defaultValue={fields?.[field.role]}
            height={field.height}
            label={field.role}
            left={0}
            top={0}
            width={field.width}
          />
        </div>
      ))}
      {layout.buttons?.map((button) => {
        const key = button.role ?? button.label;
        if (button.kind === "gas-mode") {
          return <MekanismGasMode key={key} label={button.label} left={button.left} top={button.top} />;
        }
        if (button.kind === "toggle") {
          const active = toggleState[key] ?? false;
          return (
            <MekanismImageButton
              height={button.height}
              key={key}
              label={button.label}
              left={button.left}
              name={(active && button.spriteActive ? button.spriteActive : button.sprite) ?? "button/toggle"}
              onClick={() => toggleButton(button)}
              top={button.top}
              width={button.width}
            />
          );
        }
        return (
          <MekanismImageButton
            background={button.kind !== "dump"}
            height={button.height}
            key={key}
            label={button.label}
            left={button.left}
            name={button.sprite ?? "button/dump"}
            top={button.top}
            width={button.width}
          />
        );
      })}
    </MekanismScreen>
  );
}

function gaugeValue(
  kind: MekanismGaugeKind,
  role: string,
  energy: undefined | { max: number; value: number },
  chemicals: MekanismMachineScreenProps["chemicals"],
  fluids: MekanismMachineScreenProps["fluids"],
) {
  if (kind === "energy") {
    return { max: energy?.max ?? 1, value: energy?.value ?? 0 };
  }
  const source = kind === "fluid" ? fluids?.[role] : chemicals?.[role];
  return { max: source?.capacity ?? 1, value: source?.amount ?? 0 };
}
