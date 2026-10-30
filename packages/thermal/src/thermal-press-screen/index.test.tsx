import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalPressScreenDemo } from "./demo";

describe("thermalPressScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalPressScreenDemo />);
    expect(screen.getByText("压缩机")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.press;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("流体储罐按布局渲染", () => {
    render(<ThermalPressScreenDemo />);
    expect(document.querySelector("[data-thermal-fluid-tank]")).not.toBeNull();
  });

  it("能量表随 amount/capacity 填充", () => {
    render(<ThermalPressScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });

  it("处理进度随 demo 状态填充", () => {
    render(<ThermalPressScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.6");
  });

  it("处理速度随 demo 状态填充", () => {
    render(<ThermalPressScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理速度" })).toHaveAttribute("aria-valuenow", "0.75");
  });
});
