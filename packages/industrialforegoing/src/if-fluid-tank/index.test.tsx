import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfFluidTank } from "./index";

describe("ifFluidTank", () => {
  it("按 value/max 自下而上裁剪并暴露 progressbar", () => {
    const { container } = render(
      <IfFluidTank color="blue" left={43} max={1000} name="water" size="normal" tint="#287697" top={20} value={500} />,
    );
    const tank = container.querySelector("[data-if-tank=\"water\"]");
    expect(tank?.getAttribute("aria-valuenow")).toBe("50");
    expect(tank?.getAttribute("style")).toContain("calc(var(--mc-gui) * 56)");
    const fill = container.querySelector("div[style*=\"clip-path\"]");
    expect(fill?.getAttribute("style")).toContain("inset(50% 0 0 0)");
  });

  it("小罐高 19、内部 13", () => {
    const { container } = render(
      <IfFluidTank color="cyan" left={43} max={1} name="ether" size="small" tint="#169C9C" top={57} value={0} />,
    );
    const tank = container.querySelector("[data-if-tank=\"ether\"]");
    expect(tank?.getAttribute("style")).toContain("calc(var(--mc-gui) * 19)");
    expect(container.querySelector("div[style*=\"clip-path\"]")?.getAttribute("style")).toContain("inset(100% 0 0 0)");
  });
});
