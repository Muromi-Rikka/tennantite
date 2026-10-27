import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../../testing/a11y";
import { ItemStackDemo } from "./demo";
import { ItemStack } from "./index";

describe("itemStack", () => {
  it("渲染槽位与图标", () => {
    const { container } = render(<ItemStack icon="stone-block" />);
    expect(container.querySelector(".mc-tex-slot")).not.toBeNull();
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("count > 1 渲染计数徽标，count = 1 不渲染", () => {
    const { container, rerender } = render(<ItemStack count={64} icon="stone-block" />);
    expect(screen.getByText("64")).toBeInTheDocument();
    rerender(<ItemStack count={1} icon="stone-block" />);
    expect(container.querySelector("span")).toBeNull();
  });

  it("selected 传入槽位白色内框", () => {
    const { container } = render(<ItemStack icon="diamond" selected />);
    expect(container.querySelector(".mc-tex-slot")).toHaveClass("mc-slot-selected");
  });

  it("tooltip 包裹后悬浮显示", async () => {
    const user = userEvent.setup();
    render(<ItemStack icon="apple" tooltip="苹果" />);
    await user.hover(screen.getByText(/苹果/));
    expect(await screen.findAllByText("苹果")).not.toHaveLength(0);
  });

  it("demo 渲染", () => {
    render(<ItemStackDemo />);
    expect(screen.getByText("64")).toBeInTheDocument();
  });

  it("可访问性（含 tooltip 版本）", async () => {
    const { container } = render(<ItemStack icon="apple" tooltip="苹果" />);
    await expectNoAxeViolations(container);
  });
});
