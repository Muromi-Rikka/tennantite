import type { PixelIconName } from "@verdigris/textures";

import { cn, gui } from "../../lib/utils";
import { Grid } from "../grid/index";
import { ItemStack } from "../item-stack/index";
import { Slot } from "../slot/index";

/**
 * 背包物品（与 screens/containers 的 ScreenItem 结构一致，形状兼容）
 */
export interface InventoryItem {
  count?: number;
  icon?: PixelIconName;
  src?: string;
  tooltip?: string;
}

export interface PlayerInventoryProps {
  /**
  * 不绘制槽位凹槽（容器背景已烘焙槽框）
  */
  bare?: boolean;
  className?: string;
  /**
  * 自定义槽框纹理类（默认原版 `mc-tex-slot`）
  */
  frameClassName?: string;
  /**
  * 快捷栏 9 格
  */
  hotbarItems?: (InventoryItem | null | undefined)[];
  /**
  * 快捷栏槽位 y（GUI px，默认 141）
  */
  hotbarY?: number;
  /**
  * 主背包物品（行优先，默认 3×9）
  */
  mainItems?: (InventoryItem | null | undefined)[];
  /**
  * 主背包行数（默认 3）
  */
  mainRows?: number;
  onSlotClick?: (area: "hotbar" | "main", index: number) => void;
  /**
  * 快捷栏选中索引
  */
  selectedIndex?: number;
  /**
  * 槽位起始 x（GUI px，默认 7）
  */
  x?: number;
  /**
  * 主背包槽位起始 y（GUI px，默认 83）
  */
  y?: number;
}

const COLUMNS = 9;
const HOTBAR_SLOTS = 9;

/**
 * MC 玩家背包区块（规格 §6）：主背包 3×9 + 快捷栏 1×9，供所有容器界面复用。
 * 数据注入、无游戏逻辑；RSC 兼容（纯展示 + 可选回调）。
 */
export function PlayerInventory({
  bare = false,
  className,
  frameClassName,
  hotbarItems = [],
  hotbarY = 141,
  mainItems = [],
  mainRows = 3,
  onSlotClick,
  selectedIndex,
  x = 7,
  y = 83,
}: PlayerInventoryProps) {
  return (
    <div className={cn("contents", className)}>
      <InventoryGroup
        area="main"
        bare={bare}
        count={mainRows * COLUMNS}
        frameClassName={frameClassName}
        items={mainItems}
        left={x}
        onSlotClick={onSlotClick}
        top={y}
      />
      <InventoryGroup
        area="hotbar"
        bare={bare}
        count={HOTBAR_SLOTS}
        frameClassName={frameClassName}
        items={hotbarItems}
        left={x}
        onSlotClick={onSlotClick}
        selectedIndex={selectedIndex}
        top={hotbarY}
      />
    </div>
  );
}

function InventoryGroup({
  area,
  bare,
  count,
  frameClassName,
  items,
  left,
  onSlotClick,
  selectedIndex,
  top,
}: {
  area: "hotbar" | "main";
  bare: boolean;
  count: number;
  frameClassName?: string;
  items: PlayerInventoryProps["mainItems"];
  left: number;
  onSlotClick?: PlayerInventoryProps["onSlotClick"];
  selectedIndex?: number;
  top: number;
}) {
  return (
    <Grid
      className="absolute"
      columns={COLUMNS}
      style={{ left: gui(left), top: gui(top) }}
    >
      {Array.from({ length: count }, (_, index) => {
        const item = items?.[index];
        return (
          <Slot
            aria-label={`${area}-${index}`}
            bare={bare}
            className={onSlotClick ? "cursor-pointer" : undefined}
            frameClassName={frameClassName}
            key={index}
            onClick={
              onSlotClick
                ? () => {
                    onSlotClick(area, index);
                  }
                : undefined
            }
            selected={area === "hotbar" && selectedIndex === index}
          >
            {item ? <ItemStack bare {...item} /> : null}
          </Slot>
        );
      })}
    </Grid>
  );
}
