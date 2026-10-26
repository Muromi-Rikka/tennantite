import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { AdvancementsScreenDemo } from "./demo";

describe("advancementsScreen", () => {
  it("渲染分类 Tabs 与节点", () => {
    render(<AdvancementsScreenDemo />);
    expect(screen.getByRole("tab", { name: "minecraft" })).toBeInTheDocument();
    // 可见文本 + sr-only 无障碍副本同时存在
    expect(screen.getAllByText("计时器开始").length).toBe(2);
  });

  it("树形子节点缩进渲染", () => {
    render(<AdvancementsScreenDemo />);
    expect(screen.getAllByText("石器时代").length).toBe(2);
    expect(screen.getAllByText("获得升级").length).toBe(2);
  });

  it("悬浮显示描述", async () => {
    const user = userEvent.setup();
    render(<AdvancementsScreenDemo />);
    const node = screen
      .getAllByText("石器时代")
      .find(element => !element.classList.contains("sr-only"));
    await user.hover(node!);
    expect(await screen.findByText("获得石镐")).toBeInTheDocument();
  });
});
