import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeArcFurnaceScreenDemo } from "../demos";
import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeArcFurnaceScreen } from "./index";

describe("ieArcFurnaceScreen", () => {
  it("渲染 26 个机器槽位（12 输入 + 4 添加剂 + 6 输出 + 1 炉渣 + 3 电极）与玩家背包", () => {
    const { container } = render(<IeArcFurnaceScreen />);
    expect(container.querySelectorAll("[aria-label^=\"arc-furnace-\"]")).toHaveLength(26);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(container.querySelector("[data-ie-sprite=\"arc_furnace\"]")).not.toBeNull();
  });

  it("槽位框坐标 = ArcFurnaceMenu slot - 1（输入 9,30,51 / 电极 61,79,97）", () => {
    render(<IeArcFurnaceScreen />);
    const firstInput = screen.getByLabelText("arc-furnace-input-0");
    expect(firstInput.style.left).toBe("calc(var(--mc-gui) * 9)");
    expect(firstInput.style.top).toBe("calc(var(--mc-gui) * 33)");
    const secondInput = screen.getByLabelText("arc-furnace-input-1");
    expect(secondInput.style.left).toBe("calc(var(--mc-gui) * 30)");
    const firstElectrode = screen.getByLabelText("arc-furnace-electrode-0");
    expect(firstElectrode.style.left).toBe("calc(var(--mc-gui) * 61)");
    expect(firstElectrode.style.top).toBe("calc(var(--mc-gui) * 9)");
    expect(screen.getByLabelText("arc-furnace-electrode-1").style.left).toBe("calc(var(--mc-gui) * 79)");
    expect(screen.getByLabelText("arc-furnace-electrode-2").style.left).toBe("calc(var(--mc-gui) * 97)");
    expect(screen.getByLabelText("arc-furnace-electrode-2").style.top).toBe("calc(var(--mc-gui) * 9)");
  });

  it("能量条与竖向进度条（62000/100000 → 62）", () => {
    const { container } = render(
      <IeArcFurnaceScreen energy={{ max: 100000, value: 62000 }} progresses={[0.9, 0.5, 0.2]} />,
    );
    expect(screen.getByRole("progressbar", { name: "弧光炉能量" })).toHaveAttribute(
      "aria-valuenow",
      "62",
    );
    const bars = container.querySelectorAll("[data-ie-arc-progress]");
    expect(bars).toHaveLength(3);
    const firstBar = bars[0] as HTMLElement;
    expect(firstBar.style.left).toBe("calc(var(--mc-gui) * 27)");
    expect((firstBar.firstElementChild as HTMLElement).style.backgroundSize)
      .toBe("calc(var(--mc-gui) * 3) calc(var(--mc-gui) * 16)");
  });

  it("分配按钮触发 autoSplit 回调", async () => {
    const user = userEvent.setup();
    const onDistribute = vi.fn();
    render(<IeArcFurnaceScreen onDistribute={onDistribute} />);
    await user.click(screen.getByLabelText("分配物品"));
    expect(onDistribute).toHaveBeenCalledOnce();
  });

  it("进度条坐标与布局表一致", () => {
    const layout = IE_MACHINES.arcFurnace;
    const slots = ieExpandSlots(layout);
    expect(slots.filter(slot => slot.label.startsWith("arc-furnace-input"))).toHaveLength(12);
    expect(layout.player.hotbarY).toBe(183);
  });

  it("demo 渲染", () => {
    render(<IeArcFurnaceScreenDemo />);
    expect(screen.getByText("弧光炉")).toBeInTheDocument();
  });
});
