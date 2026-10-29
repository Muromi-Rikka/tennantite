import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EioSprite } from "./index";

describe("eioSprite", () => {
  it("整图拉伸到目标尺寸", () => {
    const { container } = render(
      <EioSprite height={208} name="screen/sag_mill" width={176} />,
    );
    const sprite = container.querySelector("[data-eio-sprite=\"screen/sag_mill\"]") as HTMLElement;
    expect(sprite.style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(sprite.style.height).toBe("calc(var(--mc-gui) * 208)");
    expect(sprite.style.backgroundSize).toBe("100% 100%");
  });

  it("crop 时按源图 1:1 设置 background-position / size", () => {
    const { container } = render(
      <EioSprite
        crop={{ height: 14, width: 14, x: 176, y: 0 }}
        height={14}
        name="screen/stirling_generator"
        width={14}
      />,
    );
    const sprite = container.querySelector("[data-eio-sprite=\"screen/stirling_generator\"]") as HTMLElement;
    expect(sprite.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
    expect(sprite.style.backgroundPosition).toBe("calc(var(--mc-gui) * -176) calc(var(--mc-gui) * 0)");
  });

  it("left / top 转为 GUI px 并绝对定位", () => {
    const { container } = render(
      <EioSprite left={3} name="sprites/buttons/io_config" top={4} />,
    );
    const sprite = container.querySelector("[data-eio-sprite=\"sprites/buttons/io_config\"]") as HTMLElement;
    expect(sprite.style.position).toBe("absolute");
    expect(sprite.style.left).toBe("calc(var(--mc-gui) * 3)");
    expect(sprite.style.top).toBe("calc(var(--mc-gui) * 4)");
    expect(sprite.style.pointerEvents).toBe("none");
  });
});
