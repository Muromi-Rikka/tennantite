import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { gui } from "../../../lib/utils";
import { Ae2CraftingTerminalScreenDemo } from "./demo";
import { Ae2CraftingTerminalScreen } from "./index";

describe("ae2CraftingTerminalScreen", () => {
  it("渲染 6 行终端网格、3×3 合成区、结果槽与玩家背包", () => {
    const { container } = render(<Ae2CraftingTerminalScreen />);

    expect(container.querySelectorAll("[aria-label^=\"terminal-\"]").length).toBe(54);
    expect(container.querySelectorAll("[aria-label^=\"craft-\"]").length).toBe(10);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
    expect(screen.getByText("合成终端")).toBeInTheDocument();

    expect(screen.getByLabelText("terminal-0")).toHaveStyle({ left: gui(7), top: gui(17) });
    expect(screen.getByLabelText("craft-0")).toHaveStyle({ left: gui(36), top: gui(140) });
    expect(screen.getByLabelText("craft-2")).toHaveStyle({ left: gui(72), top: gui(140) });
    expect(screen.getByLabelText("craft-8")).toHaveStyle({ left: gui(72), top: gui(176) });
    expect(screen.getByLabelText("craft-0")).not.toHaveClass("mc-tex-ae2-slot");

    const result = screen.getByLabelText("craft-result");
    expect(result).toHaveStyle({ height: gui(26), left: gui(126), top: gui(154), width: gui(26) });
    expect(result).not.toHaveClass("mc-tex-ae2-slot");

    expect(screen.getByRole("button", { name: "清空合成格" })).toHaveStyle({ left: gui(92), top: gui(140) });

    expect(container.querySelectorAll("[data-ae2-sprite]").length).toBeGreaterThan(3);

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(212) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(270) });
  });

  it("合成区、工具栏与槽位回调", async () => {
    const user = userEvent.setup();
    const onClearCraftingGrid = vi.fn();
    const onCraftResultClick = vi.fn();
    const onCraftSlotClick = vi.fn();
    const onCraftingStatus = vi.fn();
    const onSearchChange = vi.fn();
    const onSlotClick = vi.fn();
    const onToolbarAction = vi.fn();
    render(
      <Ae2CraftingTerminalScreen
        craftItems={[{ icon: "stone-block" }]}
        craftResult={{ count: 4, icon: "stone-block" }}
        items={[{ icon: "diamond" }]}
        onClearCraftingGrid={onClearCraftingGrid}
        onCraftingStatus={onCraftingStatus}
        onCraftResultClick={onCraftResultClick}
        onCraftSlotClick={onCraftSlotClick}
        onSearchChange={onSearchChange}
        onSlotClick={onSlotClick}
        onToolbarAction={onToolbarAction}
      />,
    );

    await user.click(screen.getByRole("button", { name: "清空合成格" }));
    expect(onClearCraftingGrid).toHaveBeenCalledOnce();

    await user.click(screen.getByLabelText("craft-0"));
    expect(onCraftSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "stone-block" }));
    await user.click(screen.getByLabelText("craft-result"));
    expect(onCraftResultClick).toHaveBeenCalledWith(expect.objectContaining({ count: 4 }));

    const actions = [
      ["按名称排序", "sort-name"],
      ["终端设置", "settings"],
      ["排序方向", "sort-direction"],
      ["查看模式", "view-mode"],
      ["终端样式", "style"],
    ] as const;
    for (const [label, action] of actions) {
      await user.click(screen.getByRole("button", { name: label }));
      expect(onToolbarAction).toHaveBeenLastCalledWith(action);
    }

    await user.click(screen.getByRole("button", { name: "合成状态" }));
    expect(onCraftingStatus).toHaveBeenCalledOnce();

    await user.type(screen.getByLabelText("搜索"), "dia");
    expect(onSearchChange).toHaveBeenLastCalledWith("dia");

    await user.click(screen.getByLabelText("terminal-0"));
    expect(onSlotClick).toHaveBeenCalledWith(0, expect.objectContaining({ icon: "diamond" }));
  });

  it("rows=2 时物品网格收紧、合成区仍贴底边", () => {
    const { container } = render(<Ae2CraftingTerminalScreen rows={2} />);
    expect(container.querySelectorAll("[aria-label^=\"terminal-\"]").length).toBe(18);
    expect(screen.getByLabelText("craft-0")).toHaveStyle({ top: gui(68) });
    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(140) });
  });

  it("demo 渲染 12 行终端", () => {
    const { container } = render(<Ae2CraftingTerminalScreenDemo />);
    expect(container.querySelectorAll("[aria-label^=\"terminal-\"]").length).toBe(108);
    expect(screen.getByText("终端")).toBeInTheDocument();
    expect(screen.getByText("合成终端")).toBeInTheDocument();
  });
});
