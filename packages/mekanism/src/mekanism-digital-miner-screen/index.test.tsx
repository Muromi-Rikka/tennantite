import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MekanismDigitalMinerScreen } from "./index";

describe("mekanismDigitalMinerScreen", () => {
  it("renders status screen, switches, buttons and the 9×3 grid at 176×242", () => {
    const { container } = render(
      <MekanismDigitalMinerScreen
        energy={{ max: 10000, value: 6400 }}
        searchText="搜索完成"
        statusText="运行中"
        switches={{ eject: true }}
        toMineText="1,024"
      />,
    );
    expect(screen.getByText("数字采矿机")).toBeInTheDocument();
    expect(container.querySelector(".relative.inline-block")).toHaveStyle({ height: "calc(var(--mc-gui) * 242)", width: "calc(var(--mc-gui) * 176)" });
    expect(screen.getByText("运行中")).toBeInTheDocument();
    expect(screen.getByText("搜索完成")).toBeInTheDocument();
    expect(screen.getByText("待挖：1,024")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "自动弹出" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "自动拉取" }).getAttribute("aria-pressed")).toBe("false");
    expect(screen.getAllByRole("button", { name: "启动" })[0]).toBeInTheDocument();
    // 9×3 输出网格 + 玩家背包同标签（main-0..26）各 27
    expect(container.querySelectorAll("[aria-label^='main-']")).toHaveLength(54);
    expect(container.querySelectorAll("[aria-label^='hotbar-']")).toHaveLength(9);
    expect(screen.getByRole("progressbar", { name: "能量" })).toHaveAttribute("aria-valuenow", "64");
  });

  it("shows a check overlay on the missing slot when no block is missing", () => {
    const { container, rerender } = render(<MekanismDigitalMinerScreen />);
    expect(container.querySelector(":scope [aria-label='missing'] [data-mek-sprite='slot/overlay/check']")).toBeTruthy();
    rerender(<MekanismDigitalMinerScreen missing={{ icon: "stone-block" }} />);
    expect(container.querySelector(":scope [aria-label='missing'] [data-mek-sprite='slot/overlay/check']")).toBeNull();
  });

  it("reports button and switch interactions", async () => {
    const onStartClick = vi.fn();
    const onStopClick = vi.fn();
    const onConfigClick = vi.fn();
    const onResetClick = vi.fn();
    const onSwitchChange = vi.fn();
    render(
      <MekanismDigitalMinerScreen
        onConfigClick={onConfigClick}
        onResetClick={onResetClick}
        onStartClick={onStartClick}
        onStopClick={onStopClick}
        onSwitchChange={onSwitchChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "启动" }));
    expect(onStartClick).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "停止" }));
    expect(onStopClick).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "配置" }));
    expect(onConfigClick).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "重置" }));
    expect(onResetClick).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "精准采集" }));
    expect(onSwitchChange).toHaveBeenCalledWith("silk", true);
  });

  it("opens the side config and upgrade windows", async () => {
    render(<MekanismDigitalMinerScreen />);
    await userEvent.click(screen.getByLabelText("config"));
    expect(screen.getByRole("dialog", { name: "配置：能量" })).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("upgrade"));
    expect(screen.getByRole("dialog", { name: "升级" })).toBeInTheDocument();
  });
});
