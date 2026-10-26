import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./index";

describe("checkbox", () => {
  it("渲染复选框并可用键盘切换", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox aria-label="显示云" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox", { name: "显示云" });
    expect(checkbox).toHaveClass("mc-tex-slot");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("space 键切换", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="平滑光照" />);
    const checkbox = screen.getByRole("checkbox", { name: "平滑光照" });
    await user.click(checkbox);
    await user.keyboard(" ");
    expect(checkbox).not.toBeChecked();
  });

  it("disabled 不可切换", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="全屏" disabled />);
    const checkbox = screen.getByRole("checkbox", { name: "全屏" });
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
