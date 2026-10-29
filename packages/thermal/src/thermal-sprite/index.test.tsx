import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThermalSprite } from "./index";

describe("thermalSprite", () => {
  it("整图渲染按源尺寸拉伸", () => {
    const { container } = render(<ThermalSprite name="icons/icon_augment" />);
    const sprite = container.querySelector("[data-thermal-sprite='icons/icon_augment']") as HTMLElement;
    expect(sprite.style.width).toBe("calc(var(--mc-gui) * 16)");
    expect(sprite.style.backgroundSize).toBe("100% 100%");
  });

  it("裁剪区域按背景偏移取用图集", () => {
    const { container } = render(
      <ThermalSprite crop={{ height: 16, width: 24, x: 24, y: 0 }} name="elements/progress_arrow_right" />,
    );
    const sprite = container.querySelector("[data-thermal-sprite='elements/progress_arrow_right']") as HTMLElement;
    expect(sprite.style.backgroundPosition).toBe("calc(var(--mc-gui) * -24) calc(var(--mc-gui) * 0)");
    expect(sprite.style.backgroundSize).toBe("calc(var(--mc-gui) * 64) calc(var(--mc-gui) * 16)");
    expect(sprite.style.width).toBe("calc(var(--mc-gui) * 24)");
    expect(sprite.style.height).toBe("calc(var(--mc-gui) * 16)");
  });

  it("染色走 multiply 混合", () => {
    const { container } = render(<ThermalSprite name="elements/storage_energy" tint="#00ff00" />);
    const sprite = container.querySelector("[data-thermal-sprite='elements/storage_energy']") as HTMLElement;
    expect(sprite.style.backgroundBlendMode).toBe("multiply");
    expect(sprite.style.backgroundColor).toBe("rgb(0, 255, 0)");
  });
});
