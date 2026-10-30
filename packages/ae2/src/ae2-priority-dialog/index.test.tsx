import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2PriorityDialogDemo } from "./demo";
import { Ae2PriorityDialog } from "./index";

describe("ae2PriorityDialog", () => {
  it("渲染数值框与四档加/减按钮", () => {
    render(<Ae2PriorityDialog priority={-12} />);

    expect(screen.getByText("优先级")).toBeInTheDocument();
    expect(screen.getByText("-12")).toBeInTheDocument();
    for (const label of ["优先级 +1", "优先级 +10", "优先级 +100", "优先级 +1000", "优先级 -1", "优先级 -1000"]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    expect(screen.getByLabelText("返回原界面")).toBeInTheDocument();

    const plus1 = screen.getByLabelText("优先级 +1");
    expect(plus1).toHaveStyle({ left: "calc(var(--mc-gui) * 20)", top: "calc(var(--mc-gui) * 32)" });
    const minus1000 = screen.getByLabelText("优先级 -1000");
    expect(minus1000).toHaveStyle({ left: "calc(var(--mc-gui) * 120)", top: "calc(var(--mc-gui) * 69)" });
  });

  it("加减按钮回写数值", async () => {
    const user = userEvent.setup();
    const onPriorityChange = vi.fn();
    render(<Ae2PriorityDialog onPriorityChange={onPriorityChange} priority={5} />);

    await user.click(screen.getByLabelText("优先级 +100"));
    expect(onPriorityChange).toHaveBeenCalledWith(105);

    await user.click(screen.getByLabelText("优先级 -10"));
    expect(onPriorityChange).toHaveBeenCalledWith(-5);
  });

  it("demo 渲染", () => {
    render(<Ae2PriorityDialogDemo />);
    expect(screen.getByText("优先级")).toBeInTheDocument();
  });
});
