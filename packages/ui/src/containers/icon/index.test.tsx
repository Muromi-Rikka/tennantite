import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Grid } from "../grid/index";
import { IconDemo } from "./demo";
import { Icon } from "./index";

describe("icon", () => {
  it("按内置名称渲染像素图标", () => {
    const { container } = render(<Icon name="heart" size={9} />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toContain("data:image/svg+xml");
    expect(img).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 9)"));
  });

  it("默认 16 GUI px（原版物品图标）", () => {
    const { container } = render(<Icon name="heart" />);
    expect(container.querySelector("img")).toHaveAttribute(
      "style",
      expect.stringContaining("calc(var(--mc-gui) * 16)"),
    );
  });

  it("pixelated 类默认开启、可关闭", () => {
    const { container: a } = render(<Icon name="heart" />);
    expect(a.querySelector("img")).toHaveClass("pixelated");
    const { container: b } = render(<Icon name="heart" pixelated={false} />);
    expect(b.querySelector("img")).not.toHaveClass("pixelated");
  });

  it("无 name / src 时不渲染", () => {
    const { container } = render(<Icon />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("grid 按 columns 与 cellSize 生成栅格", () => {
    const { container } = render(
      <Grid columns={3} data-testid="grid">
        <div />
        <div />
      </Grid>,
    );
    const grid = container.querySelector("[data-testid=\"grid\"]");
    expect(grid).toHaveAttribute(
      "style",
      expect.stringContaining("repeat(3, calc(var(--mc-gui) * 18))"),
    );
  });

  it("demo 渲染多个图标", () => {
    const { container } = render(<IconDemo />);
    expect(container.querySelectorAll("img").length).toBeGreaterThanOrEqual(6);
  });
});
