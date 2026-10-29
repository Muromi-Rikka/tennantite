import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FdHeatIndicator } from "./index";

describe("fdHeatIndicator", () => {
  it("受热时绘制火焰贴图", () => {
    const { container } = render(<FdHeatIndicator heated />);
    expect(screen.getByRole("img", { name: "已受热" })).toBeInTheDocument();
    expect(container.querySelector("[data-fd-sprite=\"cooking_pot\"]")).not.toBeNull();
  });

  it("未受热时保留热区但不绘制贴图", () => {
    const { container } = render(<FdHeatIndicator heated={false} />);
    const hotspot = screen.getByRole("img", { name: "下方需要热源" });
    expect(hotspot).toHaveAttribute("title", "下方需要热源");
    expect(container.querySelector("[data-fd-sprite]")).toBeNull();
    expect((hotspot as HTMLElement).style.width).toBe("calc(var(--mc-gui) * 17)");
    expect((hotspot as HTMLElement).style.height).toBe("calc(var(--mc-gui) * 15)");
    expect((hotspot as HTMLElement).style.left).toBe("calc(var(--mc-gui) * 47)");
    expect((hotspot as HTMLElement).style.top).toBe("calc(var(--mc-gui) * 55)");
  });

  it("left / top 可覆盖默认位置", () => {
    render(<FdHeatIndicator heated label="custom" left={2} top={3} />);
    const hotspot = screen.getByRole("img", { name: "custom" }) as HTMLElement;
    expect(hotspot.style.left).toBe("calc(var(--mc-gui) * 2)");
    expect(hotspot.style.top).toBe("calc(var(--mc-gui) * 3)");
  });
});
