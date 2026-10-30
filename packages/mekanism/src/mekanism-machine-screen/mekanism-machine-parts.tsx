import type { MekanismSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { gui } from "@tennantite/ui";

import type { MekanismGaugeKind } from "../mekanism-types";
import type { MekanismMachineLayout } from "./mekanism-machine-layout";
import { MekanismArrow } from "../mekanism-arrow/index";
import { MekanismBar } from "../mekanism-bar/index";
import { MekanismGasMode } from "../mekanism-gas-mode/index";
import { MekanismGauge } from "../mekanism-gauge/index";
import { MekanismImageButton } from "../mekanism-image-button/index";
import { MekanismInnerScreen } from "../mekanism-inner-screen/index";
import { MekanismLabel } from "../mekanism-label/index";
import { MekanismProgress } from "../mekanism-progress/index";
import { MekanismSideHolder } from "../mekanism-side-holder/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismTextField } from "../mekanism-text-field/index";

export interface MekanismMachineButtonLayerProps {
  buttons?: MekanismMachineLayout["buttons"];
  onButtonClick: (button: { label: string; role?: string }) => void;
  toggles: Record<string, boolean>;
}

export interface MekanismMachineMetersProps {
  arrows?: MekanismMachineLayout["arrows"];
  bars?: MekanismMachineLayout["bars"];
  chemicals?: Record<string, { amount: number; capacity: number; fill?: MekanismSpriteName; tint?: string }>;
  energy?: { max: number; value: number };
  fluids?: Record<string, { amount: number; capacity: number; fill?: MekanismSpriteName; tint?: string }>;
  gauges?: MekanismMachineLayout["gauges"];
  power?: MekanismMachineLayout["power"];
  progress: Record<string, number>;
  progressSpecs?: MekanismMachineLayout["progress"];
  toggles: Record<string, boolean>;
  warning?: boolean;
}

export interface MekanismMachineSlotAreaProps {
  holders?: MekanismMachineLayout["holders"];
  items: Record<string, ScreenSlot>;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  slotGroups?: MekanismMachineLayout["slotGroups"];
  slots: MekanismMachineLayout["slots"];
}

export interface MekanismMachineTextLayerProps {
  condensentrating: boolean;
  fields?: MekanismMachineLayout["fields"];
  fieldValues?: Record<string, string>;
  innerDefaults?: MekanismMachineLayout["innerDefaults"];
  inners?: MekanismMachineLayout["inners"];
  textDefaults?: MekanismMachineLayout["textDefaults"];
  texts?: Record<string, ReactNode>;
  textSpecs?: MekanismMachineLayout["texts"];
}

/**
 * Mekanism 机器按钮段：气体模式、可切换按钮与普通按钮。
 */
export function MekanismMachineButtonLayer({
  buttons,
  onButtonClick,
  toggles,
}: MekanismMachineButtonLayerProps) {
  return (
    <>
      {buttons?.map((button) => {
        const key = button.role ?? button.label;
        if (button.kind === "gas-mode") {
          return <MekanismGasMode key={key} label={button.label} left={button.left} top={button.top} />;
        }
        if (button.kind === "toggle") {
          const active = toggles[key] ?? false;
          return (
            <MekanismImageButton
              height={button.height}
              key={key}
              label={button.label}
              left={button.left}
              name={(active && button.spriteActive ? button.spriteActive : button.sprite) ?? "button/toggle"}
              onClick={() => onButtonClick(button)}
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
    </>
  );
}

/**
 * Mekanism 机器仪表段：进度、能量条、仪表、速率条与箭头。
 */
export function MekanismMachineMeters({
  arrows,
  bars,
  chemicals,
  energy,
  fluids,
  gauges,
  power,
  progress,
  progressSpecs,
  toggles,
  warning = false,
}: MekanismMachineMetersProps) {
  return (
    <>
      {progressSpecs?.map(bar => (
        bar.when === undefined || toggles[bar.when] !== false
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
      {power
        ? ("horizontal" in power
            ? (
                <MekanismBar
                  horizontal
                  kind="power"
                  label="能量"
                  left={power.left}
                  top={power.top}
                  value={energy && energy.max > 0 ? energy.value / energy.max : 0}
                  width={power.width}
                />
              )
            : (
                <MekanismBar
                  height={power.height}
                  kind="power"
                  label="能量"
                  left={power.left}
                  top={power.top}
                  value={energy && energy.max > 0 ? energy.value / energy.max : 0}
                />
              ))
        : null}
      {gauges?.map((gauge) => {
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
      {bars?.map(bar => (
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
      {arrows?.map(arrow => (
        <MekanismArrow
          dir={arrow.dir}
          key={`${arrow.dir}-${arrow.left}-${arrow.top}`}
          left={arrow.left}
          top={arrow.top}
        />
      ))}
    </>
  );
}

/**
 * Mekanism 机器槽位段：侧面 holder、单槽与槽组。
 */
export function MekanismMachineSlotArea({
  holders,
  items,
  onSlotClick,
  slotGroups,
  slots,
}: MekanismMachineSlotAreaProps) {
  return (
    <>
      {holders?.map(holder => (
        <MekanismSideHolder
          height={holder.height}
          key={`${holder.side}-${holder.left}-${holder.top}`}
          left={holder.left}
          side={holder.side}
          top={holder.top}
        />
      ))}
      {Object.entries(slots).map(([role, slot]) => (
        <MekanismSlot
          height={slot.height}
          item={items[role]}
          key={role}
          label={role}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(role, items[role]) : undefined}
          overlay={slot.overlay}
          top={slot.top}
          type={slot.type}
          width={slot.width}
        />
      ))}
      {slotGroups?.map(group => (
        Array.from({ length: group.columns * group.rows }, (_, index) => {
          const column = index % group.columns;
          const row = Math.floor(index / group.columns);
          const step = group.step ?? 18;
          const role = `${group.prefix}-${index}`;
          return (
            <MekanismSlot
              item={items[role]}
              key={role}
              label={role}
              left={group.left + column * step}
              onActivate={onSlotClick ? () => onSlotClick(role, items[role]) : undefined}
              top={group.top + row * step}
              type={group.type}
            />
          );
        })
      ))}
    </>
  );
}

/**
 * Mekanism 机器文字段：内屏文字、标签与文本框。
 */
export function MekanismMachineTextLayer({
  condensentrating,
  fields,
  fieldValues,
  innerDefaults,
  inners,
  textDefaults,
  texts,
  textSpecs,
}: MekanismMachineTextLayerProps) {
  return (
    <>
      {inners?.map(inner => (
        <MekanismInnerScreen
          height={inner.height}
          key={inner.role}
          left={inner.left}
          padding={inner.padding}
          top={inner.top}
          width={inner.width}
        >
          <span className="truncate">{texts?.[inner.role] ?? innerDefaults?.[inner.role] ?? ""}</span>
        </MekanismInnerScreen>
      ))}
      {textSpecs?.map(text => (
        <MekanismLabel
          key={text.role}
          left={text.left}
          top={text.top}
          variant={text.variant}
          width={text.width}
        >
          {text.role === "mode"
            ? (texts?.mode ?? (condensentrating ? "冷凝中" : "去冷凝"))
            : (texts?.[text.role] ?? textDefaults?.[text.role] ?? "")}
        </MekanismLabel>
      ))}
      {fields?.map(field => (
        <div
          className="absolute"
          key={field.role}
          style={{
            height: gui(field.height ?? 12),
            left: gui(field.left),
            top: gui(field.top),
            width: gui(field.width),
          }}
        >
          <MekanismTextField
            defaultValue={fieldValues?.[field.role]}
            height={field.height}
            label={field.role}
            left={0}
            top={0}
            width={field.width}
          />
        </div>
      ))}
    </>
  );
}

function gaugeValue(
  kind: MekanismGaugeKind,
  role: string,
  energy: undefined | { max: number; value: number },
  chemicals: MekanismMachineMetersProps["chemicals"],
  fluids: MekanismMachineMetersProps["fluids"],
) {
  if (kind === "energy") {
    return { max: energy?.max ?? 1, value: energy?.value ?? 0 };
  }
  const source = kind === "fluid" ? fluids?.[role] : chemicals?.[role];
  return { max: source?.capacity ?? 1, value: source?.amount ?? 0 };
}
