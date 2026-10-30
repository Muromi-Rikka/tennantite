import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeMixerScreenDemo } from "../demos";
import { IeMixerScreen } from "./index";

describe("ieMixerScreen", () => {
  it("渲染 4 个输入槽、背景贴图与玩家背包", () => {
    const { container } = render(<IeMixerScreen inputs={[{}, {}, {}, {}]} />);
    expect(container.querySelectorAll("[aria-label^=\"mixer-input-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite=\"mixer\"]")).not.toBeNull();
  });

  it("输入槽框坐标 = MixerMenu slot - 1（首槽 7,7 → 6,6，步距 21）", () => {
    render(<IeMixerScreen inputs={[{}]} />);
    const input = screen.getByLabelText("mixer-input-0");
    expect(input.style.left).toBe("calc(var(--mc-gui) * 6)");
    expect(input.style.top).toBe("calc(var(--mc-gui) * 6)");
    const second = screen.getByLabelText("mixer-input-1");
    expect(second.style.left).toBe("calc(var(--mc-gui) * 27)");
  });

  it("每输入槽竖向进度（0.3 → aria-valuenow 30）", () => {
    const { container } = render(<IeMixerScreen progresses={[0.3]} />);
    expect(container.querySelector("[data-ie-mixer-progress=\"0\"]")).not.toBeNull();
  });

  it("多流体罐与能量条渲染", () => {
    render(
      <IeMixerScreen
        energy={{ max: 32000, value: 21000 }}
        multitank={{ max: 10000, tint: "#5c7a3c", value: 5200 }}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "搅拌机多流体罐" })).toHaveAttribute("aria-valuenow", "52");
    expect(screen.getByRole("progressbar", { name: "搅拌机能量" })).toHaveAttribute("aria-valuenow", "66");
  });

  it("输出模式切换按钮回调", async () => {
    const user = userEvent.setup();
    const onOutputAllChange = vi.fn();
    render(<IeMixerScreen onOutputAllChange={onOutputAllChange} outputAll />);
    await user.click(screen.getByLabelText("搅拌机输出全部产物"));
    expect(onOutputAllChange).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<IeMixerScreenDemo />);
    expect(screen.getByText("搅拌机")).toBeInTheDocument();
  });
});
