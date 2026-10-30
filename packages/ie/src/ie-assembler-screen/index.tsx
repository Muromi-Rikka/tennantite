import type { ScreenSlot } from "@tennantite/ui";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import { useState } from "react";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

export interface IeAssemblerScreenProps {
  className?: string;
  energy?: { max: number; value: number };
  /**
   * 3 个配方清空按钮回调（CLEAR，按配方序）
   */
  onClear?: (pattern: number) => void;
  onRecursiveToggle?: () => void;
  onSlotClick?: (label: string) => void;
  /**
   * 3 个配方输出槽
   */
  outputs?: Array<null | ScreenSlot>;
  /**
   * 3 组 ×9 幽灵配方槽（按配方 → 槽序注入）
   */
  patterns?: Array<Array<null | ScreenSlot>>;
  /**
   * 递归合成开关（GuiButtonBoolean NO_RECURSIVE / RECURSIVE）
   */
  recursive?: boolean;
  /**
   * 18 个材料存储槽
   */
  storage?: Array<null | ScreenSlot>;
  tankValues?: Array<null | { max: number; tint: string; value: number }>;
}

/**
 * 装配器（AssemblerScreen，230×218）：3 组幽灵配方网格 + 3 输出 + 18 存储，
 * 三罐（FluidInfoArea 16×46）、竖向能量条、每配方清空按钮与递归合成开关。
 */
export function IeAssemblerScreen({
  className,
  energy,
  onClear,
  onRecursiveToggle,
  onSlotClick,
  outputs = [],
  patterns = [],
  recursive = false,
  storage = [],
  tankValues = [],
}: IeAssemblerScreenProps) {
  const layout = IE_MACHINES.assembler;
  const slots = ieExpandSlots(layout);
  const [hovered, setHovered] = useState(false);
  const itemFor = (label: string): null | ScreenSlot | undefined => {
    if (label.startsWith("assembler-pattern")) {
      const [, pattern, slot] = label.split("-", 3);
      const patternIndex = Number(pattern);
      const slotIndex = Number(slot);
      return Number.isNaN(patternIndex) || Number.isNaN(slotIndex) ? null : patterns[patternIndex]?.[slotIndex] ?? null;
    }
    if (label.startsWith("assembler-output"))
      return outputs[Number(label.split("-").pop())] ?? null;
    return label.startsWith("assembler-storage") ? storage[Number(label.split("-").pop())] ?? null : undefined;
  };
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
              label="装配器能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      {layout.tanks.map((area, index) => {
        const tank = tankValues[index];
        return tank
          ? (
              <IeFluidTank
                height={area.fill.height}
                key={area.label}
                label={area.label}
                left={area.fill.left}
                max={tank.max}
                overlayName={area.overlayName}
                tint={tank.tint}
                top={area.fill.top}
                value={tank.value}
                width={area.fill.width}
              />
            )
          : null;
      })}
      {Array.from(patterns.keys(), pattern => (
        <button
          aria-label={`清空配方 ${pattern}`}
          data-ie-assembler-clear={pattern}
          key={`clear-${pattern}`}
          onBlur={() => setHovered(false)}
          onClick={onClear ? () => onClear(pattern) : undefined}
          onFocus={() => setHovered(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            height: gui(10),
            left: gui(11 + pattern * 59),
            position: "absolute",
            top: gui(67),
            width: gui(10),
          }}
          type="button"
        >
          <IeSprite name={hovered ? "sprites/assembler/clear_hovered" : "sprites/assembler/clear"} />
        </button>
      ))}
      <button
        aria-label={recursive ? "递归合成（开）" : "递归合成（关）"}
        aria-pressed={recursive}
        data-ie-assembler-recursive={recursive ? "true" : "false"}
        onClick={onRecursiveToggle}
        style={{
          height: gui(16),
          left: gui(162),
          position: "absolute",
          top: gui(69),
          width: gui(16),
        }}
        type="button"
      >
        <IeSprite name={recursive ? "sprites/assembler/recursive" : "sprites/assembler/no_recursive"} />
      </button>
      {slots.map(slot => (
        <ScreenItemSlot
          item={itemFor(slot.label)}
          key={slot.label}
          label={slot.label}
          left={slot.left}
          onActivate={onSlotClick ? () => onSlotClick(slot.label) : undefined}
          top={slot.top}
        />
      ))}
    </IeMachineScreen>
  );
}
