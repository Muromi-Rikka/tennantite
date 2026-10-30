import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ModScissorList } from "./index";

describe("modScissorList", () => {
  it("按视口原点与 scroll 补偿内层位置", () => {
    const { container } = render(
      <ModScissorList height={40} left={8} scroll={20} top={16} width={60}>
        <span />
      </ModScissorList>,
    );
    const viewport = container.firstElementChild as HTMLElement;
    const inner = viewport.firstElementChild as HTMLElement;
    expect(viewport.style.left).toBe("calc(var(--mc-gui) * 8)");
    expect(inner.style.left).toBe("calc(var(--mc-gui) * -8)");
    expect(inner.style.top).toBe("calc(var(--mc-gui) * -36)");
  });
});
