import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModLabel } from "./index";

describe("modLabel", () => {
  it("无水平锚点时居中拉伸", () => {
    const { container } = render(<ModLabel>标题</ModLabel>);
    const node = container.firstElementChild as HTMLElement;
    expect(node.style.left).toBe("0px");
    expect(node.style.right).toBe("0px");
    expect(node.style.textAlign).toBe("center");
  });

  it("size 使用 GUI 缩放", () => {
    const { container } = render(<ModLabel left={2} size={5.4}>小字</ModLabel>);
    const node = container.firstElementChild as HTMLElement;
    expect(node.style.fontSize).toBe("calc(var(--mc-gui) * 5.4)");
    expect(node.style.left).toBe("calc(var(--mc-gui) * 2)");
  });
});
