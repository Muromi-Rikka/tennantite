import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeItemBatcherScreenDemo } from "../demos";
import { IeItemBatcherScreen } from "./index";

describe("ieItemBatcherScreen", () => {
  it("渲染 9 幽灵过滤槽、9 缓冲槽与背景贴图", () => {
    const { container } = render(<IeItemBatcherScreen />);
    expect(container.querySelectorAll("[aria-label^=\"item-batcher-filter-\"]")).toHaveLength(9);
    expect(container.querySelectorAll("[aria-label^=\"item-batcher-buffer-\"]")).toHaveLength(9);
    expect(container.querySelector("[data-ie-sprite=\"item_batcher\"]")).not.toBeNull();
  });

  it("槽位框坐标 = ItemBatcherMenu slot - 1（过滤首槽 8,30 → 7,29；缓冲 8,59 → 7,58）", () => {
    render(<IeItemBatcherScreen />);
    expect(screen.getByLabelText("item-batcher-filter-0").style.top).toBe("calc(var(--mc-gui) * 29)");
    expect(screen.getByLabelText("item-batcher-buffer-0").style.top).toBe("calc(var(--mc-gui) * 58)");
  });

  it("批量模式按钮与染色按钮回调", async () => {
    const user = userEvent.setup();
    const onModeToggle = vi.fn();
    const onColorClick = vi.fn();
    const { container } = render(<IeItemBatcherScreen colors={[true]} onColorClick={onColorClick} onModeToggle={onModeToggle} outputAll />);
    expect(container.querySelectorAll("[data-ie-batcher-color]")).toHaveLength(9);
    await user.click(screen.getByLabelText("批量输出全部"));
    expect(onModeToggle).toHaveBeenCalledOnce();
    await user.click(screen.getByLabelText("红石染色 0"));
    expect(onColorClick).toHaveBeenCalledWith(0);
  });

  it("demo 渲染", () => {
    render(<IeItemBatcherScreenDemo />);
    expect(screen.getByText("物品分批器")).toBeInTheDocument();
  });
});
