import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioImpulseHopperScreenDemo } from "../demos";
import { EioImpulseHopperScreen } from "./index";

describe("eioImpulseHopperScreen", () => {
  it("渲染 19 个槽位与 screen/impulse_hopper 背景", () => {
    const { container } = render(
      <EioImpulseHopperScreen items={{ "impulse-hopper-input-0": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"impulse-hopper-\"]")).toHaveLength(19);
    const background = container.querySelector("[data-eio-sprite=\"screen/impulse_hopper\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioImpulseHopperScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioImpulseHopperScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"impulseHopper\"]")).not.toBeNull();
  });
});
