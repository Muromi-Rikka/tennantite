import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioGroupDemo } from "./demo";
import { Radio, RadioGroup } from "./index";

describe("radioGroup", () => {
  it("渲染单选组并可选择", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="难度" onValueChange={onValueChange}>
        <label className="flex items-center gap-8">
          <Radio value="easy" />
          <span>简单</span>
        </label>
        <label className="flex items-center gap-8">
          <Radio value="hard" />
          <span>困难</span>
        </label>
      </RadioGroup>,
    );
    const hard = screen.getByRole("radio", { name: "困难" });
    expect(hard).not.toBeChecked();
    await user.click(hard);
    expect(hard).toBeChecked();
    expect(screen.getByRole("radio", { name: "简单" })).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("hard", expect.anything());
  });

  it("demo：受控选择", async () => {
    const user = userEvent.setup();
    render(<RadioGroupDemo />);
    const easy = screen.getByRole("radio", { name: "和平" });
    await user.click(easy);
    expect(screen.getByText("和平（当前）")).toBeInTheDocument();
    expect(screen.getByText("普通")).toBeInTheDocument();
  });

  it("方向键在选项间移动", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="难度" defaultValue="easy">
        <Radio aria-label="简单" value="easy" />
        <Radio aria-label="困难" value="hard" />
      </RadioGroup>,
    );
    await user.click(screen.getByRole("radio", { name: "简单" }));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "困难" })).toBeChecked();
  });
});
