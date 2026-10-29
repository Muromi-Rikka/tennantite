import { JEI_DEMO_DIAMOND, JEI_DEMO_GOLD_INGOT, JEI_DEMO_IRON_INGOT } from "../jei-demo-data";
import { JeiBookmarkPanel } from "./index";

/**
 * JeiBookmarkPanel 预览用例：3 个书签，第 1 / 2 页。
 */
export function JeiBookmarkPanelDemo() {
  return (
    <JeiBookmarkPanel
      bookmarks={[JEI_DEMO_IRON_INGOT, JEI_DEMO_GOLD_INGOT, JEI_DEMO_DIAMOND]}
      onOpenHistory={() => {}}
      onPageChange={() => {}}
      onRemoveBookmark={() => {}}
      onToggleBookmarks={() => {}}
      page={0}
      pageCount={2}
    />
  );
}
