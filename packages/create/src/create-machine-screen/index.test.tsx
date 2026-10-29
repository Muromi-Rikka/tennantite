import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_MACHINE_LAYOUT } from "../create-machine-layout";
import { CreateMillstoneScreen } from "./index";

describe("createMillstoneScreen", () => {
  it("渲染输入/输出槽并注入物品", () => {
    render(
      <CreateMillstoneScreen input={{ count: 1, icon: "wheat" }} output={{ count: 2, icon: "wheat" }} progress={0} />,
    );
    expect(screen.getByLabelText("input")).toBeInTheDocument();
    expect(screen.getByLabelText("output")).toBeInTheDocument();
  });

  it("progressbar aria-valuenow 跟随 progress", () => {
    render(<CreateMillstoneScreen progress={0.5} />);
    expect(screen.getByRole("progressbar", { name: "progress" })).toHaveAttribute("aria-valuenow", "0.5");
  });

  it("槽位与进度条按布局常量定位", () => {
    const { container } = render(<CreateMillstoneScreen progress={0} />);
    const layout = CREATE_MACHINE_LAYOUT.millstone;
    const input = container.querySelector("[aria-label='input']") as HTMLElement;
    expect(input.style.left).toBe(`calc(var(--mc-gui) * ${layout.input.left})`);
    expect(input.style.top).toBe(`calc(var(--mc-gui) * ${layout.input.top})`);
    const progress = screen.getByRole("progressbar", { name: "progress" });
    expect(progress.style.left).toBe(`calc(var(--mc-gui) * ${layout.progress.left})`);
    expect(progress.style.top).toBe(`calc(var(--mc-gui) * ${layout.progress.top})`);
    expect(progress.style.width).toBe(`calc(var(--mc-gui) * ${layout.progress.width})`);
  });

  it("crusher 共用布局且标题可覆盖", () => {
    render(<CreateMillstoneScreen machine="crusher" progress={0} title="粉碎机" />);
    expect(screen.getByText("粉碎机")).toBeInTheDocument();
  });

  it("点击槽位回调", () => {
    const onInputClick = vi.fn();
    const onOutputClick = vi.fn();
    render(
      <CreateMillstoneScreen onInputClick={onInputClick} onOutputClick={onOutputClick} progress={0} />,
    );
    fireEvent.click(screen.getByLabelText("input"));
    fireEvent.click(screen.getByLabelText("output"));
    expect(onInputClick).toHaveBeenCalledTimes(1);
    expect(onOutputClick).toHaveBeenCalledTimes(1);
  });
});
