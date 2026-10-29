import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioCapacitorBankScreenDemo } from "../demos";
import { EioCapacitorBankScreen } from "./index";

describe("eioCapacitorBankScreen", () => {
  it("面板 208 高、背景只画 166 高", () => {
    const { container } = render(<EioCapacitorBankScreen />);
    const panel = container.querySelector("[data-eio-machine=\"capacitorBank\"]") as HTMLElement;
    expect(panel.style.height).toBe("calc(var(--mc-gui) * 208)");
    const background = container.querySelector("[data-eio-sprite=\"screen/capacitor_bank\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
    expect(background.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
  });

  it("9×68 能量条与 36 个玩家槽", () => {
    const { container } = render(
      <EioCapacitorBankScreen energy={{ max: 4000000, value: 1200000 }} />,
    );
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "30");
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(container.querySelectorAll("[data-eio-icon-button]")).toHaveLength(2);
  });

  it("红石 / IO 按钮与 demo", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioCapacitorBankScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledWith("active_with_signal");
    await user.click(screen.getByRole("button", { name: "IO 配置" }));
    expect(onIoConfig).toHaveBeenCalledOnce();
    render(<EioCapacitorBankScreenDemo />);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "30");
  });
});
