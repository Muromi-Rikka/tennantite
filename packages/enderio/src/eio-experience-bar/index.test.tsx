import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioExperienceBar } from "./index";

describe("eioExperienceBar", () => {
  it("0.6 时填充 38 px 并显示等级", () => {
    const { container } = render(<EioExperienceBar left={56} level={30} progress={0.6} top={68} />);
    const bar = screen.getByRole("progressbar", { name: "经验" });
    expect(bar).toHaveAttribute("aria-valuenow", "60");
    expect(bar.style.left).toBe("calc(var(--mc-gui) * 56)");
    expect(bar.style.top).toBe("calc(var(--mc-gui) * 68)");
    const fill = container.querySelector("[data-gui-sprite=\"sprites/hud/experience_bar_progress.png\"]") as HTMLElement;
    expect(fill.style.width).toBe("calc(var(--mc-gui) * 38)");
    const level = screen.getByText("30");
    expect(level.style.left).toBe("calc(var(--mc-gui) * 88)");
    expect(level.style.top).toBe("calc(var(--mc-gui) * 60)");
    expect(level.style.color).toBe("rgb(128, 255, 32)");
  });

  it("0 时不渲染填充", () => {
    const { container } = render(<EioExperienceBar left={0} level={0} progress={0} top={0} />);
    expect(screen.getByRole("progressbar", { name: "经验" })).toHaveAttribute("aria-valuenow", "0");
    expect(container.querySelector("[data-gui-sprite=\"sprites/hud/experience_bar_progress.png\"]")).toBeNull();
  });

  it("1 时填充 64 px", () => {
    const { container } = render(<EioExperienceBar left={0} level={99} progress={1} top={0} />);
    const fill = container.querySelector("[data-gui-sprite=\"sprites/hud/experience_bar_progress.png\"]") as HTMLElement;
    expect(fill.style.width).toBe("calc(var(--mc-gui) * 64)");
  });
});
