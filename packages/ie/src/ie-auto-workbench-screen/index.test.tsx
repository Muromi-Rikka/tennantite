import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeAutoWorkbenchScreenDemo } from "../demos";
import { IeAutoWorkbenchScreen } from "./index";

describe("ieAutoWorkbenchScreen", () => {
  it("渲染 17 个槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeAutoWorkbenchScreen blueprint={{}} storage={Array.from({ length: 16 }, () => ({}))} />);
    expect(container.querySelectorAll("[aria-label^=\"auto-workbench-\"]")).toHaveLength(17);
    expect(container.querySelector("[data-ie-sprite=\"auto_workbench\"]")).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("槽位框坐标 = AutoWorkbenchMenu slot - 1（存储首槽 7,24 → 6,23；图纸 102,69 → 101,68）", () => {
    render(<IeAutoWorkbenchScreen blueprint={{}} />);
    expect(screen.getByLabelText("auto-workbench-storage-0").style.left).toBe("calc(var(--mc-gui) * 6)");
    expect(screen.getByLabelText("auto-workbench-storage-0").style.top).toBe("calc(var(--mc-gui) * 23)");
    expect(screen.getByLabelText("auto-workbench-blueprint").style.left).toBe("calc(var(--mc-gui) * 101)");
  });

  it("配方选择按钮（3 配方 → yy=59，选中高亮）与回调", async () => {
    const user = userEvent.setup();
    const onRecipeSelect = vi.fn();
    const { container } = render(
      <IeAutoWorkbenchScreen
        onRecipeSelect={onRecipeSelect}
        recipes={[
          { icon: "iron-ingot", selected: true },
          { icon: "iron-ingot" },
          { icon: "iron-ingot" },
        ]}
      />,
    );
    expect(container.querySelectorAll("[data-ie-recipe-selected]")).toHaveLength(3);
    expect(screen.getByLabelText("配方 0（当前）").getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByLabelText("配方 0（当前）").style.top).toBe("calc(var(--mc-gui) * 68)");
    await user.click(screen.getByLabelText("配方 1"));
    expect(onRecipeSelect).toHaveBeenCalledWith(1);
  });

  it("能量条渲染", () => {
    render(<IeAutoWorkbenchScreen energy={{ max: 32000, value: 16000 }} />);
    expect(screen.getByRole("progressbar", { name: "自动工作台能量" })).toHaveAttribute("aria-valuenow", "50");
  });

  it("demo 渲染", () => {
    render(<IeAutoWorkbenchScreenDemo />);
    expect(screen.getByText("自动工作台")).toBeInTheDocument();
  });
});
