import { containerSlots } from "@tennantite/textures";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CrafterScreen } from "./index";

const layout = containerSlots["container/crafter.png"];

describe("crafterScreen", () => {
  it("3×3 槽位使用生成的 18×18 槽框原点", () => {
    const { container } = render(<CrafterScreen />);
    const grid = layout.slots18.slice(0, 9);
    expect(grid).toHaveLength(9);
    for (const [index, [left, top]] of grid.entries()) {
      const slot = container.querySelector(`[aria-label="crafter-${CSS.escape(String(index))}"]`);
      expect(slot).toHaveStyle({
        left: `calc(var(--mc-gui) * ${left})`,
        top: `calc(var(--mc-gui) * ${top})`,
      });
    }
  });

  it("结果槽使用 26×26 槽框原点，物品居中 +5", () => {
    const { container } = render(<CrafterScreen />);
    const output = container.querySelector("[aria-label=\"crafter-output\"]");
    expect(output).toHaveStyle({
      height: "calc(var(--mc-gui) * 26)",
      left: "calc(var(--mc-gui) * 129)",
      top: "calc(var(--mc-gui) * 30)",
      width: "calc(var(--mc-gui) * 26)",
    });
  });

  it("disabled 覆盖层与槽框原点一致", () => {
    const { container } = render(<CrafterScreen disabledSlots={[0]} />);
    const [left, top] = layout.slots18[0];
    const overlay = container.querySelector(
      "[data-gui-sprite=\"sprites/container/crafter/disabled_slot.png\"]",
    );
    expect(overlay).toHaveStyle({
      left: `calc(var(--mc-gui) * ${left})`,
      top: `calc(var(--mc-gui) * ${top})`,
    });
  });
});
