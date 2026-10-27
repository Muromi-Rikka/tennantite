import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HealthHungerBarDemo } from "./demo";
import { HealthHungerBar } from "./index";

describe("healthHungerBar", () => {
  it("满血渲染 10 颗完整红心 + 10 个鸡腿", () => {
    const { container } = render(<HealthHungerBar health={20} hunger={20} />);
    const icons = container.querySelectorAll("img[data-icon]");
    expect(icons.length).toBe(20);
  });

  it("半血渲染半心图标（红与容器灰同框）", () => {
    const { container } = render(<HealthHungerBar health={1} hunger={20} />);
    const halfHearts = container.querySelectorAll(
      "img[data-icon=\"heart-half\"]",
    );
    expect(halfHearts.length).toBe(1);
  });

  it("图标为 9 GUI px 且水平重叠 1 GUI px", () => {
    const { container } = render(<HealthHungerBar health={20} hunger={20} />);
    const hearts = container.querySelectorAll("img[data-icon]");
    expect(hearts[0]).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 9)"));
    expect(hearts[0]).toHaveClass("-mr-1");
    expect(hearts[9]).not.toHaveClass("-mr-1");
  });

  it("氧气未满时渲染氧气气泡行", () => {
    const { container } = render(<HealthHungerBar health={20} hunger={20} oxygen={6} />);
    const air = container.querySelectorAll("img[data-icon^=\"air\"]");
    expect(air.length).toBe(10);
  });

  it("氧气满时隐藏氧气行", () => {
    const { container } = render(
      <HealthHungerBar health={20} hunger={20} oxygen={20} />,
    );
    expect(container.querySelectorAll("img[data-icon^=\"air\"]").length).toBe(0);
  });

  it("demo 渲染三组状态", () => {
    const { container } = render(<HealthHungerBarDemo />);
    expect(container.querySelectorAll("[data-hud]").length).toBe(3);
  });
});
