import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SelectDemo } from "./demo";
import { Select, SelectIcon, SelectItem, SelectList, SelectPopup, SelectTrigger, SelectValue } from "./index";

function renderBasicSelect(onValueChange?: (value: null | string) => void) {
  return render(
    <Select<string> onValueChange={onValueChange} value="survival">
      <SelectTrigger aria-label="游戏模式">
        <SelectValue>生存</SelectValue>
        <SelectIcon />
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          <SelectItem value="survival">生存</SelectItem>
          <SelectItem value="creative">创造</SelectItem>
        </SelectList>
      </SelectPopup>
    </Select>,
  );
}

describe("select", () => {
  it("渲染触发器并打开下拉", async () => {
    const user = userEvent.setup();
    renderBasicSelect();
    const trigger = screen.getByRole("combobox", { name: "游戏模式" });
    expect(trigger).toHaveClass("mc-tex-btn");
    await user.click(trigger);
    expect(await screen.findByText("创造")).toBeInTheDocument();
  });

  it("选中项与触发器都使用像素箭头", async () => {
    const user = userEvent.setup();
    const { container } = renderBasicSelect();

    const icon = container.querySelector(":scope button[role=\"combobox\"] span[aria-hidden=\"true\"]");
    expect(icon?.querySelector("svg")).not.toBeNull();
    expect(icon?.textContent).toBe("");

    await user.click(screen.getByRole("combobox", { name: "游戏模式" }));
    const option = await screen.findByRole("option", { name: "生存" });
    expect(option.querySelector("svg")).not.toBeNull();
    expect(option.textContent).not.toContain("◄");
  });

  it("选择选项后关闭并回调", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderBasicSelect(onValueChange);
    await user.click(screen.getByRole("combobox", { name: "游戏模式" }));
    await user.click(await screen.findByText("创造"));
    expect(onValueChange).toHaveBeenCalledWith("creative", expect.anything());
  });

  it("demo：渲染与打开", async () => {
    const user = userEvent.setup();
    render(<SelectDemo />);
    await user.click(screen.getByRole("combobox", { name: "游戏模式" }));
    expect(await screen.findByText("旁观")).toBeInTheDocument();
  });
});
