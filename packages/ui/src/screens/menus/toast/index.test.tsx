import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NotificationBadge, Toast, ToastStack } from "./index";

describe("toast", () => {
  it("按 variant 选择 160×32 背景", () => {
    const { container } = render(<Toast title="Recipe" variant="recipe" />);
    expect(container.querySelector("[data-gui-sprite=\"sprites/toast/recipe.png\"]")).toBeInTheDocument();
    expect(container.querySelector("[data-toast-variant=\"recipe\"]")).toBeInTheDocument();
  });

  it("system 使用 160×64", () => {
    const { container } = render(<Toast description="Saved" title="System" variant="system" />);
    expect(container.querySelector("[data-gui-sprite=\"sprites/toast/system.png\"]")).toHaveStyle({
      height: "calc(var(--mc-gui) * 64)",
    });
  });

  it("关闭回调与角标上限", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(<Toast onClose={onClose} title="X" />);
    await user.click(screen.getByRole("button", { name: "关闭通知" }));
    expect(onClose).toHaveBeenCalledOnce();
    expect(container.querySelector("[data-gui-sprite^=\"sprites/notification/\"]")).toBeNull();
  });

  it("toastStack 与 NotificationBadge", () => {
    const { container } = render(
      <>
        <ToastStack toasts={[{ title: "A" }, { title: "B" }]} />
        <NotificationBadge count={9} />
      </>,
    );
    expect(container.querySelectorAll("[data-toast-variant]")).toHaveLength(2);
    expect(container.querySelector("[data-gui-sprite=\"sprites/notification/more.png\"]")).toBeInTheDocument();
  });
});
