import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeFluidSorterScreenDemo } from "../demos";
import { IeFluidSorterScreen } from "./index";

describe("ieFluidSorterScreen", () => {
  it("渲染 48 个流体过滤区与 6 个 NBT 开关", () => {
    const { container } = render(<IeFluidSorterScreen />);
    expect(container.querySelectorAll("[aria-label^=\"fluid-sorter-filter-\"]")).toHaveLength(48);
    expect(container.querySelectorAll("[data-ie-sorter-bit]")).toHaveLength(6);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("过滤区坐标 = getSlotArea menu 值（面 0 首格 4,22，不 -1）", () => {
    render(<IeFluidSorterScreen />);
    const cell = screen.getByLabelText("fluid-sorter-filter-side0-top-0");
    expect(cell.style.left).toBe("calc(var(--mc-gui) * 4)");
    expect(cell.style.top).toBe("calc(var(--mc-gui) * 22)");
  });

  it("流体染色与 NBT 回调", async () => {
    const user = userEvent.setup();
    const onCellClick = vi.fn();
    const onNbtClick = vi.fn();
    render(<IeFluidSorterScreen filters={[{ tint: "#3a5cc8" }]} nbt={[true]} onCellClick={onCellClick} onNbtClick={onNbtClick} />);
    expect(screen.getByLabelText("fluid-sorter-filter-side0-top-0").dataset.ieFluidFilter).toBe("#3a5cc8");
    await user.click(screen.getByLabelText("面 0 NBT 过滤开关"));
    expect(onNbtClick).toHaveBeenCalledWith(0);
    await user.click(screen.getByLabelText("fluid-sorter-filter-side0-top-0"));
    expect(onCellClick).toHaveBeenCalledWith(0, 0);
  });

  it("demo 渲染", () => {
    render(<IeFluidSorterScreenDemo />);
    expect(screen.getByText("流体分拣器")).toBeInTheDocument();
  });
});
