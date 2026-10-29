import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { IfLaserBaseScreen } from "./index";

describe("ifLaserBaseScreen", () => {
  it("矿石版：2×3 透镜、5×3 输出、深度输入", () => {
    const onDepthChange = vi.fn();
    const { container } = render(<IfLaserBaseScreen depth="64" onDepthChange={onDepthChange} variant="ore" />);
    expect(container.querySelectorAll("[aria-label^=\"lens-\"]")).toHaveLength(6);
    expect(container.querySelectorAll("[aria-label^=\"output-\"]")).toHaveLength(15);
    expect(container.querySelector("[data-if-energy]")).toBeNull();
    fireEvent.change(screen.getByLabelText("depth"), { target: { value: "128" } });
    expect(onDepthChange).toHaveBeenCalledWith("128");
  });

  it("流体版：单透镜与输出罐", () => {
    const { container } = render(<IfLaserBaseScreen variant="fluid" />);
    expect(container.querySelectorAll("[aria-label^=\"lens\"]")).toHaveLength(1);
    expect(container.querySelector("[data-if-tank=\"output\"]")).not.toBeNull();
  });
});
