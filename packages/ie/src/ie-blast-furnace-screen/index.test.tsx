import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeBlastFurnaceScreenDemo } from "../demos";
import { IE_MACHINES } from "../ie-machine-layout";
import { IeBlastFurnaceScreen } from "./index";

describe("ieBlastFurnaceScreen", () => {
  it("渲染 4 个机器槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeBlastFurnaceScreen input={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"blast-furnace-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"blast_furnace\"]")).not.toBeNull();
  });

  it("槽位框坐标 = BlastFurnaceMenu slot - 1（input 52,17 → 51,16）", () => {
    render(<IeBlastFurnaceScreen input={{}} />);
    const input = screen.getByLabelText("blast-furnace-input");
    expect(input.style.left).toBe("calc(var(--mc-gui) * 51)");
    expect(input.style.top).toBe("calc(var(--mc-gui) * 16)");
    expect(IE_MACHINES.blastFurnace.player).toEqual({ hotbarY: 141, left: 7, top: 83 });
  });

  it("火焰与箭头进度渲染（0.78 / 0.42）", () => {
    render(<IeBlastFurnaceScreen burn={0.78} process={0.42} />);
    expect(screen.getByRole("progressbar", { name: "高炉燃烧进度" })).toHaveAttribute("aria-valuenow", "0.78");
    expect(screen.getByRole("progressbar", { name: "高炉冶炼进度" })).toHaveAttribute("aria-valuenow", "0.42");
  });

  it("demo 渲染", () => {
    render(<IeBlastFurnaceScreenDemo />);
    expect(screen.getByText("高炉")).toBeInTheDocument();
  });
});
