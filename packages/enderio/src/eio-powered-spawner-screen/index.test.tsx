import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioPoweredSpawnerScreenDemo } from "../demos";
import { EioPoweredSpawnerScreen } from "./index";

describe("eioPoweredSpawnerScreen", () => {
  it("渲染 3 个槽位与生成模式背景", () => {
    const { container } = render(<EioPoweredSpawnerScreen items={{ "powered-spawner-input": {} }} />);
    expect(container.querySelectorAll("[aria-label^=\"powered-spawner-\"]")).toHaveLength(3);
    const background = container.querySelector("[data-eio-sprite=\"screen/powered_spawner_spawn\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 187)");
  });

  it("捕获模式双背景切换", () => {
    const { container } = render(<EioPoweredSpawnerScreen mode="capture" />);
    expect(container.querySelector("[data-eio-sprite=\"screen/powered_spawner_capture\"]")).not.toBeNull();
    expect(screen.getByRole("progressbar", { name: "刷怪笼进度" })).toBeInTheDocument();
  });

  it("生成模式进度与能量", () => {
    const { container } = render(<EioPoweredSpawnerScreen energy={{ max: 100000, value: 48000 }} progress={0.45} />);
    expect(screen.getByRole("progressbar", { name: "刷怪笼进度" })).toHaveAttribute("aria-valuenow", "0.45");
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "48");
    expect(container.querySelector("[data-eio-energy-bar]")).not.toBeNull();
  });

  it("模式与红石按钮", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    const onRedstoneChange = vi.fn();
    render(<EioPoweredSpawnerScreen onModeChange={onModeChange} onRedstoneChange={onRedstoneChange} />);
    await user.click(screen.getByRole("button", { name: "刷怪模式" }));
    expect(onModeChange).toHaveBeenCalledWith("capture");
    await user.click(screen.getByRole("button", { name: "红石控制" }));
    expect(onRedstoneChange).toHaveBeenCalledOnce();
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioPoweredSpawnerScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"poweredSpawner\"]")).not.toBeNull();
  });
});
