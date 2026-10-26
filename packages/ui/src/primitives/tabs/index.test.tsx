import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TabsDemo } from "./demo";
import { Tabs, TabsList, TabsPanel, TabsTab } from "./index";

describe("tabs", () => {
  it("渲染标签页并切换面板", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Tabs defaultValue="blocks" onValueChange={onValueChange}>
        <TabsList aria-label="分类">
          <TabsTab value="blocks">方块</TabsTab>
          <TabsTab value="items">物品</TabsTab>
        </TabsList>
        <TabsPanel value="blocks">面板 A</TabsPanel>
        <TabsPanel value="items">面板 B</TabsPanel>
      </Tabs>,
    );
    expect(screen.getByText("面板 A")).toBeVisible();
    expect(screen.queryByText("面板 B")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "物品" }));
    expect(screen.getByText("面板 B")).toBeVisible();
    expect(onValueChange).toHaveBeenCalledWith("items", expect.anything());
  });

  it("方向键在标签间移动（manual 模式按 Enter 激活）", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="blocks">
        <TabsList aria-label="分类">
          <TabsTab value="blocks">方块</TabsTab>
          <TabsTab value="items">物品</TabsTab>
        </TabsList>
        <TabsPanel value="blocks">面板 A</TabsPanel>
        <TabsPanel value="items">面板 B</TabsPanel>
      </Tabs>,
    );
    await user.click(screen.getByRole("tab", { name: "方块" }));
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "物品" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("面板 B")).toBeVisible();
  });

  it("demo：渲染", async () => {
    const user = userEvent.setup();
    render(<TabsDemo />);
    await user.click(screen.getByRole("tab", { name: "红石" }));
    expect(screen.getByText("中继器 / 比较器 / 活塞…")).toBeVisible();
  });
});
