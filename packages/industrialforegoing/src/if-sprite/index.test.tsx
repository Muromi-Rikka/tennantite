import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfSprite } from "./index";

describe("ifSprite", () => {
  it("按裁剪区域换算背景位置与尺寸", () => {
    const { container } = render(
      <IfSprite crop="slot" height={18} left={4} name="titanium_background" top={6} width={18} />,
    );
    const sprite = container.querySelector("[data-if-sprite=\"titanium_background\"]");
    expect(sprite).not.toBeNull();
    expect(sprite?.getAttribute("style")).toContain("calc(var(--mc-gui) * 256)");
    expect(sprite?.getAttribute("style")).toContain("calc(var(--mc-gui) * -1)");
    expect(sprite?.getAttribute("style")).toContain("calc(var(--mc-gui) * -185)");
  });

  it("支持显式裁剪与 multiply 染色层", () => {
    const { container } = render(
      <IfSprite
        crop={{ height: 5, sprite: "machines", width: 5, x: 10, y: 20 }}
        height={10}
        name="machines"
        tint="#ff0000"
        width={10}
      />,
    );
    expect(container.querySelector("[data-if-sprite=\"machines\"]")).not.toBeNull();
    expect(container.querySelector("[style*=\"multiply\"]")).not.toBeNull();
  });
});
