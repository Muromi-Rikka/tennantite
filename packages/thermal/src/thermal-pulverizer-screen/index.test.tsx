import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalPulverizerScreenDemo } from "./demo";

describe("thermalPulverizerScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalPulverizerScreenDemo />);
    expect(screen.getByText("粉碎机")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.pulverizer;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("能量表随 amount/capacity 填充", () => {
    render(<ThermalPulverizerScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });

  it("处理进度随 demo 状态填充", () => {
    render(<ThermalPulverizerScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.5");
  });

  it("处理速度随 demo 状态填充", () => {
    render(<ThermalPulverizerScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理速度" })).toHaveAttribute("aria-valuenow", "0.75");
  });
});
