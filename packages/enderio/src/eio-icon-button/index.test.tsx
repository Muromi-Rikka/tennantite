import { render, screen } from "@testing-library/react";
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

  it("常态与悬停底均存在，悬停底走 group-hover，点击触发回调", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { container } = render(
      <EioIconButton icon="sprites/buttons/io_config" label="IO 配置" left={0} onClick={onClick} title="自定义" top={0} />,
    );
    const button = screen.getByRole("button", { name: "IO 配置" });
    expect(button).toHaveAttribute("title", "自定义");
    expect(container.querySelector("[data-gui-sprite=\"sprites/widget/button.png\"]")).not.toBeNull();
    const highlighted = container.querySelector("[data-gui-sprite=\"sprites/widget/button_highlighted.png\"]");
    expect(highlighted).not.toBeNull();
    expect(highlighted?.closest(".group-hover\\:opacity-100")).not.toBeNull();
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
