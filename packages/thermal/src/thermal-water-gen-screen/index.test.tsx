import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalWaterGenScreenDemo } from "./demo";

describe("thermalWaterGenScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalWaterGenScreenDemo />);
    expect(screen.getByText("集水器")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.water_gen;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("流体储罐按布局渲染", () => {
    render(<ThermalWaterGenScreenDemo />);
    expect(document.querySelector("[data-thermal-fluid-tank]")).not.toBeNull();
  });
});
