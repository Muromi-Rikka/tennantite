import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ChatScreenDemo } from "./demo";
import { ChatScreen } from "./index";

describe("chatScreen", () => {
  it("渲染历史消息与作者高亮", () => {
    render(<ChatScreenDemo />);
    expect(screen.getByText(/大家好多钻石/)).toBeInTheDocument();
    expect(screen.getByText("<Steve>")).toBeInTheDocument();
  });

  it("回车触发发送并清空输入", async () => {
    const user = userEvent.setup();
    const onSend = vi.fn();
    render(<ChatScreen onSend={onSend} />);
    const input = screen.getByLabelText("聊天输入");
    await user.type(input, "hi{Enter}");
    expect(onSend).toHaveBeenCalledWith("hi");
    expect(input).toHaveValue("");
  });

  it("demo 渲染", () => {
    render(<ChatScreenDemo />);
    expect(screen.getByText("<Alex>")).toBeInTheDocument();
    expect(screen.getByLabelText("聊天输入")).toBeInTheDocument();
  });
});
