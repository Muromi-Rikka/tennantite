import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Ic2BlastFurnaceScreenDemo } from "./demo";
import { Ic2BlastFurnaceScreen } from "./index";

describe("blastFurnaceScreen", () => {
  it("渲染输入 / 双产物 / 进出气 / 流体 / 4 升级槽与玩家背包", () => {
    const { container } = render(<Ic2BlastFurnaceScreen />);
    expect(screen.getByLabelText("machine-input")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-output-0")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-output-1")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-cell-input")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-cell-output")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-fluid")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"machine-upgrade-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("热量竖条按 0..100 暴露进度语义并自下而上裁剪", () => {
    const { container } = render(<Ic2BlastFurnaceScreen heat={0.64} />);
    const gauge = screen.getByRole("progressbar", { name: "热量" });
    expect(gauge).toHaveAttribute("aria-valuenow", "64");
    expect(gauge).toHaveAttribute("aria-valuemax", "100");
    expect(container.querySelector("[data-ic2-heat-gauge-fill]")).toBeInTheDocument();
  });

  it("arrow 进度与 Heat 文字", () => {
    const { container } = render(<Ic2BlastFurnaceScreen progress={0.4} />);
    expect(screen.getByText("Heat")).toBeInTheDocument();
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("demo 渲染", () => {
    render(<Ic2BlastFurnaceScreenDemo />);
    expect(screen.getByText("高炉")).toBeInTheDocument();
  });
});
