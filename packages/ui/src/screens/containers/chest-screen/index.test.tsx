import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ChestScreenDemo } from "./demo";
import { ChestScreen } from "./index";

describe("chestScreen", () => {
  it("单箱渲染 27+9 槽位", () => {
    const { container } = render(<ChestScreen />);
    expect(container.querySelectorAll(".mc-tex-slot[aria-label]").length).toBe(36);
  });

  it("大箱渲染 54+9 槽位", () => {
    const { container } = render(<ChestScreen rows={6} />);
    expect(container.querySelectorAll(".mc-tex-slot[aria-label]").length).toBe(63);
  });

  it("onSlotClick 携带区域", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<ChestScreen onSlotClick={onSlotClick} />);
    await user.click(screen.getByLabelText("main-5"));
    expect(onSlotClick).toHaveBeenCalledWith("main", 5);
  });

  it("demo 渲染", () => {
    render(<ChestScreenDemo />);
    expect(screen.getByText("箱子")).toBeInTheDocument();
    expect(screen.getByText("27")).toBeInTheDocument();
  });
});
