import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioTelePadScreenDemo } from "../demos";
import { EioTelePadScreen } from "./index";

describe("eioTelePadScreen", () => {
  it("渲染 218×230 背景与玩家背包", () => {
    const { container } = render(<EioTelePadScreen />);
    const background = container.querySelector("[data-eio-sprite=\"screen/tele_pad\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 230)");
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBeGreaterThan(0);
  });

  it("传送操作按钮", async () => {
    const user = userEvent.setup();
    const onSecondaryAction = vi.fn();
    render(<EioTelePadScreen onSecondaryAction={onSecondaryAction} />);
    await user.click(screen.getByRole("button", { name: "传送操作 2" }));
    expect(onSecondaryAction).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioTelePadScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"telePad\"]")).not.toBeNull();
  });
});
