import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FdCookingProgress } from "./index";

describe("fdCookingProgress", () => {
  it("按比例自左向右裁剪箭头并暴露 progressbar 语义", () => {
    const { container } = render(<FdCookingProgress progress={0.5} />);
    const bar = screen.getByRole("progressbar", { name: "烹饪进度" });
    expect(bar).toHaveAttribute("aria-valuenow", "0.5");
    expect(bar.style.left).toBe("calc(var(--mc-gui) * 89)");
    expect(bar.style.top).toBe("calc(var(--mc-gui) * 25)");
    expect(bar.style.width).toBe("calc(var(--mc-gui) * 25)");
    expect(bar.style.height).toBe("calc(var(--mc-gui) * 17)");
    expect(bar.firstElementChild?.getAttribute("style")).toContain("inset(0 50%");
    expect(container.querySelector("[data-fd-sprite=\"cooking_pot\"]")).not.toBeNull();
  });

  it("进度夹取到 0..1", () => {
    render(<FdCookingProgress progress={2} />);
    expect(screen.getByRole("progressbar", { name: "烹饪进度" })).toHaveAttribute("aria-valuenow", "1");
  });

  it("left / top / label 可覆盖", () => {
    render(<FdCookingProgress label="自定义" left={0} top={0} />);
    const bar = screen.getByRole("progressbar", { name: "自定义" });
    expect(bar.style.left).toBe("calc(var(--mc-gui) * 0)");
    expect(bar.style.top).toBe("calc(var(--mc-gui) * 0)");
    expect(bar).toHaveAttribute("aria-valuenow", "0");
  });
});
