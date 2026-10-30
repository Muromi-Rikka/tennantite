import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { ModLabel } from "@tennantite/mods-core";
import { gui, PlayerInventory } from "@tennantite/ui";
import { ThermalCellRateText, ThermalCellStepButton } from "../thermal-cell-controls";
import { ThermalFluidTank } from "../thermal-fluid-tank/index";
import { THERMAL_CELL_CONTROLS, THERMAL_FLUID_STORAGE, THERMAL_GUI } from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalFluidCacheScreenProps {
  /**
   * 流体量（驱动储罐填充）
   */
  amount?: number;
  /**
   * 容量（流体缓存上限，mB）
   */
  capacity?: number;
  className?: string;
  /**
   * 当前存入速率（数值文本，mB/t）
   */
  inputRate?: number;
  maxInput?: number;
  maxOutput?: number;
  onInputChange?: (amount: number) => void;
  /**
   * 取出/存入按钮变化回调（± 按钮）
   */
  onOutputChange?: (amount: number) => void;
  /**
   * 当前取出速率（数值文本，mB/t）
   */
  outputRate?: number;
  playerHotbar?: ScreenSlot[];
  /**
   * 玩家背包主格子（背景已烘焙槽框）
   */
  playerItems?: ScreenSlot[];
  playerName?: ReactNode;
  /**
   * 液体染色（multiply 填充色）
   */
  tint?: string;
  title?: ReactNode;
}

/**
 * Thermal 流体缓存仓（FluidCellScreen 布局，ThermalCore cc7c230 的
 * fluid_cell.png 背景）：medium 流体储罐 (80,22) 18×42 内缩 1 px 自下而上填充、
 * 液位刻度叠加，进/出料图标、速率文本与 ± 按钮与储能/物品缓存仓共用坐标
 * （文本中心 x 34/142、按钮行 y 56）。
 */
export function ThermalFluidCacheScreen({
  amount = 0,
  capacity = 0,
  className,
  inputRate = 0,
  maxInput = 0,
  maxOutput = 0,
  onInputChange,
  onOutputChange,
  outputRate = 0,
  playerHotbar = [],
  playerItems = [],
  playerName = "玩家",
  tint = "#3c64c8",
  title = "流体缓存仓",
}: ThermalFluidCacheScreenProps) {
  const { buttons, icons, textCenters } = THERMAL_CELL_CONTROLS;
  const medium = THERMAL_FLUID_STORAGE.medium;
  return (
    <div className={className} style={{ height: gui(THERMAL_GUI.height), position: "relative", width: gui(THERMAL_GUI.width) }}>
      <ThermalSprite crop={{ height: THERMAL_GUI.height, width: THERMAL_GUI.width, x: 0, y: 0 }} name="container/fluid_cell" />
      <ModLabel className="text-mc-thermal-text" top={6}>{title}</ModLabel>
      <ThermalSprite
        height={icons.input.size}
        left={icons.input.left}
        name="elements/info_input"
        top={icons.input.top}
        width={icons.input.size}
      />
      <ThermalSprite
        height={icons.output.size}
        left={icons.output.left}
        name="elements/info_output"
        top={icons.output.top}
        width={icons.output.size}
      />
      <ThermalFluidTank
        label="缓存容量"
        state={{ amount, capacity, tint }}
        tank={{
          frame: "elements/storage_fluid_medium",
          height: medium.height,
          left: 80,
          overlay: "elements/overlay_fluid_medium",
          top: 22,
          width: medium.width,
        }}
      />
      <ThermalCellRateText center={textCenters.input} label="存入速率" value={inputRate} />
      <ThermalCellRateText center={textCenters.output} label="取出速率" value={outputRate} />
      <ThermalCellStepButton
        delta={-4}
        disabled={inputRate <= 0}
        label="减少存入"
        left={buttons.inputDecrement.left}
        onRateChange={onInputChange}
        rate={inputRate}
        sprite="elements/button_decrement"
        top={buttons.inputDecrement.top}
      />
      <ThermalCellStepButton
        delta={4}
        disabled={inputRate >= maxInput}
        label="增加存入"
        left={buttons.inputIncrement.left}
        onRateChange={onInputChange}
        rate={inputRate}
        sprite="elements/button_increment"
        top={buttons.inputIncrement.top}
      />
      <ThermalCellStepButton
        delta={-4}
        disabled={outputRate <= 0}
        label="减少取出"
        left={buttons.outputDecrement.left}
        onRateChange={onOutputChange}
        rate={outputRate}
        side="output"
        sprite="elements/button_decrement"
        top={buttons.outputDecrement.top}
      />
      <ThermalCellStepButton
        delta={4}
        disabled={outputRate >= maxOutput}
        label="增加取出"
        left={buttons.outputIncrement.left}
        onRateChange={onOutputChange}
        rate={outputRate}
        side="output"
        sprite="elements/button_increment"
        top={buttons.outputIncrement.top}
      />
      {playerName
        ? (
            <ModLabel className="text-mc-thermal-text" left={8} top={72}>
              {playerName}
            </ModLabel>
          )
        : null}
      <PlayerInventory bare hotbarItems={playerHotbar} mainItems={playerItems} />
    </div>
  );
}
