import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeRefineryScreenDemo } from "../demos";
import { IeRefineryScreen } from "./index";

describe("ieRefineryScreen", () => {
  it("渲染 3 个机器槽位与背景贴图", () => {
    const { container } = render(<IeRefineryScreen catalyst={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"refinery-\"]")).toHaveLength(3);
    expect(container.querySelector("[data-ie-sprite=\"refinery\"]")).not.toBeNull();
  });

  it("槽位框坐标 = RefineryMenu slot - 1（催化剂 73,26 → 72,25）", () => {
    render(<IeRefineryScreen catalyst={{}} />);
    const catalyst = screen.getByLabelText("refinery-catalyst");
    expect(catalyst.style.left).toBe("calc(var(--mc-gui) * 72)");
    expect(catalyst.style.top).toBe("calc(var(--mc-gui) * 25)");
  });

  it("三罐按 FluidInfoArea 渲染（左 50%、右 75%、输出 20%）", () => {
    render(
      <IeRefineryScreen
        tanks={[
          { max: 12000, tint: "#3d3a33", value: 6000 },
          { max: 12000, tint: "#5b4a2c", value: 9000 },
          { max: 12000, tint: "#8a7a2e", value: 2400 },
        ]}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "精炼厂左输入罐" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByRole("progressbar", { name: "精炼厂右输入罐" })).toHaveAttribute("aria-valuenow", "75");
    expect(screen.getByRole("progressbar", { name: "精炼厂输出罐" })).toHaveAttribute("aria-valuenow", "20");
    const { container } = render(<IeRefineryScreen tanks={[null, null, null]} />);
    expect(container.querySelectorAll("[data-ie-fluid-tank]")).toHaveLength(0);
  });

  it("能量条渲染", () => {
    render(<IeRefineryScreen energy={{ max: 32000, value: 8000 }} />);
    expect(screen.getByRole("progressbar", { name: "精炼厂能量" })).toHaveAttribute("aria-valuenow", "25");
  });

  it("demo 渲染", () => {
    render(<IeRefineryScreenDemo />);
    expect(screen.getByText("精炼厂")).toBeInTheDocument();
  });
});
