import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioSoulEngineScreenDemo } from "../demos";
import { EioSoulEngineScreen } from "./index";

describe("eioSoulEngineScreen", () => {
  it("渲染 1 个槽位与 screen/soul_engine 背景", () => {
    const { container } = render(
      <EioSoulEngineScreen items={{ "soul-engine-capacitor": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"soul-engine-\"]")).toHaveLength(1);
    const background = container.querySelector("[data-eio-sprite=\"screen/soul_engine\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioSoulEngineScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioSoulEngineScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"soulEngine\"]")).not.toBeNull();
  });
});
