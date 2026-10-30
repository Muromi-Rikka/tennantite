import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioRelocatorScreenDemo } from "../demos";
import { EioRelocatorScreen } from "./index";

describe("eioRelocatorScreen", () => {
  it("渲染 2 个槽位与 screen/relocator 背景", () => {
    const { container } = render(
      <EioRelocatorScreen items={{ "obelisk-capacitor": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"obelisk-\"]")).toHaveLength(2);
    const background = container.querySelector("[data-eio-sprite=\"screen/relocator\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    render(<EioRelocatorScreen onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioRelocatorScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"obelisk\"]")).not.toBeNull();
  });
});
