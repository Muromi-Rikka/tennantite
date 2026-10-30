import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModLabel } from "@tennantite/mods-core";
import { gui, PlayerInventory } from "@tennantite/ui";

import type { ThermalMachineKey, ThermalMachineLayout } from "../thermal-machine-layout";
import { ThermalAugmentPanel } from "../thermal-augment-panel/index";
import { ThermalEnergyGauge } from "../thermal-energy-gauge/index";
import { ThermalFluidTank } from "../thermal-fluid-tank/index";
import { ThermalLayoutSlot } from "../thermal-layout-slot/index";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { THERMAL_GUI } from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";
import { ThermalSpriteProgress } from "../thermal-sprite-progress/index";

export interface ThermalMachineScreenProps {
  /**
   * 强化槽物品（可见数量 = 数组长度，上限 9）
   */
  augments?: ScreenSlot[];
  /**
   * 右侧强化面板展开（受控；默认收起）
   */
  augmentsOpen?: boolean;
  /**
   * 机器专属附加件（如组装机的确认按钮、销毁器的清空按钮、模式切换按钮）
   */
  children?: ReactNode;
  className?: string;
  /**
   * 能量状态（amount/capacity，驱动左侧竖向能量表）
   */
  energy?: { amount: number; capacity: number };
  /**
   * 流体状态（amount/capacity 驱动填充，tint 为液体染色）
   */
  fluid?: { amount: number; capacity: number; tint: string };
  /**
   * 额外流体储罐状态（对应布局表 `fluids`，顺序一致）
   */
  fluids?: { amount: number; capacity: number; tint: string }[];
  input?: ScreenSlot;
  /**
   * 额外输入槽物品（对应布局表 `inputs`，顺序一致）
   */
  inputs?: (null | ScreenSlot)[];
  /**
   * 机器布局 key（`THERMAL_MACHINES` 数据表）
   */
  machine: ThermalMachineKey;
  /**
   * 强化面板开合回调
   */
  onAugmentsToggle?: () => void;
  onSlotClick?: (role: string, item: ScreenSlot) => void;
  output?: ScreenSlot;
  /**
   * 额外输出槽物品（对应布局表 `outputs`，顺序一致）
   */
  outputs?: (null | ScreenSlot)[];
  /**
   * 玩家快捷栏（背景已烘焙槽框）
   */
  playerHotbar?: ScreenSlot[];
  /**
   * 玩家背包主格子（背景已烘焙槽框）
   */
  playerItems?: ScreenSlot[];
  playerName?: ReactNode;
  /**
   * 处理进度 0..1（进度箭头，左→右）
   */
  progress?: number;
  /**
   * 第二产物槽物品（双输出机器，位置由布局表 `secondaryOutput` 给出）
   */
  secondaryOutput?: ScreenSlot;
  /**
   * 处理速度 0..1（火焰，自下而上）
   */
  speed?: number;
  title?: ReactNode;
}

/**
 * Thermal 机器屏基座：按 `THERMAL_MACHINES` 数据表渲染背景、能量表、
 * 槽位、进度箭头、速度火焰与玩家背包，右侧强化面板可展开
 * （视觉复刻上游 AugmentPanel，数据注入、无游戏逻辑）。
 */
