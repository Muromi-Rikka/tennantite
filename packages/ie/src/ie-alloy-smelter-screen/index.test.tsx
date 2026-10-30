import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeAlloySmelterScreenDemo } from "../demos";
import { IeAlloySmelterScreen } from "./index";

describe("ieAlloySmelterScreen", () => {
  it("渲染 4 个机器槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeAlloySmelterScreen inputs={[{}]} />);
    expect(container.querySelectorAll("[aria-label^=\"alloy-smelter-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"alloy_smelter\"]")).not.toBeNull();
  });

  it("槽位框坐标 = AlloySmelterMenu slot - 1（output 120,35 → 119,34）", () => {
    render(<IeAlloySmelterScreen output={{}} />);
    const output = screen.getByLabelText("alloy-smelter-output");
    expect(output.style.left).toBe("calc(var(--mc-gui) * 119)");
    expect(output.style.top).toBe("calc(var(--mc-gui) * 34)");
  });

  it("火焰与箭头进度渲染", () => {
    render(<IeAlloySmelterScreen burn={0.5} process={0.58} />);
    expect(screen.getByRole("progressbar", { name: "合金炉燃烧进度" })).toHaveAttribute("aria-valuenow", "0.5");
    expect(screen.getByRole("progressbar", { name: "合金炉冶炼进度" })).toHaveAttribute("aria-valuenow", "0.58");
  });

  it("demo 渲染", () => {
    render(<IeAlloySmelterScreenDemo />);
    expect(screen.getByText("合金炉")).toBeInTheDocument();
  });
});
