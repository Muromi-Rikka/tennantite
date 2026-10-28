import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BatBoxScreenDemo } from "./demo";
import { BatBoxScreen } from "./index";

describe("batBoxScreen", () => {
  it("渲染充放电槽位、EU 存储与玩家背包", () => {
    const { container } = render(
      <BatBoxScreen
        charge={{}}
        energy={{ max: 40000, value: 26000 }}
      />,
    );
    expect(screen.getByLabelText("batbox-charge")).toBeInTheDocument();
    expect(screen.getByLabelText("batbox-discharge")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
    expect(screen.getByRole("progressbar", { name: "EU 存储" })).toHaveAttribute(
      "aria-valuenow",
      "26000",
    );
  });

  it("红石模式按钮循环切换：普通 → 反向 → 忽略", async () => {
    const user = userEvent.setup();
    const onRedstoneModeChange = vi.fn();
    render(
      <BatBoxScreen
        energy={{ max: 40000, value: 26000 }}
        onRedstoneModeChange={onRedstoneModeChange}
        redstoneMode="normal"
      />,
    );
    await user.click(screen.getByLabelText("红石模式：普通"));
    expect(onRedstoneModeChange).toHaveBeenCalledWith("inverted");
  });

  it("无回调时红石按钮为纯展示", () => {
    render(
      <BatBoxScreen
        energy={{ max: 40000, value: 26000 }}
        redstoneMode="inverted"
      />,
    );
    expect(screen.getByLabelText("红石模式：反向")).toBeInTheDocument();
  });

  it("demo 渲染", () => {
    render(<BatBoxScreenDemo />);
    expect(screen.getByText("储电箱")).toBeInTheDocument();
  });
});
