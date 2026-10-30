import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioWiredChargerScreenDemo } from "../demos";
import { EioWiredChargerScreen } from "./index";

describe("eioWiredChargerScreen", () => {
  it("渲染 8 个槽位与 screen/wired_charger 背景", () => {
    const { container } = render(
      <EioWiredChargerScreen items={{ "wired-charger-item-to-charge": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"wired-charger-\"]")).toHaveLength(8);
    const background = container.querySelector("[data-eio-sprite=\"screen/wired_charger\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("进度条与能量", () => {
    const { container } = render(<EioWiredChargerScreen energy={{ max: 100000, value: 48000 }} progress={0.45} />);
    expect(screen.getByRole("progressbar", { name: "有线充电器进度" })).toHaveAttribute("aria-valuenow", "0.45");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "48");
    expect(container.querySelector("[data-eio-energy-bar]")).not.toBeNull();
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioWiredChargerScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioWiredChargerScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"wiredCharger\"]")).not.toBeNull();
  });
});
