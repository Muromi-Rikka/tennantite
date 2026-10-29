import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IfDissolutionChamberScreen } from "./index";

describe("ifDissolutionChamberScreen", () => {
  it("复刻溶解成型机的槽位、罐、能量、面按钮与右侧面板", () => {
    const { container } = render(
      <IfDissolutionChamberScreen
        energy={{ max: 2, value: 1 }}
        inputFluid={{ max: 1000, tint: "#41CD34", value: 500 }}
        inputs={[
          { icon: "diamond" },
          { icon: "wheat" },
        ]}
        output={{ icon: "potion" }}
        outputFluid={{ max: 1000, tint: "#B24CD8", value: 250 }}
        progress={0.5}
      />,
    );

    expect(container.querySelector("[data-if-machine=\"dissolutionChamber\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"input-\"]")).toHaveLength(8);
    expect(container.querySelectorAll("[aria-label^=\"output-\"]")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByText("溶解成型机")).toBeInTheDocument();

    const root = container.querySelector("[data-if-screen]");
    expect(root?.getAttribute("style")).toContain("calc(var(--mc-gui) * 227)");

    const background = container.querySelector("[data-if-sprite=\"titanium_background\"]");
    expect(background?.getAttribute("style")).toContain("calc(var(--mc-gui) * 176)");
    expect(background?.getAttribute("style")).toContain("calc(var(--mc-gui) * 184)");

    expect(container.querySelector("[data-if-energy]")?.getAttribute("aria-valuenow")).toBe("50");
    expect(container.querySelectorAll("[data-if-tank]")).toHaveLength(2);
    expect(container.querySelectorAll("[data-if-face]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"augment-\"]")).toHaveLength(4);
    expect(container.querySelector("[aria-label=\"fluid-input\"]")).not.toBeNull();
    expect(container.querySelector("[aria-label=\"fluid-output\"]")).not.toBeNull();
  });
});
