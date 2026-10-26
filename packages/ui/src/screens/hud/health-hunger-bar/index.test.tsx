import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HealthHungerBarDemo } from "./demo";
import { HealthHungerBar } from "./index";

describe("healthHungerBar", () => {
  it("满血渲染 10 颗完整红心", () => {
    const { container } = render(<HealthHungerBar health={20} hunger={20} />);
    const hearts = container.querySelectorAll(
      "img[src*=\"data:image/svg+xml\"]",
    );
    expect(hearts.length).toBe(20); // 10 心 + 10 鸡腿
  });

  it("半血渲染半心图标（红与容器灰同框）", () => {
    const { container } = render(<HealthHungerBar health={1} hunger={20} />);
    const halfHearts = container.querySelectorAll(
      "img[src*=\"%23E3313B\"][src*=\"%234A4A4A\"]",
    );
    expect(halfHearts.length).toBe(1);
  });

  it("氧气未满时渲染氧气行", () => {
    const { container } = render(<HealthHungerBar health={20} hunger={20} oxygen={6} />);
    expect(container.querySelectorAll("span.rounded-full").length).toBe(10);
  });

  it("氧气满时隐藏氧气行", () => {
    const { container } = render(
      <HealthHungerBar health={20} hunger={20} oxygen={20} />,
    );
    expect(container.querySelectorAll("span.rounded-full").length).toBe(0);
  });

  it("demo 渲染三组状态", () => {
    const { container } = render(<HealthHungerBarDemo />);
    expect(container.querySelectorAll("[data-hud]").length).toBe(3);
  });
});
