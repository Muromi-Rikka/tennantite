import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CrosshairDemo } from "./demo";
import { Crosshair } from "./index";

describe("crosshair", () => {
  it("渲染十字准星（两根线）", () => {
    const { container } = render(<Crosshair />);
    const hud = container.querySelector("[data-hud]");
    expect(hud?.childElementCount).toBe(2);
  });

  it("hidden 时不渲染", () => {
    const { container } = render(<Crosshair hidden />);
    expect(container.childElementCount).toBe(0);
  });

  it("demo 渲染", () => {
    const { container } = render(<CrosshairDemo />);
    expect(container.childElementCount).toBeGreaterThan(0);
  });
});
