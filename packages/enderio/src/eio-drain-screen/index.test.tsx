import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioDrainScreenDemo } from "../demos";
import { EioDrainScreen } from "./index";

describe("eioDrainScreen", () => {
  it("渲染 1 个槽位与 screen/drain 背景", () => {
    const { container } = render(
      <EioDrainScreen items={{ "tank-capacitor": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"tank-\"]")).toHaveLength(1);
    const background = container.querySelector("[data-eio-sprite=\"screen/drain\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioDrainScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioDrainScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"tank\"]")).not.toBeNull();
  });
});
