import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_FILTER } from "../create-metrics";
import { CreateFilterScreen } from "./index";

function renderFilter(overrides: Partial<Parameters<typeof CreateFilterScreen>[0]> = {}) {
  return render(
    <CreateFilterScreen
      match="allow"
      mode="and"
      onMatchChange={() => {}}
      onModeChange={() => {}}
      {...overrides}
    />,
  );
}

describe("createFilterScreen", () => {
  it("渲染 2×9 幽灵物品格", () => {
    renderFilter({ items: [{ count: 1, icon: "iron-ingot" }] });
    expect(screen.getByLabelText("filter-slot-0")).toBeInTheDocument();
    expect(screen.getByLabelText("filter-slot-17")).toBeInTheDocument();
  });

  it("aND/OR 切换回调目标模式", () => {
    const onModeChange = vi.fn();
    renderFilter({ mode: "and", onModeChange });
    fireEvent.click(screen.getByLabelText("任一满足（OR）"));
    expect(onModeChange).toHaveBeenCalledWith("or");
    fireEvent.click(screen.getByLabelText("全部满足（AND）"));
    expect(onModeChange).toHaveBeenCalledWith("and");
  });

  it("黑名单/白名单两态回调", () => {
    const onMatchChange = vi.fn();
    renderFilter({ match: "allow", onMatchChange });
    fireEvent.click(screen.getByLabelText("黑名单"));
    expect(onMatchChange).toHaveBeenCalledWith("deny");
    fireEvent.click(screen.getByLabelText("白名单"));
    expect(onMatchChange).toHaveBeenCalledWith("allow");
  });

  it("nBT 两态按钮回调布尔值", () => {
    const onRespectDataChange = vi.fn();
    renderFilter({ onRespectDataChange, respectData: false });
    fireEvent.click(screen.getByLabelText("比对 NBT"));
    expect(onRespectDataChange).toHaveBeenCalledWith(true);
    fireEvent.click(screen.getByLabelText("忽略 NBT"));
    expect(onRespectDataChange).toHaveBeenCalledWith(false);
  });

  it("激活按钮带 aria-pressed", () => {
    renderFilter({ match: "deny", mode: "or" });
    expect(screen.getByLabelText("黑名单")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("白名单")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByLabelText("任一满足（OR）")).toHaveAttribute("aria-pressed", "true");
  });

  it("物品格按常量定位", () => {
    const { container } = renderFilter();
    const slot = container.querySelector("[aria-label='filter-slot-1']") as HTMLElement;
    expect(slot.style.left).toBe(`calc(var(--mc-gui) * ${CREATE_FILTER.grid.left + 18})`);
    expect(slot.style.top).toBe(`calc(var(--mc-gui) * ${CREATE_FILTER.grid.top})`);
  });

  it("点击物品格回调 index 与物品", () => {
    const item: ScreenSlot = { count: 3, icon: "iron-ingot" };
    const onSlotClick = vi.fn();
    renderFilter({ items: [item], onSlotClick });
    fireEvent.click(screen.getByLabelText("filter-slot-0"));
    expect(onSlotClick).toHaveBeenCalledWith(0, item);
  });
});
