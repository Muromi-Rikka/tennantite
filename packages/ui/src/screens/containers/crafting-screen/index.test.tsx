import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CraftingScreenDemo } from "./demo";
import { CraftingScreen } from "./index";

describe("craftingScreen", () => {
  it("渲染 9 合成格 + 1 产物 + 27 主背包 + 9 快捷栏", () => {
    const { container } = render(<CraftingScreen />);
    expect(
      container.querySelectorAll('[aria-label^="craft-"]:not([aria-label^="craft-result"])')
        .length,
    ).toBe(9);
    expect(container.querySelectorAll('[aria-label="craft-result-0"]').length).toBe(1);
    expect(container.querySelectorAll('[aria-label^="main-"]').length).toBe(27);
    expect(container.querySelectorAll('[aria-label^="hotbar-"]').length).toBe(9);
  });

  it("onSlotClick 携带区域与索引", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<CraftingScreen onSlotClick={onSlotClick} />);

    await user.click(screen.getByLabelText("craft-4"));
    await user.click(screen.getByLabelText("craft-result-0"));
    await user.click(screen.getByLabelText("main-26"));
    await user.click(screen.getByLabelText("hotbar-3"));

    expect(onSlotClick.mock.calls).toEqual([
      ["craft", 4],
      ["craft-result", 0],
      ["main", 26],
      ["hotbar", 3],
    ]);
  });

  it("选中索引标记在快捷栏槽位上", () => {
    render(<CraftingScreen selectedIndex={1} />);
    expect(screen.getByLabelText("hotbar-1").className).toContain("mc-slot-selected");
  });

  it("demo 渲染", () => {
    render(<CraftingScreenDemo />);
    expect(screen.getByText("合成")).toBeInTheDocument();
  });
});
