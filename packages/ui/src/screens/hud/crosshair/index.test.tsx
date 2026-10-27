import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CrosshairDemo } from "./demo";
import { Crosshair } from "./index";

describe("crosshair", () => {
  it("渲染原版 15×15 准星精灵", () => {
    const { container } = render(<Crosshair />);
    expect(container.querySelector("[data-gui-sprite=\"sprites/hud/crosshair.png\"]")).toBeInTheDocument();
  });

  it("hidden 不渲染", () => {
    const { container } = render(<Crosshair hidden />);
    expect(container).toBeEmptyDOMElement();
  });

  it("demo 渲染", () => {
    const { container } = render(<CrosshairDemo />);
    expect(container.querySelectorAll("[data-gui-sprite=\"sprites/hud/crosshair.png\"]").length).toBe(2);
  });
});
