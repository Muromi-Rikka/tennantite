import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ScreenPanel } from "../screen-panel/index";
import { PlayerInventory } from "./index";

function renderInPanel(properties: Parameters<typeof PlayerInventory>[0] = {}) {
  return render(
    <ScreenPanel height={166} title="测试" width={176}>
      <PlayerInventory {...properties} />
    </ScreenPanel>,
  );
}

describe("playerInventory", () => {
  it("渲染 27 主背包 + 9 快捷栏槽位", () => {
    const { container } = renderInPanel();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
  });

  it("默认坐标照抄原版：(7,83) 主背包 / (7,141) 快捷栏", () => {
    const { container } = renderInPanel();
    const main = container.querySelector("[aria-label=\"main-0\"]")?.parentElement;
    const hotbar = container.querySelector("[aria-label=\"hotbar-0\"]")?.parentElement;
    expect(main).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 7)"));
    expect(main).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 83)"));
    expect(hotbar).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 141)"));
  });

  it("点击主背包槽位回调 (\"main\", 3)", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    renderInPanel({ onSlotClick });
    await user.click(screen.getByLabelText("main-3"));
    expect(onSlotClick).toHaveBeenCalledWith("main", 3);
  });

  it("点击快捷栏槽位回调 (\"hotbar\", 2)", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    renderInPanel({ onSlotClick });
    await user.click(screen.getByLabelText("hotbar-2"));
    expect(onSlotClick).toHaveBeenCalledWith("hotbar", 2);
  });

  it("注入物品渲染图标与计数，选中索引标记快捷栏", () => {
    const { container } = renderInPanel({
      hotbarItems: [{ count: 64, icon: "stone-block" }],
      selectedIndex: 0,
    });
    expect(screen.getByText("64")).toBeInTheDocument();
    expect(container.querySelector("[aria-label=\"hotbar-0\"]")).toHaveClass("mc-slot-selected");
    expect(container.querySelector("[aria-label=\"main-0\"]")).not.toHaveClass("mc-slot-selected");
  });

  it("自定义坐标覆盖默认值", () => {
    const { container } = renderInPanel({ hotbarY: 197, x: 35, y: 139 });
    const main = container.querySelector("[aria-label=\"main-0\"]")?.parentElement;
    const hotbar = container.querySelector("[aria-label=\"hotbar-0\"]")?.parentElement;
    expect(main).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 35)"));
    expect(main).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 139)"));
    expect(hotbar).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 197)"));
  });
});
