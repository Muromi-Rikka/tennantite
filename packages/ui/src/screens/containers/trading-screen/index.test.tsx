import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TradingScreenDemo } from "./demo";
import { TradingScreen } from "./index";

describe("tradingScreen", () => {
  it("渲染交易列表与交易按钮", () => {
    render(
      <TradingScreen
        trades={[
          { inputA: { count: 20 }, output: {} },
          { inputA: { count: 3 }, inputB: {}, output: {} },
        ]}
      />,
    );
    expect(screen.getByLabelText("交易 1")).toBeInTheDocument();
    expect(screen.getByLabelText("交易 2")).toBeInTheDocument();
  });

  it("交易点击回调携带索引", async () => {
    const user = userEvent.setup();
    const onTradeSelect = vi.fn();
    render(
      <TradingScreen
        onTradeSelect={onTradeSelect}
        trades={[{ inputA: {}, output: {} }, { inputA: {}, output: {} }]}
      />,
    );
    await user.click(screen.getByLabelText("交易 2"));
    expect(onTradeSelect).toHaveBeenCalledWith(1);
  });

  it("demo 渲染", () => {
    render(<TradingScreenDemo />);
    expect(screen.getByText("村民交易")).toBeInTheDocument();
  });
});
