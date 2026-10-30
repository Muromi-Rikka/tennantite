import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { EioXpObeliskScreenDemo } from "../demos";
import { EioXpObeliskScreen } from "./index";

describe("eioXpObeliskScreen", () => {
  it("渲染 116 高背景与经验条，无玩家背包", () => {
    const { container } = render(<EioXpObeliskScreen />);
    const background = container.querySelector("[data-eio-sprite=\"screen/xp_obelisk\"]") as HTMLElement;
    expect(background.style.height).toBe("calc(var(--mc-gui) * 116)");
    expect(screen.getByRole("progressbar", { name: "经验" })).toBeInTheDocument();
  });

  it("经验条进度与等级", () => {
    render(<EioXpObeliskScreen xp={{ level: 30, progress: 0.6 }} />);
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("经验按钮组", async () => {
    const user = userEvent.setup();
    const onXpAction = vi.fn();
    render(<EioXpObeliskScreen onXpAction={onXpAction} />);
    await user.click(screen.getByRole("button", { name: "取回 10 级" }));
    expect(onXpAction).toHaveBeenCalledWith(10, "add");
    await user.click(screen.getByRole("button", { name: "存入全部经验" }));
    expect(onXpAction).toHaveBeenCalledWith("all", "remove");
  });

  it("demo 可渲染", () => {
    const { container } = render(<EioXpObeliskScreenDemo />);
    expect(container.querySelector("[data-eio-machine=\"xpObelisk\"]")).not.toBeNull();
  });
});
