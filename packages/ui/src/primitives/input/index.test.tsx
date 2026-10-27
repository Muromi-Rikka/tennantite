import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./index";

describe("input", () => {
  it("渲染输入框并支持输入", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="输入内容" />);
    const input = screen.getByPlaceholderText("输入内容");
    expect(input).toHaveClass("mc-tex-text-field");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("触发 onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="改名" onChange={onChange} />);
    await user.type(screen.getByLabelText("改名"), "x");
    expect(onChange).toHaveBeenCalled();
  });

  it("disabled 不可输入", async () => {
    const user = userEvent.setup();
    render(<Input disabled placeholder="禁用" />);
    const input = screen.getByPlaceholderText("禁用");
    await user.type(input, "no");
    expect(input).toHaveValue("");
  });
});
