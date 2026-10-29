import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FdHungerOverlay } from "./index";

const ORIGIN = "calc(var(--mc-gui) * 0) calc(var(--mc-gui) * 0)";

function sprites(container: HTMLElement) {
  const overlay = container.querySelector("[data-fd-overlay=\"nourishment\"]") as HTMLElement;
  return [...overlay.querySelectorAll("[data-fd-sprite=\"fd_icons\"]")] as HTMLElement[];
}

function stacked(container: HTMLElement) {
  return sprites(container).filter(sprite => sprite.style.backgroundPosition !== ORIGIN);
}

describe("fdHungerOverlay", () => {
  it("始终绘制 10 枚背景图标，自右向左排列", () => {
    const { container } = render(<FdHungerOverlay foodLevel={0} />);
    const all = sprites(container);
    expect(all).toHaveLength(10);
    expect(all.map(sprite => sprite.style.left)).toEqual(
      [72, 64, 56, 48, 40, 32, 24, 16, 8, 0].map(value => `calc(var(--mc-gui) * ${value})`),
    );
    expect(stacked(container)).toHaveLength(0);
  });

  it("按半单位叠加满图标", () => {
    const { container } = render(<FdHungerOverlay foodLevel={4} />);
    const overlays = stacked(container);
    expect(overlays).toHaveLength(2);
    expect(overlays[0]?.style.left).toBe("calc(var(--mc-gui) * 72)");
    expect(overlays[1]?.style.left).toBe("calc(var(--mc-gui) * 64)");
    expect(overlays.every(sprite => sprite.style.backgroundPosition === "calc(var(--mc-gui) * -18) calc(var(--mc-gui) * 0)")).toBe(true);
  });

  it("奇数饥饿值渲染半格图标", () => {
    const { container } = render(<FdHungerOverlay foodLevel={3} />);
    const overlays = stacked(container);
    expect(overlays).toHaveLength(2);
    expect(overlays[1]?.style.backgroundPosition).toBe("calc(var(--mc-gui) * -9) calc(var(--mc-gui) * 0)");
  });

  it("自然恢复改用金边图标并支持 x / y 偏移", () => {
    const { container } = render(<FdHungerOverlay foodLevel={4} naturalHealing x={10} y={2} />);
    const all = sprites(container);
    expect(all[0]?.style.left).toBe("calc(var(--mc-gui) * 82)");
    expect(all[0]?.style.top).toBe("calc(var(--mc-gui) * 2)");
    expect(stacked(container)[0]?.style.backgroundPosition).toBe("calc(var(--mc-gui) * -36) calc(var(--mc-gui) * 0)");
  });

  it("自然恢复的半格用 27 列", () => {
    const { container } = render(<FdHungerOverlay foodLevel={3} naturalHealing />);
    expect(stacked(container)[1]?.style.backgroundPosition).toBe("calc(var(--mc-gui) * -27) calc(var(--mc-gui) * 0)");
  });
});
