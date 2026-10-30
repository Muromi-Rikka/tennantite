import type { IeSpriteName } from "@tennantite/textures";
import type { ScreenSlot } from "@tennantite/ui";

import { gui, ScreenItemSlot } from "@tennantite/ui";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeMachineScreen } from "../ie-machine-screen/index";
import { IeSprite } from "../ie-sprite/index";

export type IeSorterBit = "components" | "damage" | "tags";

const BIT_SPRITES: Record<IeSorterBit, [off: IeSpriteName, on: IeSpriteName]> = {
  components: ["sprites/sorter/no_components", "sprites/sorter/components"],
  damage: ["sprites/sorter/no_damage", "sprites/sorter/damage"],
  tags: ["sprites/sorter/no_tags", "sprites/sorter/tags"],
} as const;

/**
 * FilterBit 枚举序（DAMAGE → COMPONENTS → TAG）决定按钮 x 间距
*/
const BIT_ORDER: Array<IeSorterBit> = ["damage", "components", "tags"];

export interface IeSorterScreenProps {
  className?: string;
  /**
   * 6 面 × 9 幽灵过滤槽（按面 → 槽序注入）
   */
  filters?: Array<null | ScreenSlot>;
  /**
   * 6 面过滤位掩码（按面序注入）
   */
  masks?: Array<IeSorterSideMask>;
  onMaskClick?: (bit: IeSorterBit, side: number) => void;
  onSlotClick?: (label: string) => void;
}

export interface IeSorterSideMask {
  components: boolean;
  damage: boolean;
  tags: boolean;
}

/**
 * 分拣器（SorterScreen）：6 面 × 9 幽灵过滤槽，每面 3 个过滤位开关
 * （耐久/组件/NBT，no_* / 正常贴图双态）。
 */
export function IeSorterScreen({
  className,
  filters = [],
  masks = [],
  onMaskClick,
  onSlotClick,
}: IeSorterScreenProps) {
  const layout = IE_MACHINES.sorter;
  const slots = ieExpandSlots(layout);
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
      {slots.map((slot) => {
        const label = slot.label;
        const side = Number(label.split("-side", 2)[1]?.split("-", 1)[0]);
        const indexInSide = Number(label.split("-").pop());
        const filter = filters[side * 9 + indexInSide] ?? null;
        return (
          <ScreenItemSlot
            item={filter}
            key={label}
            label={label}
            left={slot.left}
            onActivate={onSlotClick ? () => onSlotClick(label) : undefined}
            top={slot.top}
          />
        );
      })}
      {Array.from({ length: 6 }, (_, side) => {
        const colBase = 3 + (side / 2) * 58;
        const top = 3 + (side % 2) * 76;
        return BIT_ORDER.map((bit, bitIndex) => {
          const mask = masks[side];
          const on = mask ? mask[bit] : false;
          return (
            <button
              aria-label={`面 ${side} ${bit} 过滤开关`}
              aria-pressed={on}
              data-ie-sorter-bit={on ? "true" : "false"}
              key={`${side}-${bit}`}
              onClick={onMaskClick ? () => onMaskClick(bit, side) : undefined}
              style={{
                height: gui(18),
                left: gui(colBase + bitIndex * 18),
                position: "absolute",
                top: gui(top),
                width: gui(18),
              }}
              type="button"
            >
              <IeSprite name={on ? BIT_SPRITES[bit][1] : BIT_SPRITES[bit][0]} />
            </button>
          );
        });
      })}
    </IeMachineScreen>
  );
}
