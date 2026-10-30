import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeModWorkbenchScreenDemo } from "../demos";
import { IeModWorkbenchScreen } from "./index";

describe("ieModWorkbenchScreen", () => {
  it("渲染 17 个槽位、背景贴图与玩家背包", () => {
    const { container } = render(
      <IeModWorkbenchScreen inputs={Array.from({ length: 6 }, () => ({}))} outputs={Array.from({ length: 9 }, () => ({}))} shader={{}} tool={{}} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"mod-workbench-\"]")).toHaveLength(17);
    expect(container.querySelector("[data-ie-sprite=\"workbench\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("槽位框坐标 = ModWorkbenchContainer slot - 1（工具 24,22 → 23,21；升级 74,21 → 73,20）", () => {
    render(<IeModWorkbenchScreen tool={{}} />);
    expect(screen.getByLabelText("mod-workbench-tool").style.left).toBe("calc(var(--mc-gui) * 23)");
    expect(screen.getByLabelText("mod-workbench-input-0").style.left).toBe("calc(var(--mc-gui) * 73)");
    expect(screen.getByLabelText("mod-workbench-input-0").style.top).toBe("calc(var(--mc-gui) * 20)");
    expect(screen.getByLabelText("mod-workbench-output-0").style.left).toBe("calc(var(--mc-gui) * 117)");
  });

  it("翻页按钮回调（当前页 1 → 左 0 / 右 2）", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<IeModWorkbenchScreen currentPage={1} onPageChange={onPageChange} />);
    await user.click(screen.getByLabelText("上一页"));
    expect(onPageChange).toHaveBeenCalledWith(0);
    await user.click(screen.getByLabelText("下一页"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("demo 渲染", () => {
    render(<IeModWorkbenchScreenDemo />);
    expect(screen.getByText("工程师工作台")).toBeInTheDocument();
  });
});
