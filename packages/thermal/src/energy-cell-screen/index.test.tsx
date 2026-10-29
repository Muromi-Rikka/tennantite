import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { THERMAL_CELL_CONTROLS, THERMAL_ENERGY_GAUGE } from "../thermal-metrics";
import { ThermalEnergyCellScreen } from "./index";

function renderCell(overrides: Partial<Parameters<typeof ThermalEnergyCellScreen>[0]> = {}) {
  return render(
    <ThermalEnergyCellScreen
      amount={2500000}
      capacity={5000000}
      inputRate={40}
      maxInput={160}
      maxOutput={320}
      outputRate={80}
      {...overrides}
    />,
  );
}

describe("thermalEnergyCellScreen", () => {
  it("能量表按 amount/capacity 填充", () => {
    renderCell();
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "50");
  });

  it("能量表位于上游 EnergyCellScreen 的 (80,22) 16×42", () => {
    const { container } = renderCell();
    const gauge = container.querySelector("[role='progressbar']") as HTMLElement;
    expect(gauge.style.left).toBe(`calc(var(--mc-gui) * ${THERMAL_ENERGY_GAUGE.cell.left})`);
    expect(gauge.style.top).toBe(`calc(var(--mc-gui) * ${THERMAL_ENERGY_GAUGE.cell.top})`);
    expect(gauge.style.width).toBe(`calc(var(--mc-gui) * ${THERMAL_ENERGY_GAUGE.cell.width})`);
    expect(gauge.style.height).toBe(`calc(var(--mc-gui) * ${THERMAL_ENERGY_GAUGE.cell.height})`);
  });

  it("进/出料速率文本渲染", () => {
    renderCell();
    expect(screen.getByLabelText("进料速率")).toHaveTextContent("40");
    expect(screen.getByLabelText("出料速率")).toHaveTextContent("80");
  });

  it("± 按钮回调增减后的速率", () => {
    const onInputChange = vi.fn();
    const onOutputChange = vi.fn();
    renderCell({ onInputChange, onOutputChange });
    fireEvent.click(screen.getByLabelText("增加进料"));
    expect(onInputChange).toHaveBeenCalledWith(44);
    fireEvent.click(screen.getByLabelText("减少出料"));
    expect(onOutputChange).toHaveBeenCalledWith(76);
  });

  it("边界禁用：速率归零禁用减、达到上限禁用增", () => {
    const first = renderCell({ inputRate: 0, outputRate: 320 });
    expect(first.getByLabelText("减少进料")).toBeDisabled();
    expect(first.getByLabelText("增加出料")).toBeDisabled();
    expect(first.getByLabelText("增加进料")).toBeEnabled();
    first.unmount();
    const last = renderCell({ inputRate: 160 });
    expect(last.getByLabelText("增加进料")).toBeDisabled();
  });

  it("± 按钮按上游坐标定位", () => {
    const { container } = renderCell();
    const dec = screen.getByLabelText("减少进料");
    expect(dec.style.left).toBe(`calc(var(--mc-gui) * ${THERMAL_CELL_CONTROLS.buttons.inputDecrement.left})`);
    expect(dec.style.top).toBe(`calc(var(--mc-gui) * ${THERMAL_CELL_CONTROLS.buttons.inputDecrement.top})`);
    expect(container.querySelector("[data-thermal-sprite='elements/info_input']")).not.toBeNull();
    expect(container.querySelector("[data-thermal-sprite='container/energy_cell']")).not.toBeNull();
  });
});
