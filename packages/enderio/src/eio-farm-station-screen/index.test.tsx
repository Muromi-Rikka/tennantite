import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioFarmStationScreenDemo } from "../demos";
import { EioFarmStationScreen } from "./index";

describe("eioFarmStationScreen", () => {
  it("渲染 16 个槽位与 screen/farm_station 背景", () => {
    const { container } = render(
      <EioFarmStationScreen items={{ "farm-station-tool-0": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"farm-station-\"]")).toHaveLength(16);
    const background = container.querySelector("[data-eio-sprite=\"screen/farm_station\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 169)");
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioFarmStationScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioFarmStationScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"farmStation\"]")).not.toBeNull();
  });
});
