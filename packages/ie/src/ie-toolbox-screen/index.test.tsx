import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeToolboxScreenDemo } from "../demos";
import { IeToolboxScreen } from "./index";

describe("ieToolboxScreen", () => {
  it("渲染 23 个工具箱槽位与玩家背包", () => {
    const { container } = render(<IeToolboxScreen />);
    expect(container.querySelectorAll("[aria-label^=\"toolbox-\"]")).toHaveLength(23);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
  });

  it("背景贴图 blit 于 topPos-17（源区 176×255）", () => {
    const { container } = render(<IeToolboxScreen />);
    const background = container.querySelector("[data-ie-sprite=\"toolbox\"]") as HTMLElement;
    expect(background.style.top).toBe("calc(var(--mc-gui) * -17)");
    expect(background.style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(background.style.height).toBe("calc(var(--mc-gui) * 255)");
  });

  it("槽位框坐标 = ToolboxMenu slot - 1（工具 48,24 → 47,23；食物 35,77 → 34,76）", () => {
    render(<IeToolboxScreen />);
    expect(screen.getByLabelText("toolbox-tool").style.left).toBe("calc(var(--mc-gui) * 47)");
    expect(screen.getByLabelText("toolbox-tool").style.top).toBe("calc(var(--mc-gui) * 23)");
    expect(screen.getByLabelText("toolbox-food-0").style.left).toBe("calc(var(--mc-gui) * 34)");
    expect(screen.getByLabelText("toolbox-food-0").style.top).toBe("calc(var(--mc-gui) * 76)");
  });

  it("demo 渲染", () => {
    render(<IeToolboxScreenDemo />);
    expect(screen.getByText("工具箱")).toBeInTheDocument();
  });
});
