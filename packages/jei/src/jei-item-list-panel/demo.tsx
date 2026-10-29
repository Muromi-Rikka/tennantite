import { JEI_DEMO_PAGE_ITEMS } from "../jei-demo-data";
import { JeiItemListPanel } from "./index";

/**
 * JeiItemListPanel 预览用例：5 个物品，第 1 / 3 页。
 */
export function JeiItemListPanelDemo() {
  return (
    <JeiItemListPanel
      items={JEI_DEMO_PAGE_ITEMS}
      labelPrefix="demo-item"
      onPageChange={() => {}}
      onQueryChange={() => {}}
      onSlotClick={() => {}}
      page={0}
      pageCount={3}
      query=""
    />
  );
}
