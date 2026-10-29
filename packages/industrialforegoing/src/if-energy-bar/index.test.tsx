import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfEnergyBar } from "./index";

describe("ifEnergyBar", () => {
  it("渲染 18×56 外框与百分比填充", () => {
    const { container } = render(<IfEnergyBar max={4} value={1} />);
    const bar = container.querySelector("[data-if-energy]");
    expect(bar?.getAttribute("aria-valuenow")).toBe("25");
    expect(bar?.getAttribute("style")).toContain("calc(var(--mc-gui) * 10)");
    expect(bar?.getAttribute("style")).toContain("calc(var(--mc-gui) * 20)");
    expect(container.querySelector("div[style*=\"clip-path\"]")?.getAttribute("style")).toContain("inset(75% 0 0 0)");
  });

  it("max=0 时为空", () => {
    const { container } = render(<IfEnergyBar max={0} value={10} />);
    expect(container.querySelector("[data-if-energy]")?.getAttribute("aria-valuenow")).toBe("0");
  });
});
