import type { PixelIconName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import { IeEnergyBar } from "../ie-energy-bar/index";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";

export interface IeAutoWorkbenchRecipe {
  icon?: PixelIconName;
  selected?: boolean;
  tooltip?: string;
}

export interface IeAutoWorkbenchScreenProps {
  /**
   * 图纸槽（Engineer's Blueprint）
   */
  blueprint?: ScreenSlot;
  className?: string;
  energy?: { max: number; value: number };
  onRecipeSelect?: (index: number) => void;
  onSlotClick?: (label: string) => void;
  /**
   * 图纸配方选择按钮（GuiButtonItem 18×18，3 列，y 依数量 68/59/…）
   */
  recipes?: Array<IeAutoWorkbenchRecipe>;
  /**
   * 16 个材料存储槽
   */
  storage?: Array<null | ScreenSlot>;
}

/**
 * 自动工作台（AutoWorkbenchScreen）：4×4 材料存储槽 + 图纸槽 + 配方选择
 * 按钮组（选中配方高亮）+ 竖向能量条（EnergyInfoArea 80,36）。
 */
export function IeAutoWorkbenchScreen({
  blueprint,
  className,
  energy,
  onRecipeSelect,
  onSlotClick,
  recipes = [],
  storage = [],
}: IeAutoWorkbenchScreenProps) {
  const layout = IE_MACHINES.autoWorkbench;
  const slots = ieExpandSlots(layout);
  const l = recipes.length;
  const selectionY = l > 6 ? 59 - Math.floor((l - 3) / 3) * 18 : (l > 3 ? 59 : 68);
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
              label="自动工作台能量"
              left={layout.energy.left}
              max={energy.max}
              top={layout.energy.top}
              value={energy.value}
            />
          )
        : null}
      {Array.from(recipes, (recipe, index) => (
        <span
          aria-label={`配方 ${index}${recipe.selected ? "（当前）" : ""}`}
          aria-pressed={recipe.selected}
          data-ie-recipe-selected={recipe.selected ? "true" : "false"}
          key={`recipe-${index}`}
          onClick={onRecipeSelect ? () => onRecipeSelect(index) : undefined}
          onKeyDown={(event) => {
            if (!(onRecipeSelect && (event.key === "Enter" || event.key === " "))) {
              return;
            }

            event.preventDefault();
            onRecipeSelect(index);
          }}
          role="button"
          style={{
            height: gui(18),
            left: gui(121 + index % 3 * 18),
            position: "absolute",
            top: gui(selectionY + Math.floor(index / 3) * 18),
            width: gui(18),
          }}
          tabIndex={0}
        >
          <ScreenItemSlot
            frame
            item={recipe.icon ? { icon: recipe.icon, tooltip: recipe.tooltip } : null}
            label={`auto-workbench-recipe-${index}`}
            left={0}
            top={0}
          />
        </span>
      ))}
      {slots.map(slot => (
        <ScreenItemSlot
          item={slot.label.startsWith("auto-workbench-storage") ? storage[Number(slot.label.split("-").pop())] ?? undefined : (slot.label === "auto-workbench-blueprint" ? blueprint : undefined)}
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
