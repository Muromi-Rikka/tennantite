import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_SCHEMATIC_TABLE } from "../create-metrics";
import { CreateSchematicTableScreen } from "./index";

describe("createSchematicTableScreen", () => {
  it("渲染输入/输出槽", () => {
    render(
      <CreateSchematicTableScreen input={{ count: 1, icon: "wheat" }} output={{ count: 1, icon: "wheat" }} />,
    );
    expect(screen.getByLabelText("input")).toBeInTheDocument();
    expect(screen.getByLabelText("output")).toBeInTheDocument();
  });

  it("进度条 aria-valuenow 跟随 progress", () => {
    render(<CreateSchematicTableScreen progress={0.25} />);
    expect(screen.getByRole("progressbar", { name: "progress" })).toHaveAttribute("aria-valuenow", "0.25");
  });

  it("槽位/进度/按钮按常量定位", () => {
    const { container } = render(<CreateSchematicTableScreen />);
    const input = container.querySelector("[aria-label='input']") as HTMLElement;
    expect(input.style.left).toBe(`calc(var(--mc-gui) * ${CREATE_SCHEMATIC_TABLE.slots.input.left})`);
    expect(input.style.top).toBe(`calc(var(--mc-gui) * ${CREATE_SCHEMATIC_TABLE.slots.input.top})`);
    const output = container.querySelector("[aria-label='output']") as HTMLElement;
    expect(output.style.left).toBe(`calc(var(--mc-gui) * ${CREATE_SCHEMATIC_TABLE.slots.output.left})`);
    const progress = screen.getByRole("progressbar", { name: "progress" });
    expect(progress.style.left).toBe(`calc(var(--mc-gui) * ${CREATE_SCHEMATIC_TABLE.progress.left})`);
  });

  it("确认按钮回调", () => {
    const onConfirm = vi.fn();
    render(<CreateSchematicTableScreen onConfirm={onConfirm} />);
    fireEvent.click(screen.getByLabelText("确认"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
