import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GuiSprite } from "./index";

describe("guiSprite", () => {
  it("渲染原版精灵 class 与 data 钩子", () => {
    const { container } = render(<GuiSprite name="container/inventory.png" />);
    const sprite = container.querySelector("[data-gui-sprite]");
    expect(sprite).toHaveClass("mc-gui-container-inventory-png");
    expect(sprite).toHaveClass("mc-gui-sprite");
  });

  it("裁剪区域生成背景位置与尺寸", () => {
    const { container } = render(
      <GuiSprite
        height={18}
        name="sprites/recipe_book/button.png"
        src={{ height: 18, width: 20, x: 0, y: 0 }}
        width={20}
      />,
    );
    const sprite = container.firstElementChild as HTMLElement;
    expect(sprite.style.backgroundPosition).toContain("var(--mc-gui)");
    expect(sprite.style.backgroundSize).toContain("var(--mc-gui)");
  });

  it("九宫格切片生成 border-image", () => {
    const { container } = render(
      <GuiSprite height={20} name="sprites/widget/button.png" slice={3} width={200} />,
    );
    const sprite = container.firstElementChild as HTMLElement;
    expect(sprite).toHaveStyle({
      borderImageSlice: "3 3 3 3 fill",
      borderImageWidth: "calc(var(--mc-gui) * 3) calc(var(--mc-gui) * 3) calc(var(--mc-gui) * 3) calc(var(--mc-gui) * 3)",
    });
  });
});
