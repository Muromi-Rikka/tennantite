import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CraftingScreenDemo } from "./demo";
import { CraftingScreen } from "./index";

describe("craftingScreen", () => {
  it("渲染 9 合成格 + 产物 + 9 快捷栏", () => {
    const { container } = render(<CraftingScreen />);
    expect(container.querySelectorAll(".mc-tex-slot[aria-label]").length).toBe(19);
  });

  it("产物槽位点击回调", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(
      <CraftingScreen
        craftResult={{ count: 1, icon: "diamond" }}
        onSlotClick={onSlotClick}
      />,
    );
    await user.click(screen.getByLabelText("craft-result-0"));
    expect(onSlotClick).toHaveBeenCalledWith("craft-result", 0);
  });

  it("demo 渲染", () => {
    render(<CraftingScreenDemo />);
    expect(screen.getByText("合成")).toBeInTheDocument();
  });
});
