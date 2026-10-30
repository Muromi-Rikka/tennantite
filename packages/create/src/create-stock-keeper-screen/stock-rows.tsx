import { ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { gui } from "@tennantite/ui";

import type { CreateStockItem, CreateStockKeeperCategory } from "./index";
import { CREATE_ATLAS, CREATE_STOCK_KEEPER } from "../create-metrics";
import { ItemCell } from "./item-cell";

export interface StockRow {
  category?: CreateStockKeeperCategory;
  hidden?: boolean;
  items?: CreateStockItem[];
  top: number;
}

/**
 * 分类行 + 物品行统一 20px 栅格排布（窗口坐标）。
 */
export function buildStockRows({
  categories,
  items,
}: {
  categories?: CreateStockKeeperCategory[];
  items?: CreateStockItem[];
}): StockRow[] {
  const layout = CREATE_STOCK_KEEPER;
  const groups: CreateStockKeeperCategory[] = categories ?? [{ id: "unsorted", items: items ?? [] }];
  const rows: StockRow[] = [];
  let y = layout.items.top;
  for (const category of groups) {
    if (categories) {
      rows.push({ category, hidden: category.hidden, top: y });
      y += layout.rowHeight;
    }
    const itemRows = chunk(category.items, layout.columns);
    for (const [index, rowItems] of itemRows.entries()) {
      rows.push({ items: rowItems, top: y + index * layout.rowHeight });
    }
    y += itemRows.length * layout.rowHeight;
  }
  return rows;
}

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

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size));
  }
  return out;
}
