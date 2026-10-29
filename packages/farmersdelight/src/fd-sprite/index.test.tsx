import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FdSprite } from "./index";

describe("fdSprite", () => {
  it("整图拉伸到目标尺寸", () => {
    const { container } = render(<FdSprite height={166} name="cooking_pot" width={176} />);
    const sprite = container.querySelector("[data-fd-sprite=\"cooking_pot\"]") as HTMLElement;
    expect(sprite.style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(sprite.style.height).toBe("calc(var(--mc-gui) * 166)");
    expect(sprite.style.backgroundSize).toBe("100% 100%");
    expect(sprite.style.backgroundImage).toBe("var(--mc-fd-cooking-pot)");
  });

  it("crop 时按源图 1:1 设置 background-position / size", () => {
    const { container } = render(
      <FdSprite
        crop={{ height: 15, width: 17, x: 176, y: 0 }}
        height={15}
        name="cooking_pot"
        width={17}
      />,
    );
    const sprite = container.querySelector("[data-fd-sprite=\"cooking_pot\"]") as HTMLElement;
    expect(sprite.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
    expect(sprite.style.backgroundPosition).toBe("calc(var(--mc-gui) * -176) calc(var(--mc-gui) * 0)");
  });

  it("left / top 转为 GUI px 并绝对定位", () => {
    const { container } = render(<FdSprite left={3} name="fd_icons" top={4} />);
    const sprite = container.querySelector("[data-fd-sprite=\"fd_icons\"]") as HTMLElement;
    expect(sprite.style.position).toBe("absolute");
    expect(sprite.style.left).toBe("calc(var(--mc-gui) * 3)");
    expect(sprite.style.top).toBe("calc(var(--mc-gui) * 4)");
    expect(sprite.style.pointerEvents).toBe("none");
    expect(sprite.getAttribute("aria-hidden")).toBe("true");
  });
});
