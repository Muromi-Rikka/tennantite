import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ThermalRedstoneFurnaceScreen } from "./index";

const REDSTONE: ScreenSlot = { count: 16, icon: "gunpowder", tooltip: "红石粉" };
const SMOOTH_STONE: ScreenSlot = { count: 4, icon: "stone-block", tooltip: "平滑石头" };

function renderFurnace(overrides: Partial<Parameters<typeof ThermalRedstoneFurnaceScreen>[0]> = {}) {
  return render(
    <ThermalRedstoneFurnaceScreen
      energy={{ amount: 80000, capacity: 400000 }}
      input={REDSTONE}
      onAugmentsToggle={() => {}}
      onSlotClick={() => {}}
      output={SMOOTH_STONE}
      playerHotbar={[]}
      playerItems={[]}
      progress={0.5}
      speed={0.25}
      {...overrides}
    />,
  );
}

describe("thermalRedstoneFurnaceScreen", () => {
  it("转发 machine=redstone_furnace，标题与槽位按布局渲染", () => {
    renderFurnace();
    expect(screen.getByText("红石炉")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-input")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-output")).toBeInTheDocument();
  });

  it("待机（无能量/进度状态）能量表与进度条归零", () => {
    render(<ThermalRedstoneFurnaceScreen playerHotbar={[]} playerItems={[]} />);
    expect(screen.getByText("红石炉")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "0");
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0");
  });

  it("进度与速度随状态填充", () => {
    renderFurnace();
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute("aria-valuenow", "0.5");
    expect(screen.getByRole("progressbar", { name: "处理速度" })).toHaveAttribute("aria-valuenow", "0.25");
  });

  it("槽位点击回调角色与物品", () => {
    const onSlotClick = vi.fn();
    renderFurnace({ onSlotClick });
    fireEvent.click(screen.getByLabelText("machine-input"));
    expect(onSlotClick).toHaveBeenCalledWith("machine-input", REDSTONE);
  });

  it("背景为红石炉贴图", () => {
    const { container } = renderFurnace();
    expect(container.querySelector("[data-thermal-sprite='container/furnace']")).not.toBeNull();
  });
});
