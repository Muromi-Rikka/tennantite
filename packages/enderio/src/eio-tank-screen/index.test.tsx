import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioTankScreenDemo } from "../demos";
import { EioTankScreen } from "./index";

describe("eioTankScreen", () => {
  it("渲染 4 个槽位与 screen/tank 背景", () => {
    const { container } = render(
      <EioTankScreen items={{ "tank-fill-input": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"tank-\"]")).toHaveLength(4);
    const background = container.querySelector("[data-eio-sprite=\"screen/tank\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioTankScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioTankScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"tank\"]")).not.toBeNull();
  });
});
