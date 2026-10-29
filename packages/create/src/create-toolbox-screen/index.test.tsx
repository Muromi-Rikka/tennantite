import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_TOOLBOX, CREATE_TOOLBOX_COLORS } from "../create-metrics";
import { CreateToolboxScreen } from "./index";

describe("createToolboxScreen", () => {
  it("渲染 8 个隔层代表槽", () => {
    render(<CreateToolboxScreen items={[{ count: 1, icon: "iron-ingot" }]} />);
    expect(screen.getByLabelText("toolbox-0")).toBeInTheDocument();
    expect(screen.getByLabelText("toolbox-7")).toBeInTheDocument();
  });

  it("染料色条有 8 个可选项并回调颜色", () => {
    const onColorChange = vi.fn();
    render(<CreateToolboxScreen onColorChange={onColorChange} />);
    for (const index of CREATE_TOOLBOX_COLORS.keys()) {
      expect(screen.getByLabelText(`染料色 ${index}`)).toBeInTheDocument();
    }
    fireEvent.click(screen.getByLabelText("染料色 3"));
    expect(onColorChange).toHaveBeenCalledWith(CREATE_TOOLBOX_COLORS[3], 3);
  });

  it("选中染料色带 aria-pressed", () => {
    render(<CreateToolboxScreen selectedColor={CREATE_TOOLBOX_COLORS[1]} />);
    expect(screen.getByLabelText("染料色 1")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("染料色 0")).toHaveAttribute("aria-pressed", "false");
  });

  it("隔层槽按上游 xOffsets/yOffsets 定位", () => {
    const { container } = render(<CreateToolboxScreen />);
    const slot = container.querySelector("[aria-label='toolbox-1']") as HTMLElement;
    const compartment = CREATE_TOOLBOX.compartments[1];
    expect(slot.style.left).toBe(`calc(var(--mc-gui) * ${compartment.left})`);
    expect(slot.style.top).toBe(`calc(var(--mc-gui) * ${compartment.top})`);
  });

  it("确认/倒入按钮回调", () => {
    const onConfirm = vi.fn();
    const onDispose = vi.fn();
    render(<CreateToolboxScreen onConfirm={onConfirm} onDispose={onDispose} />);
    fireEvent.click(screen.getByLabelText("关闭"));
    fireEvent.click(screen.getByLabelText("倒入全部"));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onDispose).toHaveBeenCalledTimes(1);
  });
});
