import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TradingScreenDemo } from "./demo";
import { TradingScreen } from "./index";

describe("tradingScreen", () => {
  it("渲染交易列表、价签槽与玩家背包", () => {
    const { container } = render(
      <TradingScreen
        trades={[
          { inputA: { count: 20 }, output: {} },
          { inputA: { count: 3 }, inputB: {}, output: {} },
        ]}
      />,
    );
    expect(screen.getByLabelText("交易 1")).toBeInTheDocument();
    expect(screen.getByLabelText("交易 2")).toBeInTheDocument();
    expect(container.querySelectorAll("[aria-label^=\"trade-row-0-\"]").length).toBe(2);
    expect(container.querySelectorAll("[aria-label^=\"trade-row-1-\"]").length).toBe(3);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]").length).toBe(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]").length).toBe(9);
  });

  it("列表物品与箭头使用原版坐标，空行不画箭头", () => {
    const { container } = render(
      <TradingScreen
        trades={[
          { inputA: { icon: "wheat" }, output: { icon: "emerald" } },
          {
            inputA: { icon: "emerald" },
            inputB: { icon: "apple" },
            outOfStock: true,
            output: { icon: "sword" },
          },
        ]}
      />,
    );

    expect(screen.getByLabelText("trade-row-0-input-a")).toHaveStyle({
      left: "calc(var(--mc-gui) * 10)",
      top: "calc(var(--mc-gui) * 19)",
    });
    expect(screen.getByLabelText("trade-row-1-input-b")).toHaveStyle({
      left: "calc(var(--mc-gui) * 40)",
    });
    expect(screen.getByLabelText("trade-row-1-output")).toHaveStyle({
      left: "calc(var(--mc-gui) * 73)",
      top: "calc(var(--mc-gui) * 39)",
    });
    expect(screen.getByLabelText("交易 1")).toHaveClass("mc-tex-btn");
    expect(screen.getByLabelText("交易 1")).toHaveStyle({
      width: "calc(var(--mc-gui) * 88)",
    });

    expect(
      container.querySelectorAll("[data-gui-sprite=\"sprites/container/villager/trade_arrow.png\"]"),
    ).toHaveLength(1);
    expect(
      container.querySelectorAll(
        "[data-gui-sprite=\"sprites/container/villager/trade_arrow_out_of_stock.png\"]",
      ),
    ).toHaveLength(1);
    expect(
      container.querySelector("[data-gui-sprite=\"sprites/container/villager/trade_arrow.png\"]"),
    ).toHaveStyle({
      left: "calc(var(--mc-gui) * 60)",
      top: "calc(var(--mc-gui) * 22)",
    });
    expect(
      container.querySelector("[data-gui-sprite=\"sprites/container/villager/scroller_disabled.png\"]"),
    ).not.toBeNull();
  });

  it("超过 7 条交易时启用滚动条", () => {
    const { container } = render(
      <TradingScreen
        trades={Array.from({ length: 8 }, () => ({ inputA: {}, output: {} }))}
      />,
    );
    expect(
      container.querySelector("[data-gui-sprite=\"sprites/container/villager/scroller.png\"]"),
    ).not.toBeNull();
    expect(container.querySelectorAll("[aria-label^=\"交易\"]")).toHaveLength(7);
  });

  it("交易点击回调携带索引并切换价签槽内容", async () => {
    const user = userEvent.setup();
    const onTradeSelect = vi.fn();
    render(
      <TradingScreen
        onTradeSelect={onTradeSelect}
        trades={[
          { inputA: { count: 3 }, output: {} },
          { inputA: { count: 7 }, output: {} },
        ]}
      />,
    );

    expect(within(screen.getByLabelText("trade-input-a")).getByText("3")).toBeInTheDocument();

    await user.click(screen.getByLabelText("交易 2"));
    expect(onTradeSelect).toHaveBeenCalledWith(1);
    expect(within(screen.getByLabelText("trade-input-a")).getByText("7")).toBeInTheDocument();
  });

  it("键盘可选择交易", async () => {
    const user = userEvent.setup();
    const onTradeSelect = vi.fn();
    render(
      <TradingScreen
        onTradeSelect={onTradeSelect}
        trades={[{ inputA: {}, output: {} }, { inputA: {}, output: {} }]}
      />,
    );
    await user.tab();
    screen.getByLabelText("交易 2").focus();
    await user.keyboard("{Enter}");
    expect(onTradeSelect).toHaveBeenCalledWith(1);
  });

  it("demo 渲染", () => {
    render(<TradingScreenDemo />);
    expect(screen.getByText("农民 - 新手")).toBeInTheDocument();
    expect(screen.getByText("交易")).toBeInTheDocument();
    expect(screen.getByText("物品栏")).toBeInTheDocument();
  });
});
