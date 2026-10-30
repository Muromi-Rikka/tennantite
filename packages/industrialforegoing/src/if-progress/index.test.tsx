import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfProgress } from "./index";

function fillOf(container: HTMLElement) {
  return container.querySelector(":scope [data-if-progress] div[style*=\"clip-path\"]");
}

describe("ifProgress", () => {
  it("竖条填充自下而上，染色层 multiply", () => {
    const { container } = render(
      <IfProgress color="lime" kind="vertical" left={30} max={1} top={20} value={0.5} />,
    );
    expect(fillOf(container)?.getAttribute("style")).toContain("inset(50% 0 0 0)");
    expect(container.querySelector("[data-if-progress-tint]")?.getAttribute("style")).toContain("multiply");
  });

  it("右箭头自左向右裁剪", () => {
    const { container } = render(
      <IfProgress kind="arrow-right" left={74} max={4} top={42} value={1} />,
    );
    expect(fillOf(container)?.getAttribute("style")).toContain("inset(0 75% 0 0)");
    expect(container.querySelector("[data-if-progress-tint]")).toBeNull();
  });

  it("下箭头自上而下裁剪", () => {
    const { container } = render(
      <IfProgress color="orange" kind="arrow-down" left={100} max={2} top={38} value={1} />,
    );
    expect(fillOf(container)?.getAttribute("style")).toContain("inset(0 0 50% 0)");
  });
});
