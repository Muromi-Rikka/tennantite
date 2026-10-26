import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BrewingStandScreenDemo } from "./demo";
import { BrewingStandScreen } from "./index";

describe("brewingStandScreen", () => {
  it("渲染原料 + 3 瓶位 + 燃料共 5 槽", () => {
    const { container } = render(
      <BrewingStandScreen bottles={[{}, {}, {}]} ingredient={{}} />,
    );
    expect(container.querySelectorAll(".mc-tex-slot[aria-label]").length).toBe(5);
  });

  it("渲染酿造进度条", () => {
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
