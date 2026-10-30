import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalNullifierScreenDemo } from "./demo";

describe("thermalNullifierScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalNullifierScreenDemo />);
    expect(screen.getByText("销毁器")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.nullifier;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("清空垃圾桶按钮位于上游 (131,33) 20×20", () => {
    render(<ThermalNullifierScreenDemo />);
    const button = screen.getByLabelText("清空垃圾桶");
    expect(button.style.left).toBe("calc(var(--mc-gui) * 131)");
    expect(button.style.top).toBe("calc(var(--mc-gui) * 33)");
  });
});
