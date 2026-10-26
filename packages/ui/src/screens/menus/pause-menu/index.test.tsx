import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PauseMenuDemo } from "./demo";
import { PauseMenu } from "./index";

describe("pauseMenu", () => {
  it("trigger 打开弹窗并渲染按钮栈", async () => {
    const user = userEvent.setup();
    render(<PauseMenu />);
    await user.click(screen.getByRole("button", { name: "打开暂停菜单" }));
    expect(await screen.findByText("游戏菜单")).toBeVisible();
    expect(
      screen.getByRole("button", { name: "保存并退出到标题界面" }),
    ).toBeVisible();
  });

  it("按钮回调后弹窗关闭", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <PauseMenu actions={[{ label: "回到游戏", onClick }]} />,
    );
    await user.click(screen.getByRole("button", { name: "打开暂停菜单" }));
    const back = await screen.findByRole("button", { name: "回到游戏" });
    await user.click(back);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<PauseMenuDemo />);
    expect(screen.getByRole("button", { name: "打开暂停菜单" })).toBeInTheDocument();
  });
});
