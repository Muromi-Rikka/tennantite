import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalChargeBenchScreenDemo } from "./demo";

describe("thermalChargeBenchScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalChargeBenchScreenDemo />);
    expect(screen.getByText("充能台")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.charge_bench;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("能量表随 amount/capacity 填充", () => {
    render(<ThermalChargeBenchScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });
});
