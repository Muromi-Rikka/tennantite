import { ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui, ScreenItemSlot } from "@tennantite/ui";

import type { CreateStockItem } from "./index";
import { CREATE_ATLAS } from "../create-metrics";

const SLOT = CREATE_ATLAS.stockKeeperSlot;

/**
 * 库存管理员 20×20 物品格：槽底贴图 + 16×16 物品 + 右下数量。
 */
export function ItemCell({ item }: { item: CreateStockItem }) {
  return (
    <div className="relative shrink-0" style={{ height: gui(20), width: gui(20) }}>
      <ModSprite left={1} sprite={createSpriteMeta[SLOT.atlas]} src={SLOT} top={1} />
      <div className="absolute" style={{ left: gui(2), top: gui(2) }}>
        <ScreenItemSlot
          frame={false}
          item={{ count: item.count, icon: item.icon, tooltip: item.tooltip }}
          label={`stock-${item.icon}`}
          left={0}
          size={16}
          top={0}
        />
      </div>
      {item.count > 1
        ? (
            <div
              className="absolute font-mc mc-text mc-text-shadow"
              style={{ color: "#ffffff", right: gui(1), top: gui(10) }}
            >
              {formatCount(item.count)}
            </div>
          )
        : null}
    </div>
  );
}

/**
 * 库存管理员物品数量缩写（1000 → 1.2k、10000 → 10k、1000000 → 1m）。
 */
function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${Math.floor(count / 1000000)}m`;
  }
  if (count >= 10000) {
    return `${Math.floor(count / 1000)}k`;
  }
  return count >= 1000 ? `${Math.floor(count / 100) / 10}k` : String(count);
}
