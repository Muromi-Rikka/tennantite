import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MaceratorScreenDemo } from "./demo";
import { MaceratorScreen } from "./index";

describe("maceratorScreen", () => {
  it("渲染 7 个机器槽位、EU 能量表与玩家背包", () => {
    const { container } = render(
      <MaceratorScreen
        energy={{ max: 2000, value: 1400 }}
        input={{}}
        output={{ count: 2 }}
      />,
    );
    expect(container.querySelectorAll("[aria-label^=\"machine-\"]")).toHaveLength(7);
    for (let index = 0; index < 4; index += 1) {
      expect(screen.getByLabelText(`machine-upgrade-${index}`)).toBeInTheDocument();
    }
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "EU 能量" })).toHaveAttribute(
      "aria-valuenow",
      "1400",
    );
  });

  it("粉碎进度使用原版 crush 贴图", () => {
    const { container } = render(<MaceratorScreen progress={0.45} />);
    expect(screen.getByRole("progressbar", { name: "处理进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.45",
    );
    expect(container.querySelector("[data-ic2-progress]")).toHaveAttribute(
      "data-ic2-progress",
      "crush",
    );
  });

  it("产物槽位点击回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    render(<MaceratorScreen onTakeOutput={onTakeOutput} output={{ count: 1 }} />);
    await user.click(screen.getByLabelText("machine-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<MaceratorScreenDemo />);
    expect(screen.getByText("磨矿机")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
