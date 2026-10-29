import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioIconButton } from "./index";

describe("eioIconButton", () => {
  it("渲染按钮底、图标与可访问名称", () => {
    const { container } = render(
      <EioIconButton icon="sprites/buttons/io_config" label="IO 配置" left={2} top={3} />,
    );
    const button = screen.getByRole("button", { name: "IO 配置" });
    expect(button).toHaveAttribute("title", "IO 配置");
    expect(button.style.left).toBe("calc(var(--mc-gui) * 2)");
    expect(container.querySelector("[data-gui-sprite=\"sprites/widget/button.png\"]")).not.toBeNull();
    expect(container.querySelector("[data-eio-sprite=\"sprites/buttons/io_config\"]")).not.toBeNull();
  });

  it("悬停 / 聚焦切换高亮底，点击触发回调", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <EioIconButton icon="sprites/buttons/io_config" label="IO 配置" left={0} onClick={onClick} title="自定义" top={0} />,
    );
    const button = screen.getByRole("button", { name: "IO 配置" });
    expect(button).toHaveAttribute("title", "自定义");
    await user.hover(button);
    expect(container.querySelector("[data-gui-sprite=\"sprites/widget/button_highlighted.png\"]")).not.toBeNull();
    await user.unhover(button);
    expect(container.querySelector("[data-gui-sprite=\"sprites/widget/button_highlighted.png\"]")).toBeNull();
    fireEvent.focus(button);
    expect(container.querySelector("[data-gui-sprite=\"sprites/widget/button_highlighted.png\"]")).not.toBeNull();
    fireEvent.blur(button);
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
