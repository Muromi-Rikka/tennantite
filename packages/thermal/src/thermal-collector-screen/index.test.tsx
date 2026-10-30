import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalCollectorScreenDemo } from "./demo";

describe("thermalCollectorScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalCollectorScreenDemo />);
    expect(screen.getByText("收集器")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.collector;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });
});
