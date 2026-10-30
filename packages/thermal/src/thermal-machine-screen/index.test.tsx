import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { ThermalMachineKey, ThermalMachineLayout } from "../thermal-machine-layout";
import { ThermalRedstoneFurnaceScreen } from "../redstone-furnace-screen/index";
import { THERMAL_MACHINES } from "../thermal-machine-layout";
import { ThermalMachineScreen } from "../thermal-machine-screen/index";
import {
  THERMAL_AUGMENT_PANEL,
  THERMAL_FLUID_STORAGE,
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

  it("能量表填充格与底图同格同宽（图集自带 1 px 透明边，横向不再内缩）", () => {
    renderFurnace();
    const gauge = screen.getByRole("progressbar", { name: "能量" }) as HTMLElement;
    const sprites = gauge.querySelectorAll("[data-thermal-sprite='elements/storage_energy']");
    const track = sprites.item(0) as HTMLElement;
    const fill = sprites.item(1) as HTMLElement;
    const energy = THERMAL_MACHINES.redstone_furnace.energy as { height: number; width: number };
    expect(track.style.width).toBe(`calc(var(--mc-gui) * ${energy.width})`);
    expect(fill.style.left).toBe("calc(var(--mc-gui) * 0)");
    expect(fill.style.width).toBe(track.style.width);
    expect(fill.style.height).toBe(`calc(var(--mc-gui) * ${energy.height - 2})`);
    expect(fill.style.top).toBe("calc(var(--mc-gui) * 1)");
    expect(fill.style.backgroundPosition).toBe("calc(var(--mc-gui) * -16) calc(var(--mc-gui) * -1)");
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

  it("可选字段默认不渲染（红石炉布局无 secondaryOutput/fluid）", () => {
    render(<ThermalMachineScreen machine="redstone_furnace" />);
    expect(screen.queryByLabelText("machine-secondary-output")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("液体")).not.toBeInTheDocument();
    expect(document.querySelector("[data-thermal-fluid-tank]")).toBeNull();
  });

  it("secondaryOutput 槽位与流体储罐按布局渲染", () => {
    const machines = THERMAL_MACHINES as Record<string, ThermalMachineLayout>;
    machines.test_machine = {
      ...THERMAL_MACHINES.redstone_furnace,
      fluid: {
        frame: "elements/storage_fluid_large",
        height: THERMAL_FLUID_STORAGE.large.height,
        left: 8,
        overlay: "elements/overlay_fluid_large",
        top: 53,
        width: THERMAL_FLUID_STORAGE.large.width,
      },
      output: { label: "machine-output", left: 111, size: 26, top: 30 },
      secondaryOutput: { label: "machine-secondary-output", left: 134, size: 26, top: 30 },
    };
    try {
      render(
        <ThermalMachineScreen
          fluid={{ amount: 3000, capacity: 4000, tint: "#3c64c8" }}
          machine={"test_machine" as ThermalMachineKey}
        />,
      );
      expect(screen.getByLabelText("machine-secondary-output")).toBeInTheDocument();
      const tank = screen.getByLabelText("液体");
      expect(tank.getAttribute("aria-valuenow")).toBe("75");
      expect(tank.querySelectorAll("[data-thermal-sprite='elements/storage_fluid_large']")).toHaveLength(1);
      expect(tank.querySelectorAll("[data-thermal-sprite='elements/overlay_fluid_large']")).toHaveLength(1);
    }
    finally {
      delete machines.test_machine;
    }
  });

  it("speedSprite/progressSprite 覆盖默认贴图名", () => {
    const machines = THERMAL_MACHINES as Record<string, ThermalMachineLayout>;
    machines.test_machine = {
      ...THERMAL_MACHINES.redstone_furnace,
      progressSprite: "elements/progress_arrow_fluid_right",
      speedSprite: "elements/scale_crush",
    };
    try {
      const { container } = render(
        <ThermalMachineScreen machine={"test_machine" as ThermalMachineKey} progress={0.5} speed={0.5} />,
      );
      expect(container.querySelectorAll("[data-thermal-sprite='elements/progress_arrow_fluid_right']")).toHaveLength(2);
      expect(container.querySelectorAll("[data-thermal-sprite='elements/scale_crush']")).toHaveLength(2);
    }
    finally {
      delete machines.test_machine;
    }
  });
});
