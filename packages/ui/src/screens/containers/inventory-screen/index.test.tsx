import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { InventoryScreenDemo } from "./demo";
import { InventoryScreen } from "./index";

describe("inventoryScreen", () => {
  it("渲染 4 盔甲 + 4 合成 + 27 主背包 + 9 快捷栏 + 1 产物槽位", () => {
    const { container } = render(<InventoryScreen />);
    expect(container.querySelectorAll(".mc-tex-slot[aria-label]").length).toBe(45);
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

  it("onSlotClick 携带区域与索引", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<InventoryScreen hotbarItems={[null]} onSlotClick={onSlotClick} />);
    await user.click(screen.getByLabelText("hotbar-3"));
    expect(onSlotClick).toHaveBeenCalledWith("hotbar", 3);
  });

  it("demo 渲染", () => {
    render(<InventoryScreenDemo />);
    expect(screen.getByText("物品栏")).toBeInTheDocument();
    expect(screen.getAllByText("64").length).toBeGreaterThan(0);
  });
});
