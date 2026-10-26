import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SignEditDemo } from "./demo";
import { SignEdit } from "./index";

describe("signEdit", () => {
  it("渲染 4 行输入", () => {
    render(<SignEdit />);
    for (let index = 1; index <= 4; index += 1) {
      expect(screen.getByLabelText(`告示牌第 ${index} 行`)).toBeInTheDocument();
    }
  });

  it("maxLines 限制行数", () => {
    render(<SignEdit maxLines={2} />);
    expect(screen.getByLabelText("告示牌第 1 行")).toBeInTheDocument();
    expect(screen.queryByLabelText("告示牌第 3 行")).toBeNull();
  });

  it("行编辑回调", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SignEdit maxLines={1} onChange={onChange} />);
    await user.type(screen.getByLabelText("告示牌第 1 行"), "A");
    expect(onChange).toHaveBeenCalledWith(["A"]);
  });

  it("demo 渲染", () => {
    render(<SignEditDemo />);
    expect(screen.getByText("编辑告示牌文字")).toBeInTheDocument();
  });
});
