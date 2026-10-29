import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioAlloySmelterScreenDemo } from "../demos";
import { EIO_MACHINES } from "../eio-machine-layout";
import { EioAlloySmelterScreen } from "./index";

describe("eioAlloySmelterScreen", () => {
  it("渲染 5 个机器槽位、背景与玩家背包", () => {
    const { container } = render(<EioAlloySmelterScreen inputs={[{}, {}, {}]} output={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"alloy-smelter-\"]")).toHaveLength(5);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(container.querySelector("[data-eio-sprite=\"screen/alloy_smelter_auto\"]")).not.toBeNull();
    expect(container.querySelector("[data-eio-sprite=\"sprites/widget/empty_capacitor_slot\"]")).not.toBeNull();
  });

  it("槽位框坐标 = Menu slot - 1", () => {
    render(<EioAlloySmelterScreen inputs={[{}, {}, {}]} output={{}} />);
    const input = screen.getByLabelText("alloy-smelter-input-0");
    expect(input.style.left).toBe("calc(var(--mc-gui) * 54)");
    expect(input.style.top).toBe("calc(var(--mc-gui) * 37)");
    expect(screen.getByLabelText("alloy-smelter-input-1").style.left).toBe("calc(var(--mc-gui) * 79)");
    expect(screen.getByLabelText("alloy-smelter-output").style.top).toBe("calc(var(--mc-gui) * 78)");
  });

  it("按模式切换背景并裁剪 176×208", () => {
    const { container } = render(<EioAlloySmelterScreen mode="alloys" />);
    const background = container.querySelector("[data-eio-sprite=\"screen/alloy_smelter_alloy\"]") as HTMLElement;
    expect(background.style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(background.style.height).toBe("calc(var(--mc-gui) * 208)");
    expect(background.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
  });

  it("双火焰进度、能量与状态", () => {
    render(<EioAlloySmelterScreen energy={{ max: 100000, value: 65000 }} progress={0.5} state="active" />);
    expect(screen.getByRole("progressbar", { name: "合金炉进度 1" })).toHaveAttribute("aria-valuenow", "0.5");
    expect(screen.getByRole("progressbar", { name: "合金炉进度 2" })).toHaveAttribute("aria-valuenow", "0.5");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "65");
    expect(screen.getByRole("img", { name: "机器状态：运行" })).toBeInTheDocument();
  });

  it("模式与红石按钮按上游顺序循环", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    const onRedstoneChange = vi.fn();
    render(<EioAlloySmelterScreen onModeChange={onModeChange} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "熔炼模式" }));
    expect(onModeChange).toHaveBeenCalledWith("alloys");
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledWith("active_with_signal");
    expect(screen.getByRole("button", { name: "熔炼模式" })).toHaveAttribute("title", "熔炼模式：全部");
  });

  it("槽位点击与 demo 渲染", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<EioAlloySmelterScreen onSlotClick={onSlotClick} output={{}} />);
    await user.click(screen.getByLabelText("alloy-smelter-output"));
    expect(onSlotClick).toHaveBeenCalledWith("alloy-smelter-output");
    cleanup();
    render(<EioAlloySmelterScreenDemo />);
    expect(screen.getByText("合金炉")).toBeInTheDocument();
  });

  it("布局表含两个进度条", () => {
    expect(EIO_MACHINES.alloySmelter.progresses).toHaveLength(2);
  });
});
