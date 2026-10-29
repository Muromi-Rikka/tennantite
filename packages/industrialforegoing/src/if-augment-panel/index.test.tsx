import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfAugmentPanel } from "./index";

describe("ifAugmentPanel", () => {
  it("4 个 PURPLE 槽与物品", () => {
    const { container } = render(<IfAugmentPanel items={[{ icon: "diamond" }]} />);
    expect(container.querySelectorAll("[aria-label^=\"augment-\"]")).toHaveLength(4);
    expect(screen.getByLabelText("augment-0")).toBeInTheDocument();
    expect(container.querySelector("[data-if-sprite=\"titanium_background\"]")?.getAttribute("style")).toContain(
      "calc(var(--mc-gui) * 175)",
    );
  });
});
