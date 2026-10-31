import type { CreateStockItem, CreateStockKeeperCategory } from "./index";
import { CREATE_STOCK_KEEPER } from "../create-metrics";

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

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) {
    out.push(list.slice(i, i + size));
  }
  return out;
}
