import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { JEI_INGREDIENT_CELL, JEI_ITEM_LIST } from "../jei-metrics";
import { JeiItemListPanel } from "./index";

const IRON: ScreenSlot = { count: 1, icon: "iron-ingot", tooltip: "铁锭" };

function renderPanel(overrides: Partial<Parameters<typeof JeiItemListPanel>[0]> = {}) {
  return render(
    <JeiItemListPanel
      items={[IRON]}
      onPageChange={() => {}}
      onQueryChange={() => {}}
      onSlotClick={() => {}}
      page={1}
      pageCount={3}
      query=""
      {...overrides}
    />,
  );
}

describe("jeiItemListPanel", () => {
  it("渲染 rows×columns 个槽位并注入物品", () => {
    renderPanel({ columns: 2, rows: 2 });
    expect(screen.getByLabelText("jei-item-0")).toBeInTheDocument();
    expect(screen.getByLabelText("jei-item-3")).toBeInTheDocument();
  });

  it("搜索框输入触发 onQueryChange", async () => {
    const onQueryChange = vi.fn();
    renderPanel({ onQueryChange });
    fireEvent.change(screen.getByLabelText("搜索"), { target: { value: "铁" } });
    expect(onQueryChange).toHaveBeenCalledWith("铁");
  });

  it("翻页箭头按当前页回调目标页", () => {
    const onPageChange = vi.fn();
    renderPanel({ onPageChange, page: 1, pageCount: 3 });
    fireEvent.click(screen.getByLabelText("上一页"));
    expect(onPageChange).toHaveBeenCalledWith(0);
    fireEvent.click(screen.getByLabelText("下一页"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("首页禁用上一页、末页禁用下一页", () => {
    const first = renderPanel({ page: 0 });
    expect(first.getByLabelText("上一页")).toBeDisabled();
    first.unmount();
    const last = renderPanel({ page: 2, pageCount: 3 });
    expect(last.getByLabelText("下一页")).toBeDisabled();
  });

  it("面板背景与槽位框按常量定位", () => {
    const { container } = renderPanel({ columns: 1, rows: 2 });
    const background = container.querySelector("[data-jei-sprite='ingredient_list_background_v2']") as HTMLElement;
    expect(background.style.width).toBe(`calc(var(--mc-gui) * ${JEI_INGREDIENT_CELL + JEI_ITEM_LIST.panelPadding * 2})`);
    const slotFrame = container.querySelector("[data-jei-sprite='ingredient_list_slot_background_v2']") as HTMLElement;
    expect(slotFrame.style.left).toBe("calc(var(--mc-gui) * 61)");
  });

  it("点击槽位回调 index 与物品", () => {
    const onSlotClick = vi.fn();
    renderPanel({ items: [IRON], onSlotClick });
    fireEvent.click(screen.getByLabelText("jei-item-0"));
    expect(onSlotClick).toHaveBeenCalledWith(0, IRON);
  });
});
