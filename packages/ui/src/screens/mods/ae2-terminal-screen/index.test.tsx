import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { gui } from "../../../lib/utils";
import { Ae2TerminalScreenDemo } from "./demo";
import { Ae2TerminalScreen } from "./index";

describe("ae2TerminalScreen", () => {
  it("渲染 6 行终端网格、搜索框、玩家背包与工具栏", () => {
    const { container } = render(<Ae2TerminalScreen entriesLabel="1-54" />);

    expect(container.querySelectorAll("[aria-label^=\"terminal-\"]").length).toBe(54);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
    expect(screen.getByText("1-54")).toBeInTheDocument();

    const first = screen.getByLabelText("terminal-0");
    expect(first).toHaveStyle({ left: gui(7), top: gui(17) });
    expect(screen.getByLabelText("terminal-53")).toHaveStyle({
      left: gui(151),
      top: gui(107),
    });

    // 槽框由 AE2 贴图烘焙，热区不再自带纹理类
    expect(first).not.toHaveClass("mc-tex-ae2-slot");
    expect(container.querySelectorAll("[data-mod-sprite]").length).toBeGreaterThan(3);

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(139) });
    expect(screen.getByLabelText("main-0")).not.toHaveClass("mc-tex-ae2-slot");
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(197) });

    const search = screen.getByLabelText("搜索");
    expect(search).toHaveAttribute("placeholder", "搜索…");
    expect(search).toHaveStyle({ left: gui(80), width: gui(89) });
  });

  it("工具栏、合成状态与槽位回调", async () => {
    const user = userEvent.setup();
    const onCraftingStatus = vi.fn();
    const onSearchChange = vi.fn();
    const onSlotClick = vi.fn();
    const onToolbarAction = vi.fn();
    render(
      <Ae2TerminalScreen
        items={[{ icon: "diamond" }]}
        onCraftingStatus={onCraftingStatus}
        onSearchChange={onSearchChange}
        onSlotClick={onSlotClick}
        onToolbarAction={onToolbarAction}
      />,
    );

    const actions = [
      ["按名称排序", "sort-name"],
      ["排序方向", "sort-direction"],
      ["查看模式", "view-mode"],
      ["终端设置", "settings"],
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

  it("rows=2 时网格与玩家背包按最小高度收紧", () => {
    const { container } = render(<Ae2TerminalScreen rows={2} />);
    expect(container.querySelectorAll("[aria-label^=\"terminal-\"]").length).toBe(18);
    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(67) });
  });

  it("demo 渲染", () => {
    render(<Ae2TerminalScreenDemo />);
    expect(screen.getByText("ME 终端")).toBeInTheDocument();
  });
});
