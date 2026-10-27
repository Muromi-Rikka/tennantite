import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ChestScreenDemo } from "./demo";
import { ChestScreen } from "./index";

describe("chestScreen", () => {
  it("单箱渲染 27 容器槽 + 玩家背包 27+9", () => {
    const { container } = render(<ChestScreen />);
    expect(container.querySelectorAll("[aria-label^=\"chest-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("大箱渲染 54 容器槽", () => {
    const { container } = render(<ChestScreen rows={6} />);
    expect(container.querySelectorAll("[aria-label^=\"chest-\"]").length).toBe(54);
  });

  it("onSlotClick 携带区域与索引", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<ChestScreen onSlotClick={onSlotClick} rows={6} />);

    await user.click(screen.getByLabelText("chest-53"));
    await user.click(screen.getByLabelText("main-4"));
    await user.click(screen.getByLabelText("hotbar-2"));

    expect(onSlotClick.mock.calls).toEqual([
      ["secondary", 53],
      ["main", 4],
      ["hotbar", 2],
    ]);
  });

  it("demo 渲染", () => {
    render(<ChestScreenDemo />);
    expect(screen.getByText("箱子")).toBeInTheDocument();
    expect(screen.getByText("27")).toBeInTheDocument();
  });
});
