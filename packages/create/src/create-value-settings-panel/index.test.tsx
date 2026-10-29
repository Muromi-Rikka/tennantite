import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_VALUE_SETTINGS } from "../create-metrics";
import { CreateValueSettingsPanel } from "./index";

describe("createValueSettingsPanel", () => {
  it("渲染标题与数值文本", () => {
    render(<CreateValueSettingsPanel max={32} min={0} title="数量" value={16} />);
    expect(screen.getByText("数量")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();
  });

  it("增减按钮按 step 回调并夹在 min/max 之间", () => {
    const onChange = vi.fn();
    render(<CreateValueSettingsPanel max={32} min={0} onChange={onChange} step={2} value={30} />);
    fireEvent.click(screen.getByLabelText("增大"));
    expect(onChange).toHaveBeenLastCalledWith(32);
    fireEvent.click(screen.getByLabelText("减小"));
    expect(onChange).toHaveBeenLastCalledWith(28);
  });

  it("区间条 aria-valuenow 呈现 value 位置", () => {
    render(<CreateValueSettingsPanel max={32} min={0} title="数量" value={16} />);
    expect(screen.getByRole("progressbar", { name: "数量" })).toHaveAttribute("aria-valuenow", "0.5");
  });

  it("每 8 格一个里程碑、当前值用宽里程碑", () => {
    const { container } = render(<CreateValueSettingsPanel max={32} min={0} value={16} />);
    const bar = container.querySelector("[role='progressbar']")!.parentElement!;
    const milestones = [...bar.children].filter(node => node instanceof HTMLElement && Object.hasOwn(node.dataset, "modSprite"));
    expect(milestones).toHaveLength(Math.floor(32 / CREATE_VALUE_SETTINGS.milestoneInterval) + 1);
  });

  it("min 时禁用减小、max 时禁用增大", () => {
    const first = render(<CreateValueSettingsPanel max={32} min={0} value={0} />);
    expect(first.getByLabelText("减小")).toBeDisabled();
    first.unmount();
    const last = render(<CreateValueSettingsPanel max={32} min={0} value={32} />);
    expect(last.getByLabelText("增大")).toBeDisabled();
  });
});
