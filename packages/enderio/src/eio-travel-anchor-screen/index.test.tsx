import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioTravelAnchorScreenDemo } from "../demos";
import { EioTravelAnchorScreen } from "./index";

describe("eioTravelAnchorScreen", () => {
  it("渲染幽影槽与 176×184 背景", () => {
    const { container } = render(<EioTravelAnchorScreen ghost={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"travel-anchor-\"]")).toHaveLength(1);
    const background = container.querySelector("[data-eio-sprite=\"screen/travel_anchor\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 184)");
  });

  it("名称输入与可见性切换", async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();
    const onVisibleChange = vi.fn();
    render(
      <EioTravelAnchorScreen
        name="传送门"
        onNameChange={onNameChange}
        onVisibleChange={onVisibleChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "锚点可见性" }));
    expect(onVisibleChange).toHaveBeenCalledWith(true);
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioTravelAnchorScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"travelAnchor\"]")).not.toBeNull();
  });
});
