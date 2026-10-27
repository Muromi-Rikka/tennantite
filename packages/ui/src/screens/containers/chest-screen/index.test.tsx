import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ChestScreen } from "./index";

describe("chestScreen", () => {
  it("3 行使用两段 generic_54 合成 176×167", () => {
    const { container } = render(<ChestScreen items={[]} rows={3} />);
    const sprites = container.querySelectorAll("[data-gui-sprite=\"container/generic_54.png\"]");
    expect(sprites).toHaveLength(2);
    expect(container.querySelectorAll("[aria-label^=\"chest-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
  });

  it("6 行使用整图 176×222", () => {
    const { container } = render(<ChestScreen rows={6} />);
    expect(container.querySelectorAll("[data-gui-sprite=\"container/generic_54.png\"]")).toHaveLength(1);
    expect(container.querySelectorAll("[aria-label^=\"chest-\"]")).toHaveLength(54);
  });
});
