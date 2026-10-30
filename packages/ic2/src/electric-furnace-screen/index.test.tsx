import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ElectricFurnaceScreenDemo } from "./demo";
import { ElectricFurnaceScreen } from "./index";

describe("electricFurnaceScreen", () => {
  it("渲染 7 个机器槽位与玩家背包", () => {
    const { container } = render(
      <ElectricFurnaceScreen energy={{ max: 2000, value: 1750 }} input={{}} output={{ count: 3 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toHaveAttribute(
      "aria-valuenow",
      "1750",
    );
  });

  it("熔炼进度使用原版 arrow 贴图", () => {
    const { container } = render(<ElectricFurnaceScreen progress={0.8} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.8",
    );
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "arrow",
    );
  });

  it("产物槽位点击回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    render(<ElectricFurnaceScreen onTakeOutput={onTakeOutput} output={{ count: 1 }} />);
    await user.click(screen.getByLabelText("machine-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<ElectricFurnaceScreenDemo />);
    expect(screen.getByText("电炉")).toBeInTheDocument();
  });
});
