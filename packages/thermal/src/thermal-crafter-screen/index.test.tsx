import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalCrafterScreenDemo } from "./demo";

describe("thermalCrafterScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalCrafterScreenDemo />);
    expect(screen.getByText("组装机")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.crafter;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("确认配方按钮位于上游 (142,52) 18×18", () => {
    render(<ThermalCrafterScreenDemo />);
    const button = screen.getByLabelText("确认配方");
    expect(button.style.left).toBe("calc(var(--mc-gui) * 142)");
    expect(button.style.top).toBe("calc(var(--mc-gui) * 52)");
  });

  it("流体储罐按布局渲染", () => {
    render(<ThermalCrafterScreenDemo />);
    expect(document.querySelector("[data-thermal-fluid-tank]")).not.toBeNull();
  });

  it("能量表随 amount/capacity 填充", () => {
    render(<ThermalCrafterScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });

  it("处理进度随 demo 状态填充", () => {
    render(<ThermalCrafterScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.3");
  });
});
