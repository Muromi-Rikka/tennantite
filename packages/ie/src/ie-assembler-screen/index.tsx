import type { ScreenSlot } from "@tennantite/ui";

import { IeEnergyBar } from "../ie-energy-bar/index";
import { IeFluidTank } from "../ie-fluid-tank/index";
import { IeLayoutSlots } from "../ie-layout-slots/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

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
  const slotItems: Record<string, null | ScreenSlot | undefined> = {};
  for (const [pattern, group] of patterns.entries()) {
    for (const [index, item] of group.entries()) {
      slotItems[`assembler-pattern-${pattern}-${index}`] = item;
    }
  }
  for (const [index, item] of outputs.entries()) {
    slotItems[`assembler-output-${index}`] = item;
  }
  for (const [index, item] of storage.entries()) {
    slotItems[`assembler-storage-${index}`] = item;
  }
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
        <IeSpriteButton
          dataAttributes={{ "data-ie-assembler-clear": pattern }}
          height={10}
          hoverName="sprites/assembler/clear_hovered"
          key={`clear-${pattern}`}
          label={`清空配方 ${pattern}`}
          left={11 + pattern * 59}
          name="sprites/assembler/clear"
          onClick={onClear ? () => onClear(pattern) : undefined}
          top={67}
          width={10}
        />
      ))}
      <IeSpriteButton
        dataAttributes={{ "data-ie-assembler-recursive": recursive ? "true" : "false" }}
        height={16}
        label={recursive ? "递归合成（开）" : "递归合成（关）"}
        left={162}
        name="sprites/assembler/no_recursive"
        nameOn="sprites/assembler/recursive"
        onClick={onRecursiveToggle}
        pressed={recursive}
        top={69}
        width={16}
      />
      <IeLayoutSlots items={slotItems} onSlotClick={onSlotClick} slots={slots} />
    </IeMachineScreen>
  );
}
