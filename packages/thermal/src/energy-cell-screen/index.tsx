import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { ModLabel } from "@tennantite/mods-core";
import { gui, PlayerInventory } from "@tennantite/ui";
import { ThermalCellRateText, ThermalCellStepButton } from "../thermal-cell-controls";
import { ThermalEnergyGauge } from "../thermal-energy-gauge/index";
import { THERMAL_CELL_CONTROLS, THERMAL_ENERGY_GAUGE, THERMAL_GUI } from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";

const EMPTY_PLAYER_HOTBAR: ScreenSlot[] = [];
const EMPTY_PLAYER_ITEMS: ScreenSlot[] = [];

export interface ThermalEnergyCellScreenProps {
  /**
   * 当前存能（渲染能量表填充）
   */
  amount?: number;
  /**
   * 容量
   */
  capacity?: number;
  className?: string;
  /**
   * 进料速率（数值文本 + 增按钮可用性）
   */
  inputRate?: number;
  maxInput?: number;
  maxOutput?: number;
  /**
   * 进料速率变化回调（± 按钮）
   */
  onInputChange?: (rate: number) => void;
  onOutputChange?: (rate: number) => void;
  /**
   * 出料速率（数值文本 + 增按钮可用性）
   */
  outputRate?: number;
  playerHotbar?: ScreenSlot[];
  /**
   * 玩家背包主格子（背景已烘焙槽框）
   */
  playerItems?: ScreenSlot[];
  playerName?: ReactNode;
  title?: ReactNode;
}

const STEP = 4;

/**
 * Thermal 储能仓（EnergyCellScreen，ThermalCore cc7c230）：
 * 背景 energy_cell.png 已烘焙 ± 按钮底与玩家背包；能量表 (80,22) 16×42
 * 内缩裁剪填充，进/出料图标（24,16 / 132,16）、速率文本（y=42，中心
 * x=34/142，上游 0x404040）与四枚 14×14 ± 按钮（19/35/127/143, 56）。
 */
export function ThermalEnergyCellScreen({
  amount = 0,
  capacity = 0,
  className,
  inputRate = 0,
  maxInput = 0,
  maxOutput = 0,
  onInputChange,
  onOutputChange,
  outputRate = 0,
  playerHotbar = EMPTY_PLAYER_HOTBAR,
  playerItems = EMPTY_PLAYER_ITEMS,
  playerName = "玩家",
  title = "储能仓",
}: ThermalEnergyCellScreenProps) {
  const { buttons, icons, textCenters } = THERMAL_CELL_CONTROLS;
  return (
    <div className={className} style={{ height: gui(THERMAL_GUI.height), position: "relative", width: gui(THERMAL_GUI.width) }}>
      <ThermalSprite crop={{ height: THERMAL_GUI.height, width: THERMAL_GUI.width, x: 0, y: 0 }} name="container/energy_cell" />
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
      <ThermalEnergyGauge
        height={THERMAL_ENERGY_GAUGE.cell.height}
        label="能量"
        left={THERMAL_ENERGY_GAUGE.cell.left}
        max={capacity}
        top={THERMAL_ENERGY_GAUGE.cell.top}
        value={amount}
        width={THERMAL_ENERGY_GAUGE.cell.width}
      />
      <ThermalCellRateText center={textCenters.input} label="进料速率" value={inputRate} />
      <ThermalCellRateText center={textCenters.output} label="出料速率" value={outputRate} />
      <ThermalCellStepButton
        delta={-STEP}
        disabled={inputRate <= 0}
        label="减少进料"
        left={buttons.inputDecrement.left}
        onRateChange={onInputChange}
        rate={inputRate}
        sprite="elements/button_decrement"
        top={buttons.inputDecrement.top}
      />
      <ThermalCellStepButton
        delta={STEP}
        disabled={inputRate >= maxInput}
        label="增加进料"
        left={buttons.inputIncrement.left}
        onRateChange={onInputChange}
        rate={inputRate}
        sprite="elements/button_increment"
        top={buttons.inputIncrement.top}
      />
      <ThermalCellStepButton
        delta={-STEP}
        disabled={outputRate <= 0}
        label="减少出料"
        left={buttons.outputDecrement.left}
        onRateChange={onOutputChange}
        rate={outputRate}
        side="output"
        sprite="elements/button_decrement"
        top={buttons.outputDecrement.top}
      />
      <ThermalCellStepButton
        delta={STEP}
        disabled={outputRate >= maxOutput}
        label="增加出料"
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
