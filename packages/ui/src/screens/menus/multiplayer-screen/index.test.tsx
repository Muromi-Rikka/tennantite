import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MultiplayerScreenDemo } from "./demo";
import { MultiplayerScreen } from "./index";

describe("MultiplayerScreen", () => {
  it("渲染服务器列表与选中态", () => {
    render(
      <MultiplayerScreen
        servers={[
          { address: "a.example", name: "A" },
          { address: "b.example", name: "B" },
        ]}
        selectedAddress="b.example"
      />,
    );
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(
      document.querySelector('[data-address="b.example"]'),
    ).toHaveClass("bg-mc-stone-dark/60");
  });

  it("选择与加入回调", async () => {
    const user = userEvent.setup();
    const onServerSelect = vi.fn();
    const onJoin = vi.fn();
    render(
      <MultiplayerScreen
        onJoin={onJoin}
        onServerSelect={onServerSelect}
        servers={[{ address: "a.example", name: "A" }]}
      />,
    );
    await user.click(document.querySelector("[data-server-entry]")!);
    expect(onServerSelect).toHaveBeenCalledWith("a.example");
    await user.click(screen.getByRole("button", { name: "加入服务器" }));
    expect(onJoin).toHaveBeenCalledOnce();
  });

  it("demo 渲染", () => {
    render(<MultiplayerScreenDemo />);
    expect(screen.getByText("选择服务器")).toBeInTheDocument();
  });
});
