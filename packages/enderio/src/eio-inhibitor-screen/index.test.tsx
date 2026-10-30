import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioInhibitorScreenDemo } from "../demos";
import { EioInhibitorScreen } from "./index";

describe("eioInhibitorScreen", () => {
  it("渲染 2 个槽位与 screen/inhibitor 背景", () => {
    const { container } = render(
      <EioInhibitorScreen items={{ "obelisk-capacitor": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"obelisk-\"]")).toHaveLength(2);
    const background = container.querySelector("[data-eio-sprite=\"screen/inhibitor\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    render(<EioInhibitorScreen onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioInhibitorScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"obelisk\"]")).not.toBeNull();
  });
});
