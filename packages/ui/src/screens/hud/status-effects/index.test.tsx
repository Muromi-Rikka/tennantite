import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { StatusEffectsDemo } from "./demo";
import { StatusEffects } from "./index";

describe("statusEffects", () => {
  it("空效果列表渲染 null", () => {
    const { container } = render(<StatusEffects effects={[]} />);
    expect(container.childElementCount).toBe(0);
  });

  it("渲染效果图标与可访问名称", () => {
    render(<StatusEffects effects={[{ amplifier: "II", name: "速度" }]} />);
    expect(screen.getByText("速度 II")).toBeInTheDocument();
  });

  it("悬浮显示时长", async () => {
    const user = userEvent.setup();
    render(<StatusEffects effects={[{ duration: "0:30", name: "速度" }]} />);
    await user.hover(screen.getByText("速度"));
    expect(await screen.findByText("0:30")).toBeInTheDocument();
  });

  it("demo 渲染三个效果", () => {
    render(<StatusEffectsDemo />);
    expect(screen.getByText("速度 II")).toBeInTheDocument();
    expect(screen.getByText("跳跃提升")).toBeInTheDocument();
  });
});
