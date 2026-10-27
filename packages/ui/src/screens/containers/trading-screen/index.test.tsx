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
    expect(container.querySelectorAll('[aria-label^="trade-"]').length).toBe(3);
    expect(container.querySelectorAll('[aria-label^="main-"]').length).toBe(27);
    expect(container.querySelectorAll('[aria-label^="hotbar-"]').length).toBe(9);
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
    expect(screen.getByText("村民交易")).toBeInTheDocument();
  });
});
