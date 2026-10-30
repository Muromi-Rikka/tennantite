import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2SkyChestScreenDemo } from "./demo";
import { Ae2SkyChestScreen } from "./index";

describe("ae2SkyChestScreen", () => {
  it("渲染 36 格存储热区与玩家背包", () => {
    const { container } = render(<Ae2SkyChestScreen />);

    expect(screen.getByLabelText("skychest-0")).toHaveStyle({
      left: gui(8),
      top: gui(24),
    });
    // 第 4 行末槽：(8 + 8·18, 24 + 3·18)
    expect(screen.getByLabelText("skychest-35")).toHaveStyle({
      left: gui(152),
      top: gui(78),
    });
    expect(container.querySelectorAll("[aria-label^=\"skychest-\"]").length).toBe(36);

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(112) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(170) });
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("存储槽回调", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<Ae2SkyChestScreen onSlotClick={onSlotClick} />);

    await user.click(screen.getByLabelText("skychest-10"));
    expect(onSlotClick).toHaveBeenCalledWith(10, undefined);
  });

  it("demo 渲染", () => {
    render(<Ae2SkyChestScreenDemo />);
    expect(screen.getByText("ME 天空石箱")).toBeInTheDocument();
  });
});
