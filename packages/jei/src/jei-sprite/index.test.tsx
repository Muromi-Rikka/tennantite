import { jeiSpriteMeta } from "@tennantite/textures";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JeiSprite } from "./index";

function spriteNode(name: keyof typeof jeiSpriteMeta) {
  const { container } = render(<JeiSprite name={name} />);
  return container.querySelector(`[data-jei-sprite='${CSS.escape(name)}']`) as HTMLElement;
}

describe("jeiSprite", () => {
  it("背景变量与尺寸来自生成元数据", () => {
    const node = spriteNode("gui_background_v2");
    // 九宫格精灵走 border-image，backgroundImage 关闭
    expect(node.style.borderImageSource).toBe(`var(${jeiSpriteMeta.gui_background_v2.cssVar})`);
    expect(node.style.backgroundImage).toBe("none");
    expect(node.style.width).toBe("calc(var(--mc-gui) * 64)");
    expect(node.style.height).toBe("calc(var(--mc-gui) * 64)");
  });

  it("nine_slice 映射 border-image 四边切片（26.x 对象 border）", () => {
    const node = spriteNode("gui_background_v2");
    expect(node.style.borderImageSlice).toBe("16 16 16 16 fill");
    expect(node.style.borderImageWidth).toBe(
      "calc(var(--mc-gui) * 16) calc(var(--mc-gui) * 16) calc(var(--mc-gui) * 16) calc(var(--mc-gui) * 16)",
    );
  });

  it("目标尺寸小于 border 和时回落拉伸", () => {
    const { container } = render(
      <JeiSprite height={20} name="gui_background_v2" width={20} />,
    );
    const small = container.querySelector("[data-jei-sprite='gui_background_v2']") as HTMLElement;
    expect(small.style.borderImageSource).toBe("");
    expect(small.style.backgroundSize).toBe("100% 100%");
  });

  it("无缩放贴图拉伸填充", () => {
    const node = spriteNode("slot");
    expect(node.style.borderImageSource).toBe("");
    expect(node.style.backgroundSize).toBe("100% 100%");
  });
});
