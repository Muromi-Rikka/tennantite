import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioXpVacuumScreenDemo } from "../demos";
import { EioXpVacuumScreen } from "./index";

describe("eioXpVacuumScreen", () => {
  it("渲染 0 个槽位与 screen/xp_vacuum 背景", () => {
    const { container } = render(
      <EioXpVacuumScreen />,
    );
    expect(container.querySelectorAll("[aria-label^=\"xp-vacuum-\"]")).toHaveLength(0);
    const background = container.querySelector("[data-eio-sprite=\"screen/xp_vacuum\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    render(<EioXpVacuumScreen onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioXpVacuumScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"xpVacuum\"]")).not.toBeNull();
  });
});
