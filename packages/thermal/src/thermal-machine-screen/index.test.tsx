import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ThermalRedstoneFurnaceScreen } from "../redstone-furnace-screen/index";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalMachineScreen } from "../thermal-machine-screen/index";
import {
  THERMAL_AUGMENT_PANEL,
  THERMAL_GUI,
} from "../thermal-metrics";

const REDSTONE: ScreenSlot = { count: 16, icon: "gunpowder", tooltip: "红石粉" };
const OUTPUT: ScreenSlot = { count: 4, icon: "stone-block", tooltip: "平滑石头" };

function renderFurnace(overrides: Partial<Parameters<typeof ThermalRedstoneFurnaceScreen>[0]> = {}) {
  return render(
    <ThermalRedstoneFurnaceScreen
      energy={{ amount: 200000, capacity: 400000 }}
      input={REDSTONE}
      onAugmentsToggle={() => {}}
      onSlotClick={() => {}}
      output={OUTPUT}
      progress={0.5}
      speed={0.25}
      {...overrides}
    />,
  );
}

describe("thermalRedstoneFurnaceScreen", () => {
  it("按上游 MachineFurnaceScreen 坐标渲染输入与产物槽", () => {
    renderFurnace();
    expect(screen.getByLabelText("machine-input")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-output")).toBeInTheDocument();
    const layout = THERMAL_MACHINES.redstone_furnace;
    expect(layout.input.left).toBe(53);
    expect(layout.input.top).toBe(26);
    expect(layout.output.left).toBe(111);
    expect(layout.output.top).toBe(30);
    expect(layout.output.size).toBe(26);
  });

  it("进度与速度进度条按 0..100 填充", () => {
    renderFurnace({ progress: 0.5, speed: 0.25 });
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.5");
    expect(screen.getByRole("progressbar", { name: "处理速度" })).toHaveAttribute("aria-valuenow", "0.25");
  });

  it("能量表按 amount/capacity 折算百分比", () => {
    renderFurnace();
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "50");
  });

  it("进度箭头与背景按数据表常量定位", () => {
    const { container } = renderFurnace();
    const track = container.querySelector("[data-thermal-sprite='elements/progress_arrow_right']") as HTMLElement;
    const layout = THERMAL_MACHINES.redstone_furnace.progress;
    expect(track.style.left).toBe(`calc(var(--mc-gui) * ${layout.left})`);
    expect(track.style.top).toBe(`calc(var(--mc-gui) * ${layout.top})`);
    expect(track.style.width).toBe(`calc(var(--mc-gui) * ${layout.width})`);
  });

  it("面板尺寸为 176×166（CoFH 容器窗口）", () => {
    const { container } = renderFurnace();
    const background = container.querySelector("[data-thermal-sprite='container/furnace']") as HTMLElement;
    expect(background.style.width).toBe(`calc(var(--mc-gui) * ${THERMAL_GUI.width})`);
    expect(background.style.height).toBe(`calc(var(--mc-gui) * ${THERMAL_GUI.height})`);
  });

  it("槽位点击回调角色与物品", () => {
    const onSlotClick = vi.fn();
    renderFurnace({ onSlotClick });
    fireEvent.click(screen.getByLabelText("machine-input"));
    expect(onSlotClick).toHaveBeenCalledWith("machine-input", REDSTONE);
    fireEvent.click(screen.getByLabelText("machine-output"));
    expect(onSlotClick).toHaveBeenCalledWith("machine-output", OUTPUT);
  });

  it("强化面板默认收起，点击页签触发开合回调", () => {
    const onAugmentsToggle = vi.fn();
    const view = renderFurnace({ onAugmentsToggle });
    expect(screen.queryByLabelText("augment-0")).not.toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("强化"));
    expect(onAugmentsToggle).toHaveBeenCalledTimes(1);
    view.unmount();
    renderFurnace({ augments: [REDSTONE], augmentsOpen: true });
    const panel = document.querySelector("[data-thermal-augment-panel]") as HTMLElement;
    expect(panel).not.toBeNull();
    expect(panel.style.width).toBe(`calc(var(--mc-gui) * ${THERMAL_AUGMENT_PANEL.width})`);
    expect(screen.getByLabelText("augment-0")).toBeInTheDocument();
  });
});

describe("thermalMachineScreen 数据表驱动", () => {
  it("redstone_furnace 布局含能量表、进度与速度", () => {
    const layout = THERMAL_MACHINES.redstone_furnace;
    expect(layout.background).toBe("container/furnace");
    expect(layout.energy).toEqual({ height: 42, left: 8, top: 8, width: 16 });
    expect(layout.progress?.left).toBe(79);
    expect(layout.speed?.left).toBe(53);
    render(<ThermalMachineScreen machine="redstone_furnace" />);
    expect(screen.getByLabelText("machine-input")).toBeInTheDocument();
  });
});
