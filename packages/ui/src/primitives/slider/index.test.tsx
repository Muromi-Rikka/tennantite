import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "./index";

describe("slider", () => {
  it("渲染轨道与把手", () => {
    render(<Slider aria-label="音量" defaultValue={40} />);
    expect(document.querySelector(".mc-tex-slider-track")).not.toBeNull();
    expect(document.querySelector(".mc-tex-slider-thumb")).not.toBeNull();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "40");
  });

  it("aria-label 传递给可访问的 input（role slider）", () => {
    render(<Slider aria-label="音量" defaultValue={40} />);
    expect(screen.getByRole("slider", { name: "音量" })).toHaveAttribute(
      "aria-valuenow",
      "40",
    );
  });

  it("键盘方向键调整值", async () => {
    const user = userEvent.setup();
    render(<Slider aria-label="音量" defaultValue={40} />);
    const input = screen.getByRole("slider");
    input.focus();
    await user.keyboard("{ArrowRight}");
    expect(input).toHaveAttribute("aria-valuenow", "41");
    await user.keyboard("{ArrowLeft}");
    expect(input).toHaveAttribute("aria-valuenow", "40");
  });

  it("onValueChange 回调", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Slider aria-label="音量" defaultValue={10} onValueChange={onValueChange} />,
    );
    screen.getByRole("slider").focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalled();
  });
});
