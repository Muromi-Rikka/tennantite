import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeSqueezerScreenDemo } from "../demos";
import { IeSqueezerScreen } from "./index";

describe("ieSqueezerScreen", () => {
  it("渲染 11 个机器槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeSqueezerScreen inputs={[{}, {}, {}, {}, {}, {}, {}, {}]} />);
    expect(container.querySelectorAll("[aria-label^=\"squeezer-\"]")).toHaveLength(11);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"squeezer\"]")).not.toBeNull();
  });

  it("槽位框坐标 = SqueezerMenu slot - 1（输入首槽 8,35 → 7,34）", () => {
    render(<IeSqueezerScreen inputs={[{}]} />);
    const input = screen.getByLabelText("squeezer-input-0");
    expect(input.style.left).toBe("calc(var(--mc-gui) * 7)");
    expect(input.style.top).toBe("calc(var(--mc-gui) * 34)");
  });

  it("流体罐与能量条渲染", () => {
    render(<IeSqueezerScreen energy={{ max: 32000, value: 28000 }} tank={{ max: 8000, tint: "#c8b23c", value: 4000 }} />);
    expect(screen.getByRole("progressbar", { name: "压榨机流体罐" })).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByRole("progressbar", { name: "压榨机能量" })).toHaveAttribute("aria-valuenow", "88");
  });

  it("demo 渲染", () => {
    render(<IeSqueezerScreenDemo />);
    expect(screen.getByText("压榨机")).toBeInTheDocument();
  });
});
