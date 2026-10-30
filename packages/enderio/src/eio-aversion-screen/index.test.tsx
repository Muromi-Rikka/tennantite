import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioAversionScreenDemo } from "../demos";
import { EioAversionScreen } from "./index";

describe("eioAversionScreen", () => {
  it("渲染 2 个槽位与 screen/aversion 背景", () => {
    const { container } = render(
      <EioAversionScreen items={{ "obelisk-capacitor": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"obelisk-\"]")).toHaveLength(2);
    const background = container.querySelector("[data-eio-sprite=\"screen/aversion\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    render(<EioAversionScreen onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioAversionScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"obelisk\"]")).not.toBeNull();
  });
});
