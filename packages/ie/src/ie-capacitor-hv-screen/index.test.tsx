import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeCapacitorHvScreenDemo } from "../demos";
import { IeCapacitorHvScreen } from "./index";

describe("ieCapacitorHvScreen", () => {
  it("能量条按存量/容量渲染（2600000/4000000 → 65）", () => {
    render(<IeCapacitorHvScreen energy={{ capacity: 4000000, value: 2600000 }} />);
    expect(screen.getByRole("progressbar", { name: "电容能量" })).toHaveAttribute(
      "aria-valuenow",
      "65",
    );
    expect(screen.getByText("2600000 IF")).toBeInTheDocument();
    expect(screen.getByText("容量 4000000 IF")).toBeInTheDocument();
  });

  it("iO 模式按钮切换回调", async () => {
    const user = userEvent.setup();
    const onModeChange = vi.fn();
    render(
      <IeCapacitorHvScreen
        energy={{ capacity: 4000000, value: 0 }}
        mode="input"
        onModeChange={onModeChange}
      />,
    );
    expect(screen.getByLabelText("capacitor-hv-mode-in")).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByLabelText("capacitor-hv-mode-out"));
    expect(onModeChange).toHaveBeenCalledWith("output");
  });

  it("demo 渲染", () => {
    render(<IeCapacitorHvScreenDemo />);
    expect(screen.getByText("高压电容")).toBeInTheDocument();
  });
});
