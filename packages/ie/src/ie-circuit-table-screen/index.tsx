import type { ScreenSlot } from "@tennantite/ui";

import { gui } from "@tennantite/ui";
import { useState } from "react";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

/**
 * DyeColor.byId(ordinal) 的近似色（GuiButtonLogicCircuitRegister 着色矩形）
*/
const REGISTER_COLORS = [
  "#ffffff",
  "#f78034",
  "#ff00ff",
  "#60a4f4",
  "#f4f411",
  "#5ced12",
  "#ff80c0",
  "#4c4c4c",
  "#a0a0a0",
  "#12a4a4",
  "#8020c0",
  "#2020c0",
  "#60341c",
  "#20c020",
  "#c02020",
  "#1c1c1c",
] as const;

export interface IeCircuitTableScreenProps {
  /**
   * 成品电路输出槽（LogicCircuit）
   */
  circuit?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 输入寄存器（按当前操作符参数个数）
   */
  inputRegisters?: number[];
  /**
   * 3 个电路板材料槽（PCB / 逻辑 / 焊接电路）
   */
  materials?: Array<null | ScreenSlot>;
  /**
   * 电路板名称（EditBox 172,10,54,12）
   */
  name?: string;
  onNameChange?: (name: string) => void;
  onOperatorSelect?: (index: number) => void;
  onRegisterClick?: (role: "input" | "output", index: number) => void;
  onSlotClick?: (label: string) => void;
  /**
   * 操作符列表（GuiSelectingList 58,16,36,56）
   */
  operators?: string[];
  output?: ScreenSlot;
  outputRegister?: number;
  selectedOperator?: number;
}

/**
 * 电路工作台（CircuitTableScreen，234×182）：3 材料槽 + 操作符选择列表 +
 * 输入/输出寄存器按钮（register_button 贴图 + DyeColor 着色矩形）+ 名称框 +
 * 成品电路槽与输出槽、竖向能量条。
 */
export function IeCircuitTableScreen({
  circuit,
  className,
  energy,
  inputRegisters = [],
  materials = [],
  name = "",
  onNameChange,
  onOperatorSelect,
  onRegisterClick,
  onSlotClick,
  operators = [],
  output,
  outputRegister = 16,
  selectedOperator = -1,
}: IeCircuitTableScreenProps) {
  const layout = IE_MACHINES.circuitTable;
  const slots = ieExpandSlots(layout);
  const slotItems: Record<string, ScreenSlot | undefined> = {
    "circuit-table-circuit": circuit,
    "circuit-table-logic": materials[1] ?? undefined,
    "circuit-table-output": output,
    "circuit-table-pcb": materials[0] ?? undefined,
    "circuit-table-solder": materials[2] ?? undefined,
  };
  const [focused, setFocused] = useState(false);
  // GuiButtonLogicCircuitRegister：输入钮 y=18，x = 130-(count*10-1)+20*i；输出钮 (121,56)
  const inputStart = 130 - (Math.max(inputRegisters.length, 1) * 10 - 1);
  const registerButton = (role: "input" | "output", index: number, x: number, y: number, register: number) => (
    <button
      aria-label={`${role === "input" ? "输入" : "输出"}寄存器 ${index}`}
      data-ie-register={register}
      key={`${role}-${index}`}
      onClick={onRegisterClick ? () => onRegisterClick(role, index) : undefined}
      style={{
        height: gui(18),
        left: gui(x),
        position: "absolute",
        top: gui(y),
        width: gui(18),
      }}
      type="button"
    >
      <IeSprite name="sprites/circuit_table/register_button" />
      <span
        aria-hidden="true"
        style={{
          backgroundColor: REGISTER_COLORS[register] ?? "transparent",
          display: register < 16 ? "block" : "none",
          height: gui(12),
          left: gui(3),
          position: "absolute",
          top: gui(3),
          width: gui(12),
        }}
      />
    </button>
  );
  return (
    <IeMachineScreen
      background={layout.background}
      className={className}
      height={layout.height}
      inventoryLabelTop={layout.inventoryLabelTop}
      player={layout.player}
      title={layout.title}
      width={layout.width}
    >
      {energy
        ? (
            <IeEnergyBar
              label="电路工作台能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      <div
        aria-label="操作符列表"
        data-ie-operator-list=""
        role="listbox"
        style={{
          height: gui(56),
          left: gui(58),
          padding: gui(1),
          paddingBottom: gui(2),
          position: "absolute",
          top: gui(16),
          width: gui(36),
        }}
      >
        {operators.map((operator, index) => (
          <button
            aria-selected={index === selectedOperator}
            key={operator}
            onClick={onOperatorSelect ? () => onOperatorSelect(index) : undefined}
            role="option"
            style={{
              color: index === selectedOperator ? "#ffffff" : (focused ? "#918d85" : "#ada9a1"),
              display: "block",
              fontFamily: "inherit",
              fontSize: gui(6),
              height: gui(8),
              lineHeight: `${gui(8)}`,
              textAlign: "center",
              width: "100%",
            }}
            type="button"
          >
            {operator}
          </button>
        ))}
      </div>
      {inputRegisters.map((register, index) => registerButton("input", index, inputStart + 20 * index, 18, register))}
      {registerButton("output", 0, 121, 56, outputRegister)}
      <input
        aria-label="电路板名称"
        className="absolute bg-transparent font-mc mc-text outline-none"
        data-ie-circuit-name=""
        maxLength={50}
        onBlur={() => setFocused(false)}
        onChange={onNameChange ? event => onNameChange(event.target.value) : undefined}
        onFocus={() => setFocused(true)}
        style={{
          color: "#ffffff",
          height: gui(12),
          left: gui(172),
          textShadow: "none",
          top: gui(10),
          width: gui(54),
        }}
        value={name}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
    </IeMachineScreen>
  );
}
