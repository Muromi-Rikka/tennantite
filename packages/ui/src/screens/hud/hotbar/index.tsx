import type { PixelIconName } from "@verdigris/textures";
import { ItemStack } from "../../../containers/item-stack/index";
import { cn, gui } from "../../../lib/utils";

export interface HotbarItem {
  count?: number;
  icon?: PixelIconName;
  src?: string;
  tooltip?: string;
}

export interface HotbarProps {
  className?: string;
  /**
  * 9 个快捷栏位的数据（规格 §6.1，物品数据由使用方注入）
  */
  items?: HotbarItem[];
  /**
  * 当前选中槽位索引（0..8）
  */
  selectedIndex?: number;
}

const SLOT_COUNT = 9;
/**
 * 原版：热键栏 182×22，槽位 20×20，步进 20，首槽左上角 (1,1)
*/
const SLOT_SIZE = 20;
const SLOT_STEP = 20;
const FRAME_INSET = 1;

/**
 * MC 快捷栏（规格 §6.1）：原版 182×22 GUI px，9 个 20×20 槽位。
 * 选中框 24×23 围绕 20×20 槽位偏移 (-2,-1)，overlay 语义。
 */
export function Hotbar({ className, items = [], selectedIndex }: HotbarProps) {
  return (
    <div
      className={cn("mc-tex-hotbar relative", className)}
      data-hud=""
      style={{ height: gui(22), width: gui(182) }}
    >
      {Array.from({ length: SLOT_COUNT }, (_, index) => {
        const item = items[index];
        return (
          <div
            className="absolute"
            data-selected={index === selectedIndex ? "" : undefined}
            key={index}
            style={{
              height: gui(SLOT_SIZE),
              left: gui(FRAME_INSET + SLOT_STEP * index),
              top: gui(FRAME_INSET),
              width: gui(SLOT_SIZE),
            }}
          >
            {item
              ? (
                  <ItemStack
                    bare
                    count={item.count}
                    icon={item.icon}
                    size={SLOT_SIZE}
                    src={item.src}
                    tooltip={item.tooltip}
                  />
                )
              : null}
          </div>
        );
      })}
      {selectedIndex === undefined
        ? null
        : (
            <div
              className="mc-tex-hotbar-selection absolute"
              style={{ left: gui(SLOT_STEP * selectedIndex - 1), top: 0 }}
            />
          )}
    </div>
  );
}
