import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalComposterScreenDemo } from "./demo";

describe("thermalComposterScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalComposterScreenDemo />);
    expect(screen.getByText("堆肥机")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.composter;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("处理进度随 demo 状态填充", () => {
    render(<ThermalComposterScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.5");
  });
});
