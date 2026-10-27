import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HotbarDemo } from "./demo";
import { Hotbar } from "./index";

describe("hotbar", () => {
  it("始终渲染 9 个槽位", () => {
    const { container } = render(<Hotbar />);
    expect(container.querySelectorAll(":scope [data-hud] > div.absolute").length).toBe(9);
  });

  it("selectedIndex 对应槽位选中", () => {
    const { container } = render(<Hotbar selectedIndex={3} />);
    const selected = container.querySelectorAll(":scope [data-selected]");
    expect(selected).toHaveLength(1);
    expect(selected[0]).toBe(container.querySelectorAll(":scope [data-hud] > div.absolute")[3]);
  });

  it("选中时渲染 24×23 选中框", () => {
    const { container } = render(<Hotbar selectedIndex={0} />);
    expect(container.querySelectorAll(":scope .mc-tex-hotbar-selection")).toHaveLength(1);
    expect(container.querySelector(":scope .mc-tex-hotbar-selection")).toHaveAttribute(
      "style",
      expect.stringContaining("calc(var(--mc-gui) * -1)"),
    );
  });

  it("未选中时不渲染选中框", () => {
    const { container } = render(<Hotbar />);
    expect(container.querySelector(":scope .mc-tex-hotbar-selection")).toBeNull();
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
    const selected = container.querySelectorAll(":scope [data-selected]");
    expect(selected).toHaveLength(1);
    expect(selected[0]).toBe(container.querySelectorAll(":scope [data-hud] > div.absolute")[2]);
  });
});
