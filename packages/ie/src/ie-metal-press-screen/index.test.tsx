import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeMetalPressScreenDemo } from "../demos";
import { IE_MACHINES } from "../ie-machine-layout";
import { IeMetalPressScreen } from "./index";

describe("ieMetalPressScreen", () => {
  it("渲染输入 / 三模具 / 输出槽与玩家背包", () => {
    const { container } = render(
      <IeMetalPressScreen input={{}} molds={[null, null, null]} output={{}} />,
    );
    expect(screen.getByLabelText("metal-press-input")).not.toBeNull();
    expect(screen.getByLabelText("metal-press-output")).not.toBeNull();
    expect(container.querySelectorAll("button[aria-label^=\"metal-press-mold-\"]")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("传送带进度水平填充（0.5 → 50）", () => {
    render(<IeMetalPressScreen progress={0.5} />);
    const belt = screen.getByRole("progressbar", { name: "金属压机进度" });
    expect(belt).toHaveAttribute("aria-valuenow", "50");
    expect(belt.style.width).toBe(`calc(var(--mc-gui) * ${IE_MACHINES.metalPress.belt.width})`);
  });

  it("模具选择回调与选中态", async () => {
    const user = userEvent.setup();
    const onMoldSelect = vi.fn();
    const { rerender } = render(
      <IeMetalPressScreen activeMold={1} molds={[null, null, null]} onMoldSelect={onMoldSelect} />,
    );
    expect(screen.getByLabelText("metal-press-mold-1（当前）")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByLabelText("metal-press-mold-2"));
    expect(onMoldSelect).toHaveBeenCalledWith(2);
    rerender(<IeMetalPressScreen molds={[null, null, null]} />);
    expect(screen.getByLabelText("metal-press-mold-1")).toHaveAttribute("aria-pressed", "false");
  });

  it("demo 渲染", () => {
    render(<IeMetalPressScreenDemo />);
    expect(screen.getByText("金属压机")).toBeInTheDocument();
  });
});
