import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MekanismChemicalTankScreen } from "./mekanism-chemical-tank-screen/index";
import { MekanismDynamicTankScreen } from "./mekanism-dynamic-tank-screen/index";
import { MekanismEnergyCubeScreen } from "./mekanism-energy-cube-screen/index";
import { MekanismFluidTankScreen } from "./mekanism-fluid-tank-screen/index";
import { MekanismInductionMatrixScreen } from "./mekanism-induction-matrix-screen/index";
import { MekanismPersonalStorageScreen } from "./mekanism-personal-storage-screen/index";
import { MekanismThermalEvaporationScreen } from "./mekanism-thermal-evaporation-screen/index";
import { MekanismThermoelectricBoilerScreen } from "./mekanism-thermoelectric-boiler-screen/index";

describe("mekanism storage screens", () => {
  it("renders the energy cube", () => {
    render(<MekanismEnergyCubeScreen energy={{ max: 100, value: 60 }} />);
    expect(screen.getByText("能量立方")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "60");
  });

  it("renders the fluid tank", () => {
    render(<MekanismFluidTankScreen fluid={{ amount: 50, capacity: 100 }} />);
    expect(screen.getByText("流体储罐")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "流体" })).toHaveAttribute("aria-valuenow", "50");
  });

  it("renders the chemical tank", () => {
    render(<MekanismChemicalTankScreen chemical={{ amount: 30, capacity: 100 }} />);
    expect(screen.getByText("化学储罐")).toBeInTheDocument();
    expect(screen.getByText("空闲")).toBeInTheDocument();
    expect(screen.getByLabelText("drain")).toBeInTheDocument();
    expect(screen.getByLabelText("fill")).toBeInTheDocument();
  });

  it("renders the induction matrix", () => {
    render(<MekanismInductionMatrixScreen energy={{ max: 100, value: 40 }} />);
    expect(screen.getByText("感应矩阵")).toBeInTheDocument();
    expect(screen.getByLabelText("cell-0")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "40");
  });

  it("renders the dynamic tank", () => {
    render(<MekanismDynamicTankScreen fluid={{ amount: 25, capacity: 50 }} />);
    expect(screen.getByText("动态储罐")).toBeInTheDocument();
    expect(screen.getByLabelText("contents-0")).toBeInTheDocument();
  });

  it("renders the boiler", () => {
    render(
      <MekanismThermoelectricBoilerScreen
        chemicals={{
          cooled: { amount: 1, capacity: 2 },
          steam: { amount: 1, capacity: 2 },
          superheated: { amount: 1, capacity: 2 },
          water: { amount: 1, capacity: 2 },
        }}
        rates={{ boil: 1, max: 2 }}
      />,
    );
    expect(screen.getByText("热力锅炉")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "过热" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "水" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "蒸汽" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "冷却液" })).toBeInTheDocument();
  });

  it("renders the thermal evaporation controller", () => {
    render(<MekanismThermalEvaporationScreen temperature={320} />);
    expect(screen.getByText("热力蒸发控制器")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "输入" })).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "输出" })).toBeInTheDocument();
  });

  it("renders 54 personal storage slots", () => {
    const { container } = render(<MekanismPersonalStorageScreen />);
    expect(screen.getByText("个人箱子")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"inventory-\"]")).toHaveLength(54);
  });
});
