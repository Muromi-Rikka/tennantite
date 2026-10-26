import type { PixelIconName } from "@verdigris/textures";
import { ItemStack } from "../../../containers/item-stack/index";

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
  /**
  * 槽位边长（px，默认 48）
  */
  size?: number;
}

const DEFAULT_SIZE = 48;

/**
 * MC 快捷栏（规格 §6.1）：底部 9 格，选中态白色像素描边，overlay 语义。
*/
export function Hotbar({
  className,
  items = [],
  selectedIndex,
  size = DEFAULT_SIZE,
}: HotbarProps) {
  const slots = Array.from({ length: 9 }, (_, index) => items[index] ?? {});
  return (
    <div className={className} data-hud="">
      <div className="flex gap-1 border-2 border-black/60 bg-black/50 p-1">
        {slots.map((item, index) => (
          <ItemStack
            count={item.count}
            icon={item.icon}
            key={index}
            selected={index === selectedIndex}
            size={size}
            src={item.src}
            tooltip={item.tooltip}
          />
        ))}
      </div>
    </div>
  );
}
