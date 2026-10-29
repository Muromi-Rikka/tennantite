import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IF_MACHINES, resolveIfMachineLayout } from "../if-machine-layout";
import { IfMachineScreen } from "./index";

describe("ifMachineScreen", () => {
  it("渲染 176×184 背景、标题、玩家背包与右侧面板", () => {
    const { container } = render(<IfMachineScreen machine="bioreactor" />);
    expect(container.querySelector("[data-if-machine=\"bioreactor\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(container.querySelector("[data-if-augment-panel]")).not.toBeNull();
  });

  it("处理机家族自动生成基础箭头条", () => {
    const resolved = resolveIfMachineLayout("dissolutionChamber");
    expect(resolved.bar).toEqual({ color: "white", kind: "arrow-right", x: 102, y: 41 });
    expect(IF_MACHINES.dissolutionChamber.family).toBe("processing");
  });

  it("发电机家族不渲染红石 / 升级 / 流体面板", () => {
    const { container } = render(<IfMachineScreen machine="biofuelGenerator" />);
    expect(container.querySelector("[aria-label=\"redstone\"]")).toBeNull();
    expect(container.querySelector("[data-if-augment-panel]")).toBeNull();
    expect(container.querySelector("[data-if-tank-panel]")).toBeNull();
  });
});
