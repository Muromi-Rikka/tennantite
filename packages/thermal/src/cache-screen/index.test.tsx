import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { THERMAL_ITEM_GAUGE } from "../thermal-metrics";
import { ThermalCacheScreen } from "./index";

const ITEM: ScreenSlot = { count: 640, icon: "stone-block", tooltip: "平滑石头" };

function renderCache(overrides: Partial<Parameters<typeof ThermalCacheScreen>[0]> = {}) {
  return render(
    <ThermalCacheScreen
      amount={640}
      capacity={20000}
      inputRate={4}
      item={ITEM}
      maxInput={32}
      maxOutput={64}
      outputRate={16}
      {...overrides}
    />,
  );
}

describe("thermalCacheScreen", () => {
  it("渲染缓存物品槽与容量条", () => {
    const { container } = renderCache();
    expect(screen.getByLabelText("cache-item")).toBeInTheDocument();
    expect(container.querySelector("[data-thermal-sprite='container/item_cell']")).not.toBeNull();
  });

  it("容量条按 amount/capacity 自下而上填充", () => {
    renderCache();
    expect(screen.getByRole("progressbar", { name: "缓存容量" })).toHaveAttribute("aria-valuenow", "3");
  });

  it("容量条位于上游 (80,36) 16×34", () => {
    renderCache();
    const gauge = screen.getByRole("progressbar", { name: "缓存容量" }) as HTMLElement;
    expect(gauge.style.left).toBe(`calc(var(--mc-gui) * ${THERMAL_ITEM_GAUGE.left})`);
    expect(gauge.style.top).toBe(`calc(var(--mc-gui) * ${THERMAL_ITEM_GAUGE.top})`);
    expect(gauge.style.height).toBe(`calc(var(--mc-gui) * ${THERMAL_ITEM_GAUGE.height})`);
    expect(gauge.style.width).toBe(`calc(var(--mc-gui) * ${THERMAL_ITEM_GAUGE.width})`);
  });

  it("填充格与底图同格同宽（图集自带 1 px 透明边，横向不再内缩）", () => {
    renderCache();
    const gauge = screen.getByRole("progressbar", { name: "缓存容量" }) as HTMLElement;
    const sprites = gauge.querySelectorAll("[data-thermal-sprite='elements/storage_energy']");
    const track = sprites.item(0) as HTMLElement;
    const fill = sprites.item(1) as HTMLElement;
    expect(fill.style.left).toBe("calc(var(--mc-gui) * 0)");
    expect(fill.style.width).toBe(track.style.width);
    expect(fill.style.height).toBe(`calc(var(--mc-gui) * ${THERMAL_ITEM_GAUGE.height - 2})`);
    expect(fill.style.top).toBe("calc(var(--mc-gui) * 1)");
    expect(fill.style.backgroundPosition).toBe("calc(var(--mc-gui) * -16) calc(var(--mc-gui) * -1)");
  });

  it("± 按钮回调存入/取出变化", () => {
    const onInputChange = vi.fn();
    const onOutputChange = vi.fn();
    renderCache({ onInputChange, onOutputChange });
    fireEvent.click(screen.getByLabelText("增加存入"));
    expect(onInputChange).toHaveBeenCalledWith(8);
    fireEvent.click(screen.getByLabelText("增加取出"));
    expect(onOutputChange).toHaveBeenCalledWith(20);
    fireEvent.click(screen.getByLabelText("减少取出"));
    expect(onOutputChange).toHaveBeenCalledWith(12);
  });

  it("速率文本渲染", () => {
    renderCache();
    expect(screen.getByLabelText("存入速率")).toHaveTextContent("4");
    expect(screen.getByLabelText("取出速率")).toHaveTextContent("16");
  });
});
