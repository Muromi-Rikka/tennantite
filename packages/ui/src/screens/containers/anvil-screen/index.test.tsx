import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AnvilScreenDemo } from "./demo";
import { AnvilScreen } from "./index";

describe("anvilScreen", () => {
  it("渲染名称输入、3 个槽位与玩家背包", () => {
    const { container } = render(
      <AnvilScreen item={{}} material={{}} result={{}} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"anvil-\"]").length).toBe(3);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
    expect(screen.getByLabelText("物品名称")).toBeInTheDocument();
  });

  it("名称输入回调", async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();
    render(<AnvilScreen onNameChange={onNameChange} />);
    await user.type(screen.getByLabelText("物品名称"), "X");
    expect(onNameChange).toHaveBeenCalledWith("X");
  });

  it("产物点击回调与等级费用显示", async () => {
    const user = userEvent.setup();
    const onTakeResult = vi.fn();
    render(<AnvilScreen levelCost={3} onTakeResult={onTakeResult} result={{}} />);
    expect(screen.getByText("3 级")).toBeInTheDocument();
    await user.click(screen.getByLabelText("anvil-result"));
    expect(onTakeResult).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<AnvilScreenDemo />);
    expect(screen.getByText("修理")).toBeInTheDocument();
  });
});
