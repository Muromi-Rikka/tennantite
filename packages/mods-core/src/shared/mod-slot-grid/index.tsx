import type { ScreenSlot } from "@tennantite/ui";
import { ScreenItemSlot } from "@tennantite/ui";

export interface ModSlotGridProps {
  /**
  * 单元格边长（GUI px，默认 18）
  */
  cellSize?: number;
  columns: number;
  /**
  * 是否绘制槽框（默认 true；贴图已烘焙槽框时传 false，仅保留交互热区）
  */
  frame?: boolean;
  /**
  * 槽框纹理类（默认原版 `mc-tex-slot`）
  */
  frameClassName?: string;
  items?: ScreenSlot[];
  /**
  * 无障碍名称前缀（`${prefix}-${index}`）
  */
  labelPrefix: string;
  /**
  * 第一个槽框左上角 x
  */
  left: number;
  onSlotClick?: (index: number, item: ScreenSlot) => void;
  rows: number;
  /**
  * 第一个槽框左上角 y
  */
  top: number;
}

/**
 * 通用 mod 槽位网格：按行优先排列，自动补齐到 `rows * columns`。
 */
export function ModSlotGrid({
  cellSize = 18,
  columns,
  frame = true,
  frameClassName,
  items = [],
  labelPrefix,
  left,
  onSlotClick,
  rows,
  top,
}: ModSlotGridProps) {
  const slots = Array.from({ length: rows * columns }, (_, index) => items[index] ?? null);
  return (
    <>
      {slots.map((item, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = left + column * cellSize;
        const y = top + row * cellSize;
        return (
          <ScreenItemSlot
            frame={frame}
            frameClassName={frameClassName}
            item={item}
            key={`${x}-${y}`}
            label={`${labelPrefix}-${index}`}
            left={x}
            onActivate={onSlotClick ? () => onSlotClick(index, item) : undefined}
            size={cellSize}
            top={y}
          />
        );
      })}
    </>
  );
}