export function ThermalMachineScreen({
  augments = [],
  augmentsOpen = false,
  children,
  className,
  energy,
  fluid,
  fluids = [],
  input,
  inputs = [],
  machine,
  onAugmentsToggle,
  onSlotClick,
  output,
  outputs = [],
  playerHotbar = [],
  playerItems = [],
  playerName = "玩家",
  progress = 0,
  secondaryOutput,
  speed = 0,
  title,
}: ThermalMachineScreenProps) {
  const layout: ThermalMachineLayout = THERMAL_MACHINES[machine];
  const height = layout.height ?? THERMAL_GUI.height;
  return (
    <div className={className} style={{ height: gui(height), position: "relative", width: gui(THERMAL_GUI.width) }}>
      <ThermalSprite crop={{ height, width: THERMAL_GUI.width, x: 0, y: 0 }} name={layout.background} />
      <ModLabel className="text-mc-thermal-text" top={6}>{title ?? layout.title}</ModLabel>
      {playerName
        ? (
            <ModLabel className="text-mc-thermal-text" left={8} top={height - 93}>
              {playerName}
            </ModLabel>
          )
        : null}
      {layout.energy
        ? (
            <ThermalEnergyGauge
              height={layout.energy.height}
              label="能量"
              left={layout.energy.left}
              max={energy?.capacity}
              top={layout.energy.top}
              value={energy?.amount}
              width={layout.energy.width}
            />
          )
        : null}
      {layout.fluid
        ? <ThermalFluidTank state={fluid} tank={layout.fluid} />
        : null}
      {layout.fluids?.map((tankLayout, index) => (
        <ThermalFluidTank
          key={`fluid-${tankLayout.left}-${tankLayout.top}`}
          state={fluids[index]}
          tank={tankLayout}
        />
      ))}
      {layout.input
        ? (
            <ThermalLayoutSlot
              item={input}
              label={layout.input.label}
              left={layout.input.left}
              onSlotClick={onSlotClick}
              size={layout.input.size}
              top={layout.input.top}
            />
          )
        : null}
      {layout.inputs?.map((slotLayout, index) => (
        <ThermalLayoutSlot
          key={slotLayout.label}
          item={inputs[index]}
          label={slotLayout.label}
          left={slotLayout.left}
          onSlotClick={onSlotClick}
          size={slotLayout.size}
          top={slotLayout.top}
        />
      ))}
      {layout.output
        ? (
            <ThermalLayoutSlot
              item={output}
              label={layout.output.label}
              left={layout.output.left}
              onSlotClick={onSlotClick}
              size={layout.output.size}
              top={layout.output.top}
            />
          )
        : null}
      {layout.outputs?.map((slotLayout, index) => (
        <ThermalLayoutSlot
          key={slotLayout.label}
          item={outputs[index]}
          label={slotLayout.label}
          left={slotLayout.left}
          onSlotClick={onSlotClick}
          size={slotLayout.size}
          top={slotLayout.top}
        />
      ))}
      {layout.secondaryOutput
        ? (
            <ThermalLayoutSlot
              item={secondaryOutput}
              label={layout.secondaryOutput.label}
              left={layout.secondaryOutput.left}
              onSlotClick={onSlotClick}
              size={layout.secondaryOutput.size}
              top={layout.secondaryOutput.top}
            />
          )
        : null}
      {layout.progress
        ? (
            <ThermalSpriteProgress
              direction="right"
              fillCrop={layout.progress.fillCrop}
              height={layout.progress.height}
              label="处理进度"
              left={layout.progress.left}
              progress={progress}
              sprite={layout.progressSprite ?? "elements/progress_arrow_right"}
              top={layout.progress.top}
              trackCrop={layout.progress.trackCrop}
              width={layout.progress.width}
            />
          )
        : null}
      {layout.speed
        ? (
            <ThermalSpriteProgress
              direction="up"
              fillCrop={layout.speed.fillCrop}
              height={layout.speed.height}
              label="处理速度"
              left={layout.speed.left}
              progress={speed}
              sprite={layout.speedSprite ?? "elements/scale_flame"}
              top={layout.speed.top}
              trackCrop={layout.speed.trackCrop}
              width={layout.speed.width}
            />
          )
        : null}
      {children}
      <PlayerInventory
        bare
        hotbarItems={playerHotbar}
        hotbarY={height - 25}
        mainItems={playerItems}
        y={height - 83}
      />
      <ThermalAugmentPanel
        augments={augments}
        onSlotClick={onSlotClick}
        onToggle={onAugmentsToggle}
        open={augmentsOpen}
      />
    </div>
  );
}
