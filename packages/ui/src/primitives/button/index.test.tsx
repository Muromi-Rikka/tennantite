import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ButtonDemo } from "./demo";
import { Button } from "./index";

describe("button", () => {
  it("渲染默认石纹变体", () => {
    render(<Button>开始游戏</Button>);
    const button = screen.getByRole("button", { name: "开始游戏" });
    expect(button).toHaveClass("mc-tex-btn");
    expect(button).toHaveAttribute("type", "button");
  });

  it("渲染 success / ghost 变体", () => {
    render(
      <>
        <Button variant="success">绿</Button>
        <Button variant="ghost">幽灵</Button>
      </>,
    );
    expect(screen.getByRole("button", { name: "绿" })).toHaveClass(
      "bg-mc-accent-green",
    );
    expect(screen.getByRole("button", { name: "幽灵" })).toHaveClass("bg-transparent");
  });

  it("应用尺寸类", () => {
    render(<Button size="lg">大按钮</Button>);
    expect(screen.getByRole("button", { name: "大按钮" })).toHaveClass("h-40");
  });

  it("禁用态不可点击", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        禁用
      </Button>,
    );
    await user.click(screen.getByRole("button", { name: "禁用" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("className 经 cn 合并且后到优先", () => {
    render(<Button className="h-48">覆盖</Button>);
    const button = screen.getByRole("button", { name: "覆盖" });
    expect(button).toHaveClass("mc-tex-btn");
    expect(button).toHaveClass("h-48");
  });

  it("demo：点击计数", async () => {
    const user = userEvent.setup();
    render(<ButtonDemo />);
    const button = screen.getByRole("button", { name: /已点\s*0\s*次/ });
    await user.click(button);
    expect(
      screen.getByRole("button", { name: /已点\s*1\s*次/ }),
    ).toBeInTheDocument();
  });
});
