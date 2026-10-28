import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { expectNoAxeViolations } from "../../../testing/a11y";
import { EuBar } from "./index";

describe("euBar", () => {
  it("可访问性（progressbar 语义）", async () => {
    const { container } = render(<EuBar label="EU 能量" max={40000} value={26000} />);
    await expectNoAxeViolations(container);
  });

  it("暴露 progressbar 语义与 EU 值域", () => {
    render(<EuBar label="EU 能量" max={40000} value={26000} />);
    const bar = screen.getByRole("progressbar", { name: "EU 能量" });
    expect(bar).toHaveAttribute("aria-valuenow", "26000");
    expect(bar).toHaveAttribute("aria-valuemax", "40000");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
  });

  it("有储能时渲染绿色填充与液面线", () => {
    const { container } = render(<EuBar max={100} value={50} />);
    expect(container.querySelector(".mc-tex-ic2-eu-fill")).not.toBeNull();
    expect(container.querySelector(".mc-tex-ic2-eu-surface")).not.toBeNull();
  });

  it("空槽不渲染填充，满槽不渲染液面线", () => {
    const empty = render(<EuBar max={100} value={0} />).container;
    expect(empty.querySelector(".mc-tex-ic2-eu-fill")).toBeNull();
    const full = render(<EuBar max={100} value={100} />).container;
    expect(full.querySelector(".mc-tex-ic2-eu-fill")).not.toBeNull();
    expect(full.querySelector(".mc-tex-ic2-eu-surface")).toBeNull();
  });

  it("tooltip 变体悬浮显示 EU 文本", async () => {
    const user = userEvent.setup();
    render(<EuBar label="EU 能量" max={40000} tooltip value={26000} />);
    expect(screen.queryByText("26000 / 40000 EU")).not.toBeInTheDocument();
    await user.hover(screen.getByRole("progressbar", { name: "EU 能量" }));
    expect(await screen.findByText("26000 / 40000 EU")).toBeInTheDocument();
  });

  it("越界值收敛到 0..1", () => {
    const { container } = render(<EuBar max={100} value={500} />);
    expect(container.querySelector(".mc-tex-ic2-eu-fill")).not.toBeNull();
    expect(container.querySelector(".mc-tex-ic2-eu-surface")).toBeNull();
  });
});
