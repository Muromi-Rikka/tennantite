import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModSprite, type ModSpriteMeta } from "./index";

const PLAIN: ModSpriteMeta = { cssVar: "--test-sprite", height: 256, width: 256 };
const NINE: ModSpriteMeta = {
  cssVar: "--test-nine",
  height: 64,
  scaling: { border: 4, height: 64, type: "nine_slice", width: 64 },
  width: 64,
};

describe("modSprite", () => {
  it("无裁剪时整图拉伸", () => {
    const { container } = render(<ModSprite sprite={PLAIN} />);
    const node = container.firstElementChild as HTMLElement;
    expect(node.style.backgroundSize).toBe("100% 100%");
    expect(node.style.width).toBe("calc(var(--mc-gui) * 256)");
  });

  it("裁剪区域按目标尺寸缩放", () => {
    const { container } = render(
      <ModSprite height={16} sprite={PLAIN} src={{ height: 32, width: 32, x: 64, y: 128 }} width={16} />,
    );
    const node = container.firstElementChild as HTMLElement;
    expect(node.style.backgroundPosition).toBe(
      "calc(var(--mc-gui) * -32) calc(var(--mc-gui) * -64)",
    );
    expect(node.style.backgroundSize).toBe(
      "calc(var(--mc-gui) * 128) calc(var(--mc-gui) * 128)",
    );
  });

  it("tint 以 multiply 写入背景色", () => {
    const { container } = render(<ModSprite sprite={PLAIN} tint="#3f76e4" />);
    const node = container.firstElementChild as HTMLElement;
    expect(node.style.backgroundColor).toBe("rgb(63, 118, 228)");
    expect(node.style.backgroundBlendMode).toBe("multiply");
  });

  it("九宫格输出 border-image", () => {
    const { container } = render(<ModSprite height={40} sprite={NINE} width={48} />);
    const node = container.firstElementChild as HTMLElement;
    expect(node.style.borderImageSlice).toBe("4 4 4 4 fill");
    expect(node.style.backgroundImage).toBe("none");
  });

  it("dataAttributes 展开到根节点", () => {
    const { container } = render(
      <ModSprite dataAttributes={{ "data-test-sprite": "demo" }} sprite={PLAIN} />,
    );
    expect(container.firstElementChild).toHaveAttribute("data-test-sprite", "demo");
  });
});
