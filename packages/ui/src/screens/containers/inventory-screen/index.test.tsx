import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { InventoryScreenDemo } from "./demo";
import { InventoryScreen } from "./index";

describe("inventoryScreen", () => {
  it("渲染 4 盔甲 + 1 副手 + 4 合成 + 1 产物 + 27 主背包 + 9 快捷栏", () => {
    const { container } = render(<InventoryScreen />);
    expect(container.querySelectorAll("[aria-label^=\"armor-\"]").length).toBe(4);
    expect(container.querySelectorAll("[aria-label=\"offhand-0\"]").length).toBe(1);
    expect(
      container.querySelectorAll("[aria-label^=\"craft-\"]:not([aria-label^=\"craft-result\"])")
        .length,
    ).toBe(4);
    expect(container.querySelectorAll("[aria-label=\"craft-result-0\"]").length).toBe(1);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("注入数据渲染计数徽标", () => {
    render(
      <InventoryScreen
        hotbarItems={[{ count: 64, icon: "stone-block" }]}
        selectedIndex={0}
      />,
    );
    expect(screen.getByText("64")).toBeInTheDocument();
  });

  it("选中索引标记在快捷栏槽位上", () => {
    render(<InventoryScreen selectedIndex={3} />);
    expect(screen.getByLabelText("hotbar-3").className).toContain("mc-slot-selected");
    expect(screen.getByLabelText("hotbar-2").className).not.toContain("mc-slot-selected");
  });

  it("onSlotClick 携带区域与索引", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<InventoryScreen onSlotClick={onSlotClick} />);

    await user.click(screen.getByLabelText("armor-2"));
    await user.click(screen.getByLabelText("offhand-0"));
    await user.click(screen.getByLabelText("craft-3"));
    await user.click(screen.getByLabelText("craft-result-0"));
    await user.click(screen.getByLabelText("main-5"));
    await user.click(screen.getByLabelText("hotbar-3"));

    expect(onSlotClick.mock.calls).toEqual([
      ["armor", 2],
      ["offhand", 0],
      ["craft", 3],
      ["craft-result", 0],
      ["main", 5],
      ["hotbar", 3],
    ]);
  });

  it("无回调时槽位不可点击", () => {
    render(<InventoryScreen />);
    expect(screen.getByLabelText("armor-0").className).not.toContain("cursor-pointer");
  });

  it("渲染玩家预览区", () => {
    render(<InventoryScreen playerPreview={<span>预览</span>} />);
    expect(screen.getByText("预览")).toBeInTheDocument();
  });

  it("demo 渲染", () => {
    render(<InventoryScreenDemo />);
    expect(screen.getByLabelText("armor-0")).toBeInTheDocument();
    expect(screen.getAllByText("64").length).toBeGreaterThan(0);
  });
});
