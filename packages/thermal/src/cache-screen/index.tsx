import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";

import { ModLabel } from "@tennantite/mods-core";
import { gui, PlayerInventory, ScreenItemSlot } from "@tennantite/ui";
import { ThermalCellRateText, ThermalCellStepButton } from "../thermal-cell-controls";
import { ThermalItemGauge } from "../thermal-energy-gauge/index";
import { THERMAL_CELL_CONTROLS, THERMAL_GUI, THERMAL_ITEM_GAUGE } from "../thermal-metrics";
import { ThermalSprite } from "../thermal-sprite/index";

export interface ThermalCacheScreenProps {
  /**
   * 缓存物品量（驱动容量条填充）
   */
  amount?: number;
  /**
   * 容量（缓存物品上限）
   */
  capacity?: number;
  className?: string;
  /**
   * 当前存入速率（数值文本）
   */
  inputRate?: number;
  /**
   * 缓存物品（图标展示在 (80,16)，ElementItem 先例）
   */
  item?: ScreenSlot;
  maxInput?: number;
  maxOutput?: number;
  onInputChange?: (amount: number) => void;
  /**
   * 取出/存入按钮变化回调（± 按钮）
   */
  onOutputChange?: (amount: number) => void;
  /**
   * 当前出料速率（数值文本）
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

/**
 * Thermal 物品缓存仓（ItemCellScreen 布局，ThermalCore cc7c230 的
 * item_cell.png 背景）：缓存物品展示在 (80,16)、竖向容量条 (80,36) 16×34
 * 内缩裁剪填充，进/出料图标、速率文本与 ± 按钮与储能仓共用坐标。
 */
export function ThermalCacheScreen({
  amount = 0,
  capacity = 0,
  className,
  inputRate = 0,
  item,
  maxInput = 0,
  maxOutput = 0,
  onInputChange,
  onOutputChange,
  outputRate = 0,
  playerHotbar = [],
  playerItems = [],
  playerName = "玩家",
  title = "物品缓存仓",
}: ThermalCacheScreenProps) {
  const { buttons, icons, textCenters } = THERMAL_CELL_CONTROLS;
  return (
    <div className={className} style={{ height: gui(THERMAL_GUI.height), position: "relative", width: gui(THERMAL_GUI.width) }}>
      <ThermalSprite crop={{ height: THERMAL_GUI.height, width: THERMAL_GUI.width, x: 0, y: 0 }} name="container/item_cell" />
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
      <ScreenItemSlot item={item} label="cache-item" left={80} size={16} top={16} />
      <ThermalItemGauge
        height={THERMAL_ITEM_GAUGE.height}
        label="缓存容量"
        left={THERMAL_ITEM_GAUGE.left}
        max={capacity}
        top={THERMAL_ITEM_GAUGE.top}
        value={amount}
        width={THERMAL_ITEM_GAUGE.width}
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
