import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Dialog, DialogDescription, DialogPopup, DialogTitle, DialogTrigger } from "./index";

describe("dialog", () => {
  it("打开后显示标题与描述，Escape 关闭", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={onOpenChange} open>
        <DialogPopup>
          <DialogTitle>确认退出？</DialogTitle>
          <DialogDescription>未保存的进度将会丢失。</DialogDescription>
        </DialogPopup>
      </Dialog>,
    );
    expect(screen.getByText("确认退出？")).toBeVisible();
    expect(screen.getByText("未保存的进度将会丢失。")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything());
  });

  it("由 Trigger 打开", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger>打开</DialogTrigger>
        <DialogPopup>
          <DialogTitle>暂停</DialogTitle>
        </DialogPopup>
      </Dialog>,
    );
    await user.click(screen.getByText("打开"));
    expect(await screen.findByText("暂停")).toBeVisible();
  });
});
