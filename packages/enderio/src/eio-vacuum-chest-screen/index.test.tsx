import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioVacuumChestScreenDemo } from "../demos";
import { EioVacuumChestScreen } from "./index";

describe("eioVacuumChestScreen", () => {
  it("渲染 28 个槽位与 screen/vacuum_chest 背景", () => {
    const { container } = render(
      <EioVacuumChestScreen items={{ "vacuum-chest-filter": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"vacuum-chest-\"]")).toHaveLength(28);
    const background = container.querySelector("[data-eio-sprite=\"screen/vacuum_chest\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 206)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    render(<EioVacuumChestScreen onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioVacuumChestScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"vacuumChest\"]")).not.toBeNull();
  });
});
