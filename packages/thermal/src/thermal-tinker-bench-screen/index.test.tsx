import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalTinkerBenchScreenDemo } from "./demo";
import { ThermalTinkerBenchScreen } from "./index";

describe("thermalTinkerBenchScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalTinkerBenchScreenDemo />);
    expect(screen.getByText("强化工作台")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.tinker_bench;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("模式按钮默认强化贴图，replenish 模式换补充贴图", () => {
    const first = render(<ThermalTinkerBenchScreenDemo />);
    expect(document.querySelector("[data-thermal-sprite='container/tinker_bench_mode_augment']")).not.toBeNull();
    first.unmount();
    render(<ThermalTinkerBenchScreen mode="replenish" />);
    expect(document.querySelector("[data-thermal-sprite='container/tinker_bench_mode_replenish']")).not.toBeNull();
  });

  it("流体储罐按布局渲染", () => {
    render(<ThermalTinkerBenchScreenDemo />);
    expect(document.querySelector("[data-thermal-fluid-tank]")).not.toBeNull();
  });

  it("能量表随 amount/capacity 填充", () => {
    render(<ThermalTinkerBenchScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });
});
