import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CREATE_STOCK_KEEPER } from "../create-metrics";
import { CreateStockKeeperScreen } from "./index";

describe("createStockKeeperScreen", () => {
  it("渲染标题、搜索框、地址框与发送按钮", () => {
    render(
      <CreateStockKeeperScreen
        address="仓库 3 号"
        items={[
          { count: 64, icon: "wheat" },
          { count: 128, icon: "iron-ingot" },
        ]}
      />,
    );
    expect(screen.getByText("库存管理员")).toBeInTheDocument();
    expect(screen.getByLabelText("搜索物品")).toBeInTheDocument();
    const address = screen.getByLabelText("包裹地址") as HTMLInputElement;
    expect(address.value).toBe("仓库 3 号");
    expect(screen.getByLabelText("发送订单")).toBeInTheDocument();
  });

  it("物品条目按 20px 栅格渲染分类行与数量", () => {
    render(
      <CreateStockKeeperScreen
        categories={[
          { id: "food", items: [{ count: 64, icon: "wheat" }], name: "食材" },
          { id: "misc", items: [{ count: 10000, icon: "iron-ingot" }], name: "杂物" },
        ]}
      />,
    );
    expect(screen.getByText("食材")).toBeInTheDocument();
    expect(screen.getByText("杂物")).toBeInTheDocument();
    expect(screen.getByLabelText("stock-wheat")).toBeInTheDocument();
    expect(screen.getByText("10k")).toBeInTheDocument();
  });

  it("锁定按钮两态与回调", () => {
    const onLockToggle = vi.fn();
    render(<CreateStockKeeperScreen items={[]} locked onLockToggle={onLockToggle} />);
    expect(screen.getByLabelText("解锁")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("解锁"));
    expect(onLockToggle).toHaveBeenCalledTimes(1);
    render(<CreateStockKeeperScreen items={[]} />);
    expect(screen.getByLabelText("锁定")).toBeInTheDocument();
  });

  it("下单行渲染物品条目", () => {
    render(<CreateStockKeeperScreen items={[]} order={[{ count: 64, icon: "wheat" }]} />);
    expect(screen.getByLabelText("order-wheat")).toBeInTheDocument();
  });

  it("发送按钮与搜索/地址回调", () => {
    const onSend = vi.fn();
    const onSearchChange = vi.fn();
    const onAddressChange = vi.fn();
    render(
      <CreateStockKeeperScreen
        items={[]}
        onAddressChange={onAddressChange}
        onSearchChange={onSearchChange}
        onSend={onSend}
      />,
    );
    fireEvent.click(screen.getByLabelText("发送订单"));
    fireEvent.change(screen.getByLabelText("搜索物品"), { target: { value: "铁" } });
    fireEvent.change(screen.getByLabelText("包裹地址"), { target: { value: "车站" } });
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSearchChange).toHaveBeenCalledWith("铁");
    expect(onAddressChange).toHaveBeenCalledWith("车站");
  });

  it("窗口高度按 bodyRows 计算且滚动条按常量定位", () => {
    const { container } = render(<CreateStockKeeperScreen bodyRows={5} items={[]} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.height).toBe(
      `calc(var(--mc-gui) * ${CREATE_STOCK_KEEPER.headerHeight + 5 * CREATE_STOCK_KEEPER.rowHeight + CREATE_STOCK_KEEPER.footerHeight})`,
    );
    render(<CreateStockKeeperScreen bodyRows={6} items={[]} />);
  });
});
