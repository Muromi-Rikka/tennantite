import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FurnaceScreenDemo } from "./demo";
import { FurnaceScreen } from "./index";

describe("furnaceScreen", () => {
  it("渲染 3 个功能槽位与玩家背包", () => {
    const { container } = render(
      <FurnaceScreen fuel={{ count: 3 }} input={{}} output={{ count: 2 }} />,
    );
    expect(container.querySelectorAll("[aria-label^=\"furnace-\"]").length).toBe(3);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("火焰与箭头进度反映传入值", () => {
    render(<FurnaceScreen burnProgress={0.5} cookProgress={0.25} />);
    expect(screen.getByRole("progressbar", { name: "燃料燃烧进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.5",
    );
    expect(screen.getByRole("progressbar", { name: "熔炼进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.25",
    );
  });

  it("产物槽位点击回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    render(<FurnaceScreen onTakeOutput={onTakeOutput} output={{ count: 1 }} />);
    await user.click(screen.getByLabelText("furnace-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<FurnaceScreenDemo />);
    expect(screen.getByText("熔炉")).toBeInTheDocument();
  });
});
