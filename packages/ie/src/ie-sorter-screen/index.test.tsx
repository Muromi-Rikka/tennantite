import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeSorterScreenDemo } from "../demos";
import { IeSorterScreen } from "./index";

describe("ieSorterScreen", () => {
  it("渲染 54 个幽灵过滤槽与背景贴图", () => {
    const { container } = render(<IeSorterScreen />);
    expect(container.querySelectorAll("[aria-label^=\"sorter-filter-\"]")).toHaveLength(54);
    expect(container.querySelector("[data-ie-sprite=\"sorter\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("幽灵槽框坐标 = SorterMenu slot - 1（面 0 首槽 4,22 → 3,21；面间步距 58/76）", () => {
    render(<IeSorterScreen />);
    expect(screen.getByLabelText("sorter-filter-side0-top-0").style.top).toBe("calc(var(--mc-gui) * 21)");
    expect(screen.getByLabelText("sorter-filter-side2-top-0").style.left).toBe("calc(var(--mc-gui) * 61)");
    expect(screen.getByLabelText("sorter-filter-side1-top-0").style.top).toBe("calc(var(--mc-gui) * 97)");
  });

  it("18 个过滤位开关按钮与回调（按面序/位序）", async () => {
    const user = userEvent.setup();
    const onMaskClick = vi.fn();
    const { container } = render(
      <IeSorterScreen
        masks={[{ components: true, damage: false, tags: false }, { components: false, damage: true, tags: false }]}
        onMaskClick={onMaskClick}
      />,
    );
    expect(container.querySelectorAll("[data-ie-sorter-bit]")).toHaveLength(18);
    await user.click(screen.getByLabelText("面 0 damage 过滤开关"));
    expect(onMaskClick).toHaveBeenCalledWith("damage", 0);
  });

  it("demo 渲染", () => {
    render(<IeSorterScreenDemo />);
    expect(screen.getByText("分拣器")).toBeInTheDocument();
  });
});
