import { pixelIcons } from "@tennantite/textures";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Grid } from "../grid/index";
import { IconDemo } from "./demo";
import { Icon } from "./index";

function decodePng(source: string) {
  const base64 = source.slice(source.indexOf(",") + 1);
  const binary = Array.from(atob(base64), char => char.codePointAt(0) ?? 0);
  const bytes = Uint8Array.from(binary);
  return { bytes, view: new DataView(bytes.buffer) };
}

describe("icon", () => {
  it("按内置名称渲染像素图标", () => {
    const { container } = render(<Icon name="heart" size={9} />);
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toMatch(/^data:image\/png;base64,/);
    expect(img).toHaveAttribute("data-icon", "heart");
    expect(img).toHaveAttribute("style", expect.stringContaining("calc(var(--mc-gui) * 9)"));
  });

  it("内置图标为原版 PNG data URI（签名与尺寸）", () => {
    for (const source of Object.values(pixelIcons)) {
      expect(source).toMatch(/^data:image\/png;base64,/);
    }
    const apple = decodePng(pixelIcons.apple);
    expect(apple.bytes.subarray(0, 8)).toEqual(
      new Uint8Array([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    );
    expect(apple.view.getUint32(16)).toBe(16);
    expect(apple.view.getUint32(20)).toBe(16);
    const heart = decodePng(pixelIcons.heart);
    expect(heart.view.getUint32(16)).toBe(9);
    expect(heart.view.getUint32(20)).toBe(9);
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
