import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalTreeExtractorScreenDemo } from "./demo";

describe("thermalTreeExtractorScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalTreeExtractorScreenDemo />);
    expect(screen.getByText("树液采集器")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.tree_extractor;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("流体储罐按布局渲染", () => {
    render(<ThermalTreeExtractorScreenDemo />);
    expect(document.querySelector("[data-thermal-fluid-tank]")).not.toBeNull();
  });

  it("处理速度随 demo 状态填充", () => {
    render(<ThermalTreeExtractorScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理速度" })).toHaveAttribute("aria-valuenow", "0.6");
  });
});
