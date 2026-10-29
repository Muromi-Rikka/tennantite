import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FdComfortOverlay } from "./index";

function sprites(container: HTMLElement) {
  const overlay = container.querySelector("[data-fd-overlay=\"comfort\"]") as HTMLElement;
  return [...overlay.querySelectorAll("[data-fd-sprite=\"fd_icons\"]")] as HTMLElement[];
}

describe("fdComfortOverlay", () => {
  it("偶数帧只画 5 px 左片（第 0 列无前驱右片）", () => {
    const { container } = render(<FdComfortOverlay maxHealth={20} sheenFrame={0} />);
    const all = sprites(container);
    expect(all).toHaveLength(1);
    expect(all[0]?.style.left).toBe("calc(var(--mc-gui) * 0)");
    expect(all[0]?.style.backgroundPosition).toBe("calc(var(--mc-gui) * 0) calc(var(--mc-gui) * -9)");
    expect(all[0]?.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
  });

  it("奇数帧画满 9 px（左 5 + 右 4）", () => {
    const { container } = render(<FdComfortOverlay maxHealth={20} sheenFrame={1} />);
    const all = sprites(container);
    expect(all).toHaveLength(2);
    expect(all[0]?.style.left).toBe("calc(var(--mc-gui) * 0)");
    expect(all[1]?.style.left).toBe("calc(var(--mc-gui) * 5)");
    expect(all[1]?.style.backgroundPosition).toBe("calc(var(--mc-gui) * -5) calc(var(--mc-gui) * -9)");
  });

  it("偶数帧在第 n 列时补齐第 n-1 列的右片", () => {
    const { container } = render(<FdComfortOverlay maxHealth={20} sheenFrame={2} />);
    const all = sprites(container);
    expect(all).toHaveLength(2);
    expect(all[0]?.style.left).toBe("calc(var(--mc-gui) * 5)");
    expect(all[1]?.style.left).toBe("calc(var(--mc-gui) * 8)");
  });

  it("心数取生命上限的一半（半颗心单位）", () => {
    const { container } = render(<FdComfortOverlay maxHealth={6} sheenFrame={8} />);
    expect(sprites(container)).toHaveLength(0);

    const { container: threeHearts } = render(<FdComfortOverlay maxHealth={6} sheenFrame={4} />);
    const all = sprites(threeHearts);
    expect(all).toHaveLength(2);
    expect(all[0]?.style.left).toBe("calc(var(--mc-gui) * 13)");
    expect(all[1]?.style.left).toBe("calc(var(--mc-gui) * 16)");
  });

  it("闪光帧超出心形行时不绘制并支持 x / y 偏移", () => {
    const { container } = render(<FdComfortOverlay maxHealth={20} sheenFrame={30} x={3} y={4} />);
    expect(sprites(container)).toHaveLength(0);

    const { container: shifted } = render(<FdComfortOverlay maxHealth={20} sheenFrame={1} x={3} y={4} />);
    const all = sprites(shifted);
    expect(all[0]?.style.left).toBe("calc(var(--mc-gui) * 3)");
    expect(all[0]?.style.top).toBe("calc(var(--mc-gui) * 4)");
    expect(all[1]?.style.left).toBe("calc(var(--mc-gui) * 8)");
  });
});
