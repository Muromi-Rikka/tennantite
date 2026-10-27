import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MainMenuDemo } from "./demo";
import { MainMenu } from "./index";

describe("mainMenu", () => {
  it("渲染标题与默认按钮栈", () => {
    render(<MainMenu />);
    expect(screen.getByText("VERDIGRIS")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "单人游戏" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "退出游戏" })).toBeInTheDocument();
  });

  it("点击回调", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<MainMenu actions={[{ label: "开始", onClick }]} />);
    await user.click(screen.getByRole("button", { name: "开始" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("自定义背景层替换默认泥土背景", () => {
    render(
      <MainMenu
        background={<div data-testid="custom-background" />}
        title="标题"
      />,
    );
    expect(screen.getByTestId("custom-background")).toBeInTheDocument();
  });

  it("demo 渲染", () => {
    render(<MainMenuDemo />);
    expect(screen.getByText("最近的世界（无）")).toBeDisabled();
  });
});
