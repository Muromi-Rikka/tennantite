import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioPaintingMachineScreenDemo } from "../demos";
import { EioPaintingMachineScreen } from "./index";

describe("eioPaintingMachineScreen", () => {
  it("渲染 4 个槽位与 screen/painting_machine 背景", () => {
    const { container } = render(
      <EioPaintingMachineScreen items={{ "painting-machine-input": {} }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"painting-machine-\"]")).toHaveLength(4);
    const background = container.querySelector("[data-eio-sprite=\"screen/painting_machine\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
  });

  it("进度条与能量", () => {
    const { container } = render(<EioPaintingMachineScreen energy={{ max: 100000, value: 48000 }} progress={0.45} />);
    expect(screen.getByRole("progressbar", { name: "涂色机进度" })).toHaveAttribute("aria-valuenow", "0.45");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "48");
    expect(container.querySelector("[data-eio-energy-bar]")).not.toBeNull();
  });

  it("控件按钮", async () => {
    const user = userEvent.setup();
    const onRedstoneChange = vi.fn();
    const onIoConfig = vi.fn();
    render(<EioPaintingMachineScreen onIoConfig={onIoConfig} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioPaintingMachineScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"paintingMachine\"]")).not.toBeNull();
  });
});
