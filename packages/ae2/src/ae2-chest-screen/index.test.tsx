import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { gui } from "@tennantite/ui";
import { Ae2ChestScreenDemo } from "./demo";
import { Ae2ChestScreen } from "./index";

describe("ae2ChestScreen", () => {
  it("渲染存储槽、优先级标签与玩家背包", () => {
    const { container } = render(<Ae2ChestScreen storage={{ icon: "diamond" }} />);

    expect(screen.getByLabelText("chest-storage")).toHaveStyle({
      left: gui(79),
      top: gui(36),
    });
    expect(screen.getByLabelText("chest-storage")).toHaveClass("mc-tex-ae2-slot");
    expect(screen.getByRole("button", { name: "优先级" })).toBeInTheDocument();

    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("存储槽与优先级回调", async () => {
    const user = userEvent.setup();
    const onPriority = vi.fn();
    const onStorageClick = vi.fn();
    render(
      <Ae2ChestScreen onPriority={onPriority} onStorageClick={onStorageClick} />,
    );

    await user.click(screen.getByLabelText("chest-storage"));
    expect(onStorageClick).toHaveBeenCalledOnce();

    await user.click(screen.getByRole("button", { name: "优先级" }));
    expect(onPriority).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<Ae2ChestScreenDemo />);
    expect(screen.getByText("ME 箱子")).toBeInTheDocument();
  });
});
