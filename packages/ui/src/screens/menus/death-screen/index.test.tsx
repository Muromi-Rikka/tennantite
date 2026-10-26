import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { DeathScreenDemo } from "./demo";
import { DeathScreen } from "./index";

describe("deathScreen", () => {
  it("打开后渲染死因与按钮", async () => {
    const user = userEvent.setup();
    render(<DeathScreen cause="Steve 被苦力怕炸死了" />);
    await user.click(screen.getByRole("button", { name: "模拟死亡" }));
    expect(await screen.findByText("Steve 被苦力怕炸死了")).toBeVisible();
    expect(screen.getByRole("button", { name: "重生" })).toBeVisible();
  });

  it("重生回调并关闭", async () => {
    const user = userEvent.setup();
    const onRespawn = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <DeathScreen
        cause="x"
        onOpenChange={onOpenChange}
        onRespawn={onRespawn}
      />,
    );
    await user.click(screen.getByRole("button", { name: "模拟死亡" }));
    await user.click(await screen.findByRole("button", { name: "重生" }));
    expect(onRespawn).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("demo 渲染", () => {
    render(<DeathScreenDemo />);
    expect(screen.getByRole("button", { name: "模拟死亡" })).toBeInTheDocument();
  });
});
