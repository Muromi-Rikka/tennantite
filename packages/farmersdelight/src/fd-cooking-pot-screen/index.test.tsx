import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FD_DEMO_ITEMS } from "../fd-demo-data";
import { FdCookingPotScreen } from "./index";

describe("fdCookingPotScreen", () => {
  it("渲染 176×166 面板与 9 个物品槽", () => {
    const { container } = render(
      <FdCookingPotScreen
        container={FD_DEMO_ITEMS.potion}
        ingredients={[
          FD_DEMO_ITEMS.apple,
          FD_DEMO_ITEMS.wheat,
          null,
          null,
          null,
          null,
        ]}
        meal={FD_DEMO_ITEMS.apple}
        output={FD_DEMO_ITEMS.wheat}
      />,
    );
    const root = container.querySelector("[data-fd-machine=\"cookingPot\"]") as HTMLElement;
    expect(root).not.toBeNull();
    expect(root.style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(root.style.height).toBe("calc(var(--mc-gui) * 166)");
    expect(container.querySelectorAll("[aria-label^=\"cooking-pot-input-\"]")).toHaveLength(6);
    expect(container.querySelectorAll("[aria-label=\"cooking-pot-meal\"]")).toHaveLength(1);
    expect(container.querySelectorAll("[aria-label=\"cooking-pot-container\"]")).toHaveLength(1);
    expect(container.querySelectorAll("[aria-label=\"cooking-pot-output\"]")).toHaveLength(1);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
  });

  it("标题、背包标签与槽位坐标取自上游数值", () => {
    const { container } = render(<FdCookingPotScreen />);
    expect(screen.getByText("厨锅")).toBeInTheDocument();
    expect(screen.getByText("物品栏")).toBeInTheDocument();
    const firstInput = container.querySelector("[aria-label=\"cooking-pot-input-0\"]") as HTMLElement;
    expect(firstInput.style.left).toBe("calc(var(--mc-gui) * 29)");
    expect(firstInput.style.top).toBe("calc(var(--mc-gui) * 16)");
    const output = container.querySelector("[aria-label=\"cooking-pot-output\"]") as HTMLElement;
    expect(output.style.left).toBe("calc(var(--mc-gui) * 123)");
    expect(output.style.top).toBe("calc(var(--mc-gui) * 54)");
    expect(container.querySelector("[data-fd-sprite=\"cooking_pot\"]")).not.toBeNull();
    expect(screen.getByRole("progressbar", { name: "烹饪进度" })).toBeInTheDocument();
  });

  it("受热时绘制火焰，配方书按钮可关闭", () => {
    const { container } = render(<FdCookingPotScreen heated progress={0.5} />);
    expect(screen.getByRole("img", { name: "已受热" })).toBeInTheDocument();
    expect(container.querySelectorAll("[data-fd-sprite=\"cooking_pot\"]").length).toBeGreaterThanOrEqual(3);
    expect(screen.getByRole("button", { name: "配方书" })).toBeInTheDocument();
  });

  it("showRecipeBookButton={false} 时不渲染按钮", () => {
    render(<FdCookingPotScreen showRecipeBookButton={false} />);
    expect(screen.queryByRole("button", { name: "配方书" })).toBeNull();
    expect(screen.getByRole("img", { name: "下方需要热源" })).toBeInTheDocument();
  });

  it("点击槽位回调带槽位名", async () => {
    const onSlotClick = vi.fn();
    const { container } = render(<FdCookingPotScreen onSlotClick={onSlotClick} />);
    const slot = container.querySelector("[aria-label=\"cooking-pot-input-3\"]") as HTMLElement;
    await userEvent.click(slot);
    expect(onSlotClick).toHaveBeenCalledWith("cooking-pot-input-3");
  });
});
