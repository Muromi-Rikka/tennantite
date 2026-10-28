import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../testing/a11y";
import { Ic2EnergyGauge } from "./index";

describe("ic2EnergyGauge", () => {
  it("可访问性（progressbar 语义）", async () => {
    const { container } = render(
      <Ic2EnergyGauge label="EU 能量" left={0} max={40000} tooltip top={0} value={26000} />,
    );
    await expectNoAxeViolations(container);
  });

  it("暴露 progressbar 语义与 EU 值域", () => {
    render(<Ic2EnergyGauge label="EU 能量" left={0} max={40000} top={0} value={26000} />);
    const gauge = screen.getByRole("progressbar", { name: "EU 能量" });
    expect(gauge).toHaveAttribute("aria-valuenow", "26000");
    expect(gauge).toHaveAttribute("aria-valuemax", "40000");
    expect(gauge).toHaveAttribute("aria-valuemin", "0");
    expect(gauge).toHaveAttribute("data-ic2-gauge", "bolt");
  });

  it("value 为 0 时不渲染填充", () => {
    const { container } = render(<Ic2EnergyGauge left={0} max={100} top={0} value={0} />);
    expect(container.querySelector("[data-ic2-gauge-fill]")).toBeNull();
  });

  it("按比例裁剪填充：横条自左向右，闪电自下而上", () => {
    const bar = render(
      <Ic2EnergyGauge left={0} max={100} top={0} value={50} variant="bar" />,
    ).container;
    expect((bar.querySelector("[data-ic2-gauge-fill]") as HTMLElement).style.clipPath)
      .toBe("inset(0 50% 0 0)");

    const bolt = render(
      <Ic2EnergyGauge left={0} max={100} top={0} value={50} variant="bolt" />,
    ).container;
    expect((bolt.querySelector("[data-ic2-gauge-fill]") as HTMLElement).style.clipPath)
      .toBe("inset(50% 0 0 0)");
  });

  it("越界值仍渲染填充（ratio 收敛到 1）", () => {
    const { container } = render(<Ic2EnergyGauge left={0} max={100} top={0} value={500} />);
    expect(container.querySelector("[data-ic2-gauge-fill]")).not.toBeNull();
  });

  it("tooltip 变体悬浮显示 EU 文本", async () => {
    const user = userEvent.setup();
    render(<Ic2EnergyGauge label="EU 能量" left={0} max={40000} tooltip top={0} value={26000} />);
    expect(screen.queryByText("26000 / 40000 EU")).not.toBeInTheDocument();
    await user.hover(screen.getByRole("progressbar", { name: "EU 能量" }));
    expect(await screen.findByText("26000 / 40000 EU")).toBeInTheDocument();
  });
});
