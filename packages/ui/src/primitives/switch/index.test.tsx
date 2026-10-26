import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./index";

describe("switch", () => {
  it("渲染开关并响应点击", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="难度锁定" />);
    const sw = screen.getByRole("switch", { name: "难度锁定" });
    expect(sw).toHaveClass("mc-tex-slot");
    expect(sw).not.toBeChecked();
    await user.click(sw);
    expect(sw).toBeChecked();
  });

  it("onCheckedChange 回调", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch aria-label="开关" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch", { name: "开关" }));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it("disabled 不可切换", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="禁用" disabled />);
    await user.click(screen.getByRole("switch", { name: "禁用" }));
    expect(screen.getByRole("switch", { name: "禁用" })).not.toBeChecked();
  });
});
