import { gui } from "@tennantite/ui";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSpriteButton } from "../ie-sprite-button/index";

export interface IeFluidSorterScreenProps {
  className?: string;
  /**
   * 48 个流体过滤格（按面 → 槽序注入，tint 为流体近似色）
   */
  filters?: Array<null | { tint: string }>;
  /**
   * 6 面是否按 NBT 过滤
   */
  nbt?: boolean[];
  onCellClick?: (side: number, index: number) => void;
  onNbtClick?: (side: number) => void;
}

/**
 * 流体分拣器（FluidSorterScreen）：6 面 × 8 流体过滤区
 * （getSlotArea 16×16 直接绘制，非槽位框故坐标不 -1）与每面一个 NBT 开关
 * （sorter/no_components / components 贴图）。
 */
export function IeFluidSorterScreen({
  className,
  filters = [],
  nbt = [],
  onCellClick,
  onNbtClick,
}: IeFluidSorterScreenProps) {
  const layout = IE_MACHINES.fluidSorter;
  const cells = ieExpandSlots(layout);
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
      {cells.map((cell) => {
        const side = Number(cell.label.split("-side", 2)[1]?.split("-", 1)[0]);
        const indexInSide = Number(cell.label.split("-").pop());
        const filter = filters[side * 8 + indexInSide] ?? null;
        return (
          <button
            aria-label={cell.label}
            data-ie-fluid-filter={filter ? filter.tint : "empty"}
            key={cell.label}
            onClick={onCellClick ? () => onCellClick(side, indexInSide) : undefined}
            style={{
              background: filter ? filter.tint : "transparent",
              height: gui(16),
              left: gui(cell.left),
              position: "absolute",
              top: gui(cell.top),
              width: gui(16),
            }}
            type="button"
          />
        );
      })}
      {Array.from({ length: 6 }, (_, side) => {
        const on = nbt[side] ?? false;
        return (
          <IeSpriteButton
            dataAttributes={{ "data-ie-sorter-bit": on ? "true" : "false" }}
            key={`nbt-${side}`}
            label={`面 ${side} NBT 过滤开关`}
            left={21 + (side / 2) * 58}
            name="sprites/sorter/no_components"
            nameOn="sprites/sorter/components"
            onClick={onNbtClick ? () => onNbtClick(side) : undefined}
            pressed={on}
            top={3 + (side % 2) * 76}
          />
        );
      })}
    </IeMachineScreen>
  );
}
