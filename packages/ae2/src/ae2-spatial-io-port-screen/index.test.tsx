import { gui } from "@tennantite/ui";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Ae2SpatialIoPortScreenDemo } from "./demo";
import { Ae2SpatialIoPortScreen } from "./index";

describe("ae2SpatialIoPortScreen", () => {
  it("渲染元件槽与五行状态文字", () => {
    const { container } = render(
      <Ae2SpatialIoPortScreen
        efficiency="92%"
        input={{ icon: "emerald" }}
        maxPower="10 kAE"
        output={{ icon: "diamond" }}
        regionSize="3x4x3"
        requiredPower="8.5 kAE"
        storedPower="6 kAE"
      />,
    );

    expect(screen.getByLabelText("spatial-io-input")).toHaveStyle({
      left: gui(52),
      top: gui(48),
    });
    expect(screen.getByLabelText("spatial-io-output")).toHaveStyle({
      left: gui(113),
      top: gui(48),
    });
    expect(screen.getByText("已存电力: 6 kAE")).toBeInTheDocument();
    expect(screen.getByText("最大电力: 10 kAE")).toBeInTheDocument();
    expect(screen.getByText("所需电力: 8.5 kAE")).toBeInTheDocument();
    expect(screen.getByText("效率: 92%")).toBeInTheDocument();
    expect(screen.getByText("空间区域大小: 3x4x3")).toBeInTheDocument();

    expect(screen.getByLabelText("main-0").parentElement).toHaveStyle({ top: gui(114) });
    expect(screen.getByLabelText("hotbar-0").parentElement).toHaveStyle({ top: gui(172) });
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
  });

  it("输入与输出回调", async () => {
    const user = userEvent.setup();
    const onInputClick = vi.fn();
    const onTakeOutput = vi.fn();
    render(
      <Ae2SpatialIoPortScreen
        input={{ icon: "emerald" }}
        onInputClick={onInputClick}
        onTakeOutput={onTakeOutput}
        output={{ icon: "diamond" }}
      />,
    );

    await user.click(screen.getByLabelText("spatial-io-input"));
    expect(onInputClick).toHaveBeenCalledWith(expect.objectContaining({ icon: "emerald" }));

    await user.click(screen.getByLabelText("spatial-io-output"));
    expect(onTakeOutput).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<Ae2SpatialIoPortScreenDemo />);
    expect(screen.getByText("空间 IO 端口")).toBeInTheDocument();
  });
});
