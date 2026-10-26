import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BadgeDemo } from "./demo";
import { Badge } from "./index";

describe("badge", () => {
  it("渲染默认计数样式", () => {
    render(<Badge>64</Badge>);
    const badge = screen.getByText("64");
    expect(badge).toHaveClass("mc-text-shadow");
    expect(badge).toHaveClass("text-mc-text-main");
  });

  it("渲染 gold / dim 变体", () => {
    render(
      <>
        <Badge variant="gold">史诗</Badge>
        <Badge variant="dim">v0.1.0</Badge>
      </>,
    );
    expect(screen.getByText("史诗")).toHaveClass("text-mc-gold");
    expect(screen.getByText("v0.1.0")).toHaveClass("text-mc-text-dim");
  });

  it("className 合并", () => {
    render(<Badge className="absolute">1</Badge>);
    expect(screen.getByText("1")).toHaveClass("absolute");
  });

  it("demo 渲染", () => {
    render(<BadgeDemo />);
    expect(screen.getByText("64")).toBeInTheDocument();
  });
});
