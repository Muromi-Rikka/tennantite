import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FdRecipeBookButton } from "./index";

describe("fdRecipeBookButton", () => {
  it("默认位于面板内 (5, 34) 且绘制原版按钮精灵", () => {
    const { container } = render(<FdRecipeBookButton />);
    const button = screen.getByRole("button", { name: "配方书" }) as HTMLElement;
    expect(button.style.left).toBe("calc(var(--mc-gui) * 5)");
    expect(button.style.top).toBe("calc(var(--mc-gui) * 34)");
    expect(button.style.width).toBe("calc(var(--mc-gui) * 20)");
    expect(button.style.height).toBe("calc(var(--mc-gui) * 18)");
    expect(container.querySelector("[data-gui-sprite=\"sprites/recipe_book/button.png\"]")).not.toBeNull();
  });

  it("aria-pressed 跟随 open，点击回调一次", async () => {
    const onToggle = vi.fn();
    render(<FdRecipeBookButton onToggle={onToggle} open />);
    const button = screen.getByRole("button", { name: "配方书" });
    expect(button).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("label / left / top 可覆盖", () => {
    render(<FdRecipeBookButton label="recipe book" left={0} top={1} />);
    const button = screen.getByRole("button", { name: "recipe book" }) as HTMLElement;
    expect(button.style.left).toBe("calc(var(--mc-gui) * 0)");
    expect(button.style.top).toBe("calc(var(--mc-gui) * 1)");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
