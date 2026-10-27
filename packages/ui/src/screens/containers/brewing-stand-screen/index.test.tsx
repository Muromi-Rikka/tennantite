import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrewingStandScreenDemo } from "./demo";
import { BrewingStandScreen } from "./index";

describe("brewingStandScreen", () => {
  it("渲染燃料 + 原料 + 3 瓶位共 5 槽与玩家背包", () => {
    const { container } = render(
      <BrewingStandScreen bottles={[{}, {}, {}]} ingredient={{}} />,
    );
    expect(container.querySelectorAll('[aria-label^="brewing-"]').length).toBe(5);
    expect(container.querySelectorAll('[aria-label^="main-"]').length).toBe(27);
    expect(container.querySelectorAll('[aria-label^="hotbar-"]').length).toBe(9);
  });

  it("酿造进度反映传入值", () => {
    render(<BrewingStandScreen brewProgress={0.6} />);
    expect(screen.getByRole("progressbar", { name: "酿造进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.6",
    );
  });

  it("demo 渲染", () => {
    render(<BrewingStandScreenDemo />);
    expect(screen.getByText("酿造台")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
