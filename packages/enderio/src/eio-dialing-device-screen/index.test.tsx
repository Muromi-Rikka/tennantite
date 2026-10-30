import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioDialingDeviceScreenDemo } from "../demos";
import { EioDialingDeviceScreen } from "./index";

describe("eioDialingDeviceScreen", () => {
  it("渲染 176×230 背景与玩家背包", () => {
    const { container } = render(<EioDialingDeviceScreen />);
    const background = container.querySelector("[data-eio-sprite=\"screen/dialing_device\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 230)");
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBeGreaterThan(0);
  });

  it("频率操作按钮", async () => {
    const user = userEvent.setup();
    const onPrimaryAction = vi.fn();
    render(<EioDialingDeviceScreen onPrimaryAction={onPrimaryAction} />);
    await user.click(screen.getByRole("button", { name: "频率操作 1" }));
    expect(onPrimaryAction).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioDialingDeviceScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"dialingDevice\"]")).not.toBeNull();
  });
});
