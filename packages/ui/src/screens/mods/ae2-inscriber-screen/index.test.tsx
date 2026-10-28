import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { gui } from "../../../lib/utils";
import { Ae2InscriberScreenDemo } from "./demo";
import { Ae2InscriberScreen } from "./index";

describe("ae2InscriberScreen", () => {
  it("渲染四个 22/26 槽位、进度条与玩家背包", () => {
    const { container } = render(
      <Ae2InscriberScreen
        bottomPlate={{ icon: "nether-wart" }}
        input={{ icon: "gold-ingot" }}
        output={{ icon: "diamond" }}
        progress={0.6}
        topPlate={{ icon: "iron-ingot" }}
      />,
    );

    for (const label of ["inscriber-top", "inscriber-input", "inscriber-bottom", "inscriber-output"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByLabelText("inscriber-top")).toHaveStyle({
      left: gui(36),
      top: gui(20),
    });
    expect(screen.getByLabelText("inscriber-top")).toHaveClass("mc-tex-ae2-slot-large");
    expect(screen.getByLabelText("inscriber-output")).toHaveStyle({
      left: gui(108),
      top: gui(35),
    });

    const progress = screen.getByRole("progressbar", { name: "压印进度" });
    expect(progress).toHaveAttribute("aria-valuenow", "0.6");
    expect(progress).toHaveStyle({ left: gui(135), top: gui(39) });

    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("输出槽与工具栏回调", async () => {
    const user = userEvent.setup();
    const onTakeOutput = vi.fn();
    const onToolbarAction = vi.fn();
    render(
      <Ae2InscriberScreen
        onTakeOutput={onTakeOutput}
        onToolbarAction={onToolbarAction}
        output={{ icon: "diamond" }}
      />,
    );

    await user.click(screen.getByLabelText("inscriber-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();

    const actions = [
      ["分离面", "separate-sides"],
      ["自动输出", "auto-export"],
      ["缓冲区容量", "buffer"],
    ] as const;
    for (const [label, action] of actions) {
      await user.click(screen.getByRole("button", { name: label }));
      expect(onToolbarAction).toHaveBeenLastCalledWith(action);
    }
  });

  it("demo 渲染", () => {
    render(<Ae2InscriberScreenDemo />);
    expect(screen.getByText("压印器")).toBeInTheDocument();
  });
});
