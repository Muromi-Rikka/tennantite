import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { ThermalMachineLayout } from "../thermal-machine-layout";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalRockGenScreenDemo } from "./demo";
import { ThermalRockGenScreen } from "./index";

describe("thermalRockGenScreen", () => {
  it("按上游布局渲染标题与全部槽位", () => {
    render(<ThermalRockGenScreenDemo />);
    expect(screen.getByText("岩石生成器")).toBeInTheDocument();
    const layout: ThermalMachineLayout = THERMAL_MACHINES.rock_gen;
    const slots = [layout.input, ...(layout.inputs ?? []), layout.output, ...(layout.outputs ?? [])];
    for (const slotLayout of slots) {
      if (slotLayout) {
        expect(screen.getByLabelText(slotLayout.label)).toBeInTheDocument();
      }
    }
  });

  it("岩浆/相邻方块展示位按上游 ElementBlock 坐标渲染", () => {
    render(
      <ThermalRockGenScreen
        adjacent={{ icon: "stone-block", tooltip: "相邻方块" }}
        lava={{ icon: "gunpowder", tooltip: "岩浆" }}
        playerHotbar={[]}
        playerItems={[]}
      />,
    );
    expect(screen.getByLabelText("rock-gen-lava")).toBeInTheDocument();
    expect(screen.getByLabelText("rock-gen-adjacent")).toBeInTheDocument();
  });

  it("处理进度随 demo 状态填充", () => {
    render(<ThermalRockGenScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.5");
  });
});
