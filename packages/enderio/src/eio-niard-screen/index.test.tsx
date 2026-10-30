import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioNiardScreenDemo } from "../demos";
import { EioNiardScreen } from "./index";

describe("eioNiardScreen", () => {
  it("渲染 3 个槽位与 screen/niard 背景", () => {
    const { container } = render(
      <EioNiardScreen items={{ "tank-fill-input": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"tank-\"]")).toHaveLength(3);
    const background = container.querySelector("[data-eio-sprite=\"screen/niard\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioNiardScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioNiardScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"tank\"]")).not.toBeNull();
  });
});
