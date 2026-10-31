import { ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import type { StockRow } from "./build-stock-rows";
import { CREATE_ATLAS, CREATE_STOCK_KEEPER } from "../create-metrics";
import { ItemCell } from "./item-cell";

/**
 * 库存管理员物品视口内容：分类行（显示/隐藏图标 + 名称）与 9 列物品行。
 */
export function StockRows({ rows }: { rows: StockRow[] }) {
  const atlas = CREATE_ATLAS;
  return (
    <>
      {rows.map(row =>
        row.category
          ? (
              <div
                className="absolute flex items-center"
                key={row.category.id}
                style={{ left: gui(CREATE_STOCK_KEEPER.items.left), top: gui(row.top) }}
              >
                <ModSprite
                  sprite={createSpriteMeta[(row.hidden ? atlas.stockKeeperCategoryHidden : atlas.stockKeeperCategoryShown).atlas]}
                  src={row.hidden ? atlas.stockKeeperCategoryHidden : atlas.stockKeeperCategoryShown}
                />
                <span className="font-mc mc-text mc-text-shadow" style={{ color: "#f8f8ec", marginLeft: gui(2) }}>
                  {row.category.name ?? "未分类"}
                </span>
              </div>
            )
          : (
              <div
                className="absolute flex"
                key={`row-${row.top}`}
                style={{ left: gui(CREATE_STOCK_KEEPER.items.left), top: gui(row.top) }}
              >
                {row.items?.map(item => <ItemCell item={item} key={`${item.icon}-${item.count}`} />)}
              </div>
            ))}
    </>
  );
}
