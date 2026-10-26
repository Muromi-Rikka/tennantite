import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SlotDemo } from "./demo";
import { Slot } from "./index";

describe("slot", () => {
  it("渲染凹槽并应用尺寸", () => {
    render(<Slot data-testid="slot" size={64} />);
    const slot = screen.getByTestId("slot");
    expect(slot).toHaveClass("mc-tex-slot");
    expect(slot).toHaveStyle({ height: "64px", width: "64px" });
  });

  it("selected 显示白色描边", () => {
    render(<Slot data-testid="slot" selected />);
    expect(screen.getByTestId("slot")).toHaveClass("outline-2");
  });

  it("未选中无描边", () => {
    render(<Slot data-testid="slot" />);
    expect(screen.getByTestId("slot")).not.toHaveClass("outline-2");
  });

  it("demo 渲染 4×2 栅格", () => {
    render(<SlotDemo />);
    expect(document.querySelectorAll(".mc-tex-slot").length).toBeGreaterThanOrEqual(8);
  });
});
