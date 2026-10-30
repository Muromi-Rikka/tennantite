import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioCrafterScreenDemo } from "../demos";
import { EioCrafterScreen } from "./index";

describe("eioCrafterScreen", () => {
  it("渲染 21 个槽位与 screen/crafter 背景", () => {
    const { container } = render(
      <EioCrafterScreen items={{ "crafter-input-0": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"crafter-\"]")).toHaveLength(21);
    const background = container.querySelector("[data-eio-sprite=\"screen/crafter\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioCrafterScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioCrafterScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"crafter\"]")).not.toBeNull();
  });
});
