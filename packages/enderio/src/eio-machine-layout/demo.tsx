import type { ScreenSlot } from "@tennantite/ui";
import { ModProgress } from "@tennantite/mods-core";
import { ScreenItemSlot } from "@tennantite/ui";
import { Fragment } from "react";
import type { EioMachineKey, EioMachineLayout } from "../eio-machine-layout";

import {
  EIO_DEMO_CHARCOAL,
  EIO_DEMO_GOLD_INGOT,
  EIO_DEMO_GUNPOWDER,
  EIO_DEMO_IRON_ORE,
} from "../eio-demo-data";
import { EioEnergyBar } from "../eio-energy-bar/index";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioMachineScreen } from "../eio-machine-screen/index";
import { EioSprite } from "../eio-sprite/index";

/**
 * EioMachineLayout 预览用例：演示布局表结构 —— 同一渲染骨架仅替换
 * `EIO_MACHINES` 条目（sagMill 208 高 / stirlingGenerator 166 高）即得到
 * 两台不同机器，背景、能量区、进度、槽位与背包坐标全部来自表数据。
 */
export function EioMachineLayoutDemo() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <LayoutPreview layout={EIO_MACHINES.sagMill} machine="sagMill" />
      <LayoutPreview layout={EIO_MACHINES.stirlingGenerator} machine="stirlingGenerator" />
    </div>
  );
}

/**
 * 按布局表槽位 label 推断示例物品（输入 / 产物 / 研磨球 / 燃料）。
 */
function demoItem(label: string): ScreenSlot | undefined {
  if (label.includes("output")) {
    return EIO_DEMO_GOLD_INGOT;
  }
  if (label.includes("grinding-ball")) {
    return EIO_DEMO_GUNPOWDER;
  }
  if (label.includes("fuel")) {
    return EIO_DEMO_CHARCOAL;
  }
  return label.includes("input") ? EIO_DEMO_IRON_ORE : undefined;
}

/**
 * 单台机器的纯数据驱动渲染：背景 / 能量 / 进度 / 槽位全部取自布局表。
 */
function LayoutPreview({ layout, machine }: { layout: EioMachineLayout; machine: EioMachineKey }) {
  return (
    <EioMachineScreen
      background={layout.background}
      backgroundHeight={layout.backgroundHeight}
      height={layout.height}
      labels={layout.labels}
      machine={machine}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      {layout.energy
        ? (
            <EioEnergyBar
              height={layout.energy.height}
              left={layout.energy.left}
              max={100000}
              top={layout.energy.top}
              value={72000}
              variant={layout.energy.variant}
              width={layout.energy.width}
            />
          )
        : null}
      {layout.progresses.map(entry => (
        <ModProgress
          direction={entry.direction}
          fill={(
            <EioSprite
              crop={entry.crop}
              height={entry.height}
              name={entry.sprite}
              width={entry.width}
            />
          )}
          height={entry.height}
          key={`${entry.sprite}-${entry.left}-${entry.top}`}
          label={`${layout.title}进度`}
          left={entry.left}
          progress={0.45}
          top={entry.top}
          width={entry.width}
        />
      ))}
      {layout.slots.map(slot => (
        <Fragment key={slot.label}>
          {slot.label.endsWith("-capacitor")
            ? (
                <EioSprite
                  height={16}
                  left={slot.left + 1}
                  name="sprites/widget/empty_capacitor_slot"
                  top={slot.top + 1}
                  width={16}
                />
              )
            : null}
          <ScreenItemSlot
            item={demoItem(slot.label)}
            label={slot.label}
            left={slot.left}
            top={slot.top}
          />
        </Fragment>
      ))}
    </EioMachineScreen>
  );
}
