import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioSagMillScreenDemo } from "../demos";
import { EioSagMillScreen } from "./index";

describe("eioSagMillScreen", () => {
  it("渲染 7 个机器槽位与 208 高背景", () => {
    const { container } = render(
      <EioSagMillScreen
        capacitor={{}}
        grindingBallSlot={{}}
        input={{}}
        outputs={[{}, {}, {}, {}]}
      />,
    );
    expect(container.querySelectorAll("[aria-label^=\"sag-mill-\"]")).toHaveLength(7);
    const background = container.querySelector("[data-eio-sprite=\"screen/sag_mill\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 208)");
    expect(background.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
    expect(container.querySelector("[data-eio-sprite=\"sprites/widget/empty_capacitor_slot\"]")).not.toBeNull();
  });

  it("能量、进度与研磨球耐久", () => {
    render(
      <EioSagMillScreen
        energy={{ max: 100000, value: 72000 }}
        grindingBall={{ durability: 0.7 }}
        progress={0.35}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "72");
    expect(screen.getByRole("progressbar", { name: "磨粉机进度" })).toHaveAttribute("aria-valuenow", "0.35");
    expect(screen.getByRole("progressbar", { name: "研磨球耐久" })).toHaveAttribute("aria-valuenow", "0.7");
  });

  it("右侧按钮与槽位点击", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    const onSlotClick = vi.fn();
    render(
      <EioSagMillScreen
        onIoConfig={onIoConfig}
        onRedstoneChange={onRedstoneChange}
        onSlotClick={onSlotClick}
        outputs={[{}]}
      />,
    );
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledWith("active_with_signal");
    await user.click(screen.getByRole("button", { name: "IO 配置" }));
    expect(onIoConfig).toHaveBeenCalledOnce();
    await user.click(screen.getByLabelText("sag-mill-output-0"));
    expect(onSlotClick).toHaveBeenCalledWith("sag-mill-output-0");
  });

  it("demo 渲染", () => {
    render(<EioSagMillScreenDemo />);
    expect(screen.getByText("SAG 磨粉机")).toBeInTheDocument();
  });
});
