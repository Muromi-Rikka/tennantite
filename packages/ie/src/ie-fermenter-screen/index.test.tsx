import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeFermenterScreenDemo } from "../demos";
import { IeFermenterScreen } from "./index";

describe("ieFermenterScreen", () => {
  it("渲染 11 个机器槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeFermenterScreen inputs={[{}, {}, {}, {}, {}, {}, {}, {}]} />);
    expect(container.querySelectorAll("[aria-label^=\"fermenter-\"]")).toHaveLength(11);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"fermenter\"]")).not.toBeNull();
  });

  it("槽位框坐标 = FermenterMenu slot - 1（输入首槽 8,19 → 7,18）", () => {
    render(<IeFermenterScreen inputs={[{}]} />);
    const input = screen.getByLabelText("fermenter-input-0");
    expect(input.style.left).toBe("calc(var(--mc-gui) * 7)");
    expect(input.style.top).toBe("calc(var(--mc-gui) * 18)");
  });

  it("发酵罐与能量条渲染", () => {
    render(<IeFermenterScreen energy={{ max: 32000, value: 12000 }} tank={{ max: 8000, tint: "#7a8f3a", value: 3200 }} />);
    expect(screen.getByRole("progressbar", { name: "发酵器发酵罐" })).toHaveAttribute("aria-valuenow", "40");
    expect(screen.getByRole("progressbar", { name: "发酵器能量" })).toHaveAttribute("aria-valuenow", "38");
  });

  it("demo 渲染", () => {
    render(<IeFermenterScreenDemo />);
    expect(screen.getByText("发酵器")).toBeInTheDocument();
  });
});
