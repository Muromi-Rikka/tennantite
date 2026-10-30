import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { InductionFurnaceScreenDemo } from "./demo";
import { InductionFurnaceScreen } from "./index";

describe("inductionFurnaceScreen", () => {
  it("渲染双输入 / 双产物 / 放电 / 4 升级槽与玩家背包", () => {
    const { container } = render(
      <InductionFurnaceScreen energy={{ max: 10000, value: 7200 }} />,
    );
    expect(screen.getByLabelText("machine-input-a")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-input-b")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-output-a")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-output-b")).toBeInTheDocument();
    expect(screen.getByLabelText("machine-discharge")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"machine-upgrade-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
  });

  it("热量文字渲染在左侧", () => {
    render(<InductionFurnaceScreen energy={{ max: 10000, value: 0 }} heat={46} />);
    expect(screen.getByText("热量:")).toBeInTheDocument();
    expect(screen.getByText(/46/)).toBeInTheDocument();
  });

  it("eU 表与 arrow 进度", () => {
    const { container } = render(
      <InductionFurnaceScreen energy={{ max: 10000, value: 7200 }} progress={0.3} />,
    );
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toHaveAttribute(
      "aria-valuenow",
      "7200",
    );
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("产物槽点击回调", async () => {
    const user = userEvent.setup();
    const onTakeOutputA = vi.fn();
    render(<InductionFurnaceScreen energy={{ max: 1, value: 1 }} onTakeOutputA={onTakeOutputA} />);
    await user.click(screen.getByLabelText("machine-output-a"));
    expect(onTakeOutputA).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<InductionFurnaceScreenDemo />);
    expect(screen.getByText("感应炉")).toBeInTheDocument();
  });
});
