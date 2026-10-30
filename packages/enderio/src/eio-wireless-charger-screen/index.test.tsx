import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioWirelessChargerScreenDemo } from "../demos";
import { EioWirelessChargerScreen } from "./index";

describe("eioWirelessChargerScreen", () => {
  it("渲染 1 个槽位与 screen/wireless_charger 背景", () => {
    const { container } = render(
      <EioWirelessChargerScreen items={{ "wireless-charger-capacitor": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"wireless-charger-\"]")).toHaveLength(1);
    const background = container.querySelector("[data-eio-sprite=\"screen/wireless_charger\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioWirelessChargerScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioWirelessChargerScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"wirelessCharger\"]")).not.toBeNull();
  });
});
