import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HotbarDemo } from "./demo";
import { Hotbar } from "./index";

describe("hotbar", () => {
  it("始终渲染 9 个槽位", () => {
    const { container } = render(<Hotbar />);
    expect(container.querySelectorAll(".mc-tex-slot").length).toBe(9);
  });

  it("selectedIndex 对应槽位选中", () => {
    const { container } = render(<Hotbar selectedIndex={3} />);
    const slots = container.querySelectorAll(".mc-tex-slot");
    expect(slots[3]).toHaveClass("outline-2");
    expect(slots[2]).not.toHaveClass("outline-2");
  });

  it("注入物品数据渲染计数", () => {
    render(
      <Hotbar
        items={[{ count: 64, icon: "stone-block" }]}
        selectedIndex={0}
      />,
    );
    expect(screen.getByText("64")).toBeInTheDocument();
  });

  it("demo 渲染选中第 3 格", () => {
    const { container } = render(<HotbarDemo />);
    const slots = container.querySelectorAll(".mc-tex-slot");
    expect(slots[2]).toHaveClass("outline-2");
  });
});
