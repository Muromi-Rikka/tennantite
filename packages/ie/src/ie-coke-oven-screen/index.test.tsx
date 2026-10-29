import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { IeCokeOvenScreenDemo } from "../demos";
import { IE_MACHINES } from "../ie-machine-layout";
import { IeCokeOvenScreen } from "./index";

describe("ieCokeOvenScreen", () => {
  it("渲染 4 个机器槽位、背景贴图与玩家背包", () => {
    const { container } = render(<IeCokeOvenScreen input={{}} output={{}} />);
    expect(container.querySelectorAll("[aria-label^=\"coke-oven-\"]")).toHaveLength(4);
    expect(container.querySelectorAll("[aria-label^=\"main-\"]")).toHaveLength(27);
    expect(container.querySelectorAll("[aria-label^=\"hotbar-\"]")).toHaveLength(9);
    expect(container.querySelector("[data-ie-sprite=\"coke_oven\"]")).not.toBeNull();
  });

  it("槽位框坐标 = CokeOvenMenu slot - 1（input 30,35 → 29,34；背包 8,84 → 7,83）", () => {
    render(<IeCokeOvenScreen input={{}} />);
    const input = screen.getByLabelText("coke-oven-input");
    const inputLayout = IE_MACHINES.cokeOven.slots[0] as { left: number; top: number };
    expect(input.style.left).toBe(`calc(var(--mc-gui) * ${inputLayout.left})`);
    expect(input.style.top).toBe(`calc(var(--mc-gui) * ${inputLayout.top})`);
    expect(input.style.left).toBe("calc(var(--mc-gui) * 29)");
    expect(input.style.top).toBe("calc(var(--mc-gui) * 34)");
    const mainGrid = screen.getByLabelText("main-0").parentElement as HTMLElement;
    expect(mainGrid.style.left).toBe("calc(var(--mc-gui) * 7)");
    expect(mainGrid.style.top).toBe("calc(var(--mc-gui) * 83)");
  });

  it("背景贴图按 256² 画布左上角裁剪到 176×166，不缩放", () => {
    const { container } = render(<IeCokeOvenScreen />);
    const background = container.querySelector("[data-ie-sprite=\"coke_oven\"]") as HTMLElement;
    expect(background.style.width).toBe("calc(var(--mc-gui) * 176)");
    expect(background.style.height).toBe("calc(var(--mc-gui) * 166)");
    expect(background.style.backgroundSize).toBe("calc(var(--mc-gui) * 256) calc(var(--mc-gui) * 256)");
    expect(background.style.backgroundPosition).toBe("calc(var(--mc-gui) * 0) calc(var(--mc-gui) * 0)");
  });

  it("燃烧进度自下而上填充（0.65）", () => {
    render(<IeCokeOvenScreen burn={0.65} />);
    expect(screen.getByRole("progressbar", { name: "焦炉燃烧进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.65",
    );
  });

  it("木焦油罐按 FluidInfoArea 几何渲染（3600/8000 → 45）", () => {
    const { container } = render(
      <IeCokeOvenScreen tank={{ max: 8000, tint: "#6e5530", value: 3600 }} />,
    );
    const tank = screen.getByRole("progressbar", { name: "焦炉木焦油罐" });
    expect(tank).toHaveAttribute("aria-valuenow", "45");
    const overlay = tank.querySelector("[data-ie-sprite=\"sprites/coke_oven/tank_overlay\"]") as HTMLElement;
    expect(overlay.style.left).toBe("calc(var(--mc-gui) * -2)");
    expect(overlay.style.top).toBe("calc(var(--mc-gui) * -2)");
    expect(container.querySelector("[data-ie-fluid-tank]")).not.toBeNull();
  });

  it("槽位点击回调", async () => {
    const user = userEvent.setup();
    const onSlotClick = vi.fn();
    render(<IeCokeOvenScreen onSlotClick={onSlotClick} output={{}} />);
    await user.click(screen.getByLabelText("coke-oven-output"));
    expect(onSlotClick).toHaveBeenCalledWith("coke-oven-output");
  });

  it("demo 渲染", () => {
    render(<IeCokeOvenScreenDemo />);
    expect(screen.getByText("焦炉")).toBeInTheDocument();
  });
});
