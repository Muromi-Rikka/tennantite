import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfMycelialGeneratorScreen } from "./index";

describe("ifMycelialGeneratorScreen", () => {
  it("slimey 变体：储罐在 x=44，槽位在 x=65", () => {
    const { container, getByLabelText } = render(<IfMycelialGeneratorScreen variant="slimey" />);
    expect(container.querySelector("[data-if-tank=\"input-0\"]")?.getAttribute("style")).toContain(
      "calc(var(--mc-gui) * 44)",
    );
    expect(getByLabelText("input-1").style.left).toBe("calc(var(--mc-gui) * 65)");
  });

  it("furnace 变体只有 1 个输入槽", () => {
    const { container } = render(<IfMycelialGeneratorScreen variant="furnace" />);
    expect(container.querySelectorAll("[aria-label^=\"input-\"]")).toHaveLength(1);
    expect(container.querySelector("[data-if-tank]")).toBeNull();
  });

  it("点击输入槽回调 label", () => {
    const onSlotClick = vi.fn();
    const { getByLabelText } = render(<IfMycelialGeneratorScreen onSlotClick={onSlotClick} variant="furnace" />);
    fireEvent.click(getByLabelText("input-0"));
    expect(onSlotClick).toHaveBeenCalledWith("input-0");
  });
});
