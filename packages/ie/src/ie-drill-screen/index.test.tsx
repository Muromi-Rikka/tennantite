import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { IeDrillScreenDemo } from "../demos";
import { IE_MACHINES } from "../ie-machine-layout";
import { IeDrillScreen } from "./index";

describe("ieDrillScreen", () => {
  it("渲染 4 个槽位与玩家背包（无整版背景贴图）", () => {
    const { container } = render(<IeDrillScreen cores={[{}, {}, {}]} head={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"drill-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelector("[data-ie-sprite]")).toBeNull();
  });

  // coords from drill.png pixel inspection (upstream <file> unavailable)
  it("槽位坐标取自贴图像素测量（钻头内区 80,12；部件行 60/80/100,44/50）", () => {
    render(<IeDrillScreen head={{}} />);
    expect(screen.getByLabelText("drill-head").style.left).toBe("calc(var(--mc-gui) * 80)");
    expect(screen.getByLabelText("drill-head").style.top).toBe("calc(var(--mc-gui) * 12)");
    expect(screen.getByLabelText("drill-core").style.left).toBe("calc(var(--mc-gui) * 60)");
    expect(screen.getByLabelText("drill-core-1").style.top).toBe("calc(var(--mc-gui) * 50)");
    expect(IE_MACHINES.drill.player).toEqual({ hotbarY: 142, left: 7, top: 84 });
  });

  it("demo 渲染", () => {
    render(<IeDrillScreenDemo />);
    expect(screen.getByText("电钻")).toBeInTheDocument();
  });
});
