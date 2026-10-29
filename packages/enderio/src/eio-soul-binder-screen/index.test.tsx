import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioSoulBinderScreenDemo } from "../demos";
import { EioSoulBinderScreen } from "./index";

describe("eioSoulBinderScreen", () => {
  it("渲染 5 个槽位与 176×166 背景", () => {
    const { container } = render(
      <EioSoulBinderScreen capacitor={{}} inputOther={{}} inputSoul={{}} outputs={[{}, {}]} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"soul-binder-\"]")).toHaveLength(5);
    expect(container.querySelector("[aria-label^=\"main-\"]")).not.toBeNull();
    const background = container.querySelector("[data-eio-sprite=\"screen/soul_binder\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
    expect(background.style.backgroundPosition).toBe("calc(var(--mc-gui) * 0) calc(var(--mc-gui) * 0)");
  });

  it("横向进度、经验条填充与能量", () => {
    const { container } = render(
      <EioSoulBinderScreen
        energy={{ max: 100000, value: 48000 }}
        experience={{ level: 30, progress: 0.6 }}
        progress={0.45}
      />,
    );
    expect(screen.getByRole("progressbar", { name: "灵魂绑定器进度" })).toHaveAttribute("aria-valuenow", "0.45");
    expect(screen.getByRole("progressbar", { name: "经验" })).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByText("30")).toBeInTheDocument();
    const fill = container.querySelector("[data-gui-sprite=\"sprites/hud/experience_bar_progress.png\"]") as HTMLElement;
    expect(fill.style.width).toBe("calc(var(--mc-gui) * 38)");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "48");
  });

  it("按钮与 demo", async () => {
    const user = userEvent.setup();
    const onIoConfig = vi.fn();
    render(<EioSoulBinderScreen onIoConfig={onIoConfig} />);
    await user.click(screen.getByRole("button", { name: "IO 配置" }));
    expect(onIoConfig).toHaveBeenCalledOnce();
    cleanup();
    render(<EioSoulBinderScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "灵魂绑定器进度" })).toHaveAttribute("aria-valuenow", "0.45");
  });
});
