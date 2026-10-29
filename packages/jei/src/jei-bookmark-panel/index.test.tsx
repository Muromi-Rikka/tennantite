import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { JEI_BOOKMARK, JEI_INGREDIENT_CELL } from "../jei-metrics";
import { JeiBookmarkPanel } from "./index";

const IRON: ScreenSlot = { count: 1, icon: "iron-ingot", tooltip: "铁锭" };
const GOLD: ScreenSlot = { count: 2, icon: "gold-ingot", tooltip: "金锭" };

describe("jeiBookmarkPanel", () => {
  it("渲染书签槽并注入物品", () => {
    render(<JeiBookmarkPanel bookmarks={[IRON, GOLD]} page={0} pageCount={1} />);
    expect(screen.getByLabelText("jei-bookmark-0")).toBeInTheDocument();
    expect(screen.getByLabelText("jei-bookmark-1")).toBeInTheDocument();
    expect(screen.queryByLabelText("jei-bookmark-2")).not.toBeInTheDocument();
  });

  it("点击书签回调 index 与书签", () => {
    const onRemoveBookmark = vi.fn();
    render(
      <JeiBookmarkPanel bookmarks={[IRON]} onRemoveBookmark={onRemoveBookmark} page={0} pageCount={1} />,
    );
    fireEvent.click(screen.getByLabelText("jei-bookmark-0"));
    expect(onRemoveBookmark).toHaveBeenCalledWith(0, IRON);
  });

  it("翻页箭头回调目标页", () => {
    const onPageChange = vi.fn();
    render(
      <JeiBookmarkPanel onPageChange={onPageChange} page={1} pageCount={3} />,
    );
    fireEvent.click(screen.getByLabelText("上一页"));
    expect(onPageChange).toHaveBeenCalledWith(0);
    fireEvent.click(screen.getByLabelText("下一页"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("底部书签/历史按钮触发回调", () => {
    const onToggleBookmarks = vi.fn();
    const onOpenHistory = vi.fn();
    render(
      <JeiBookmarkPanel
        onOpenHistory={onOpenHistory}
        onToggleBookmarks={onToggleBookmarks}
        page={0}
        pageCount={1}
      />,
    );
    fireEvent.click(screen.getByLabelText("书签"));
    expect(onToggleBookmarks).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByLabelText("查阅历史"));
    expect(onOpenHistory).toHaveBeenCalledOnce();
  });

  it("书签槽使用 18×18 单元常量定位（面板靠右）", () => {
    const { container } = render(<JeiBookmarkPanel bookmarks={[IRON]} page={0} pageCount={1} />);
    const slotFrame = container.querySelector("[data-jei-sprite='bookmark_list_slot_background_v2']") as HTMLElement;
    // 宽 42（按钮行），面板宽 20 靠右 → 面板左沿 22，槽位内边距 1
    const panelLeft = JEI_BOOKMARK.buttonSize * 2 + JEI_BOOKMARK.buttonGap - (JEI_INGREDIENT_CELL + JEI_BOOKMARK.panelPadding * 2);
    expect(slotFrame.style.left).toBe(`calc(var(--mc-gui) * ${panelLeft + JEI_BOOKMARK.panelPadding})`);
    expect(slotFrame.style.top).toBe(`calc(var(--mc-gui) * ${JEI_BOOKMARK.panelPadding})`);
    expect(slotFrame.style.width).toBe(`calc(var(--mc-gui) * ${JEI_INGREDIENT_CELL})`);
  });
});
