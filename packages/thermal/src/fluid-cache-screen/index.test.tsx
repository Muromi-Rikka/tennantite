import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { THERMAL_CELL_CONTROLS } from "../thermal-metrics";
import { ThermalFluidCacheScreen } from "./index";

function renderFluidCache(overrides: Partial<Parameters<typeof ThermalFluidCacheScreen>[0]> = {}) {
  return render(
    <ThermalFluidCacheScreen
      amount={24000}
      capacity={40000}
      inputRate={40}
      maxInput={160}
      maxOutput={320}
      outputRate={80}
      {...overrides}
    />,
  );
}

describe("thermalFluidCacheScreen", () => {
  it("流体储罐按 amount/capacity 填充", () => {
    renderFluidCache();
    expect(screen.getByRole("progressbar", { name: "缓存容量" })).toHaveAttribute("aria-valuenow", "60");
  });

  it("储罐位于上游 FluidCellScreen 的 (80,22) 18×42（medium）", () => {
    const { container } = renderFluidCache();
    const tank = container.querySelector("[data-thermal-fluid-tank]") as HTMLElement;
    expect(tank.style.left).toBe("calc(var(--mc-gui) * 80)");
    expect(tank.style.top).toBe("calc(var(--mc-gui) * 22)");
    expect(tank.style.width).toBe("calc(var(--mc-gui) * 18)");
    expect(tank.style.height).toBe("calc(var(--mc-gui) * 42)");
    expect(container.querySelector("[data-thermal-sprite='elements/overlay_fluid_medium']")).not.toBeNull();
  });

  it("背景为 fluid_cell，进/出料图标 20×20", () => {
    const { container } = renderFluidCache();
    expect(container.querySelector("[data-thermal-sprite='container/fluid_cell']")).not.toBeNull();
    expect(container.querySelector("[data-thermal-sprite='elements/info_input']")).not.toBeNull();
    expect(container.querySelector("[data-thermal-sprite='elements/info_output']")).not.toBeNull();
  });

  it("速率文本渲染于上游文本中心 (34/142, y 42)", () => {
    renderFluidCache();
    const input = screen.getByLabelText("存入速率");
    expect(input).toHaveTextContent("40");
    expect(input.style.left).toBe(`calc(var(--mc-gui) * ${THERMAL_CELL_CONTROLS.textCenters.input})`);
    const output = screen.getByLabelText("取出速率");
    expect(output).toHaveTextContent("80");
    expect(output.style.left).toBe(`calc(var(--mc-gui) * ${THERMAL_CELL_CONTROLS.textCenters.output})`);
  });

  it("± 按钮回调增减后的速率", () => {
    const onInputChange = vi.fn();
    const onOutputChange = vi.fn();
    renderFluidCache({ onInputChange, onOutputChange });
    fireEvent.click(screen.getByLabelText("增加存入"));
    expect(onInputChange).toHaveBeenCalledWith(44);
    fireEvent.click(screen.getByLabelText("减少取出"));
    expect(onOutputChange).toHaveBeenCalledWith(76);
  });

  it("边界禁用：速率为零禁用减、达到上限禁用增", () => {
    const first = renderFluidCache({ inputRate: 0, outputRate: 320 });
    expect(first.getByLabelText("减少存入")).toBeDisabled();
    expect(first.getByLabelText("增加取出")).toBeDisabled();
    first.unmount();
    const last = renderFluidCache({ inputRate: 160 });
    expect(last.getByLabelText("增加存入")).toBeDisabled();
  });
});
