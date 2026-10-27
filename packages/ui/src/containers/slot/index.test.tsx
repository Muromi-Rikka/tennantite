import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SlotDemo } from "./demo";
import { Slot } from "./index";

describe("slot", () => {
  it("渲染凹槽并按 GUI px 折算尺寸", () => {
    render(<Slot data-testid="slot" size={26} />);
    const slot = screen.getByTestId("slot");
    expect(slot).toHaveClass("mc-tex-slot");
    expect(slot).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 26)"));
  });

  it("默认 18 GUI px（原版槽位）", () => {
    render(<Slot data-testid="slot" />);
    const slot = screen.getByTestId("slot");
    expect(slot).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 18)"));
  });

  it("bare 不绘制槽位纹理", () => {
    render(<Slot bare data-testid="slot" />);
    expect(screen.getByTestId("slot")).not.toHaveClass("mc-tex-slot");
  });

  it("selected 显示 1 GUI px 白色内框", () => {
    render(<Slot data-testid="slot" selected />);
    expect(screen.getByTestId("slot")).toHaveClass("mc-slot-selected");
  });

  it("未选中无内框", () => {
    render(<Slot data-testid="slot" />);
    expect(screen.getByTestId("slot")).not.toHaveClass("mc-slot-selected");
  });

  it("demo 渲染 4×2 栅格", () => {
    render(<SlotDemo />);
    expect(document.querySelectorAll(".mc-tex-slot").length).toBeGreaterThanOrEqual(8);
  });
});
