import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ElectricFurnaceScreenDemo } from "./demo";
import { ElectricFurnaceScreen } from "./index";

describe("electricFurnaceScreen", () => {
  it("渲染输入 / 输出槽位与玩家背包", () => {
    const { container } = render(<ElectricFurnaceScreen input={{}} output={{ count: 3 }} />);
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]").length).toBe(2);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("处理进度反映传入值", () => {
    render(<ElectricFurnaceScreen progress={0.8} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.8",
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
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
