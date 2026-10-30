import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { CreativeTab } from "./index";

import { CreativeInventoryScreen } from "./index";

const TABS: CreativeTab[] = Array.from({ length: 14 }, (_, index) => ({
  icon: index === 0 ? { icon: "stone-block" } : undefined,
  id: `tab-${index}`,
  label: `标签 ${index + 1}`,
}));
const ACTIVE_TAB = TABS[0]?.id ?? "tab-0";

function tab(container: HTMLElement, index: number): Element | null {
  return container.querySelector(`[aria-label="标签 ${CSS.escape(String(index + 1))}"]`);
}

describe("creativeInventoryScreen", () => {
  it("背景按 195×136 裁剪而不是整图拉伸", () => {
    const { container } = render(<CreativeInventoryScreen activeTab={ACTIVE_TAB} tabs={TABS} />);
    const background = container.querySelector(
      "[data-gui-sprite=\"container/creative_inventory/tab_items.png\"]",
    );
    expect(background).not.toBeNull();
    expect((background as HTMLElement).style.backgroundSize).toContain("calc(var(--mc-gui) * 256)");
    expect((background as HTMLElement).style.backgroundSize).not.toBe("100% 100%");
  });

  it("物品网格从背景槽框原点 (8,49) 开始", () => {
    const { container } = render(<CreativeInventoryScreen />);
    expect(container.querySelector("[aria-label=\"creative-0\"]")).toHaveStyle({
      left: "calc(var(--mc-gui) * 8)",
      top: "calc(var(--mc-gui) * 49)",
    });
    expect(container.querySelector("[aria-label=\"creative-44\"]")).toHaveStyle({
      left: "calc(var(--mc-gui) * 152)",
      top: "calc(var(--mc-gui) * 121)",
    });
  });

  it("选中标签只换 sprite，不改变位置", () => {
    const { container } = render(<CreativeInventoryScreen activeTab={ACTIVE_TAB} tabs={TABS} />);
    const selected = tab(container, 0);
    expect(selected).toHaveAttribute("aria-pressed", "true");
    expect(selected).toHaveStyle({ top: "calc(var(--mc-gui) * 4)" });
    expect(
      selected?.querySelector(
        "[data-gui-sprite=\"sprites/container/creative_inventory/tab_top_selected_1.png\"]",
      ),
    ).not.toBeNull();

    const unselected = tab(container, 1);
    expect(unselected).toHaveAttribute("aria-pressed", "false");
    expect(unselected).toHaveStyle({ top: "calc(var(--mc-gui) * 4)" });
    expect(
      unselected?.querySelector(
        "[data-gui-sprite=\"sprites/container/creative_inventory/tab_top_unselected_2.png\"]",
      ),
    ).not.toBeNull();
  });

  it("底行第 5/6 列右对齐，并渲染标签图标", () => {
    const { container } = render(<CreativeInventoryScreen activeTab={ACTIVE_TAB} tabs={TABS} />);
    expect(tab(container, 12)).toHaveStyle({ left: "calc(var(--mc-gui) * 142)" });
    expect(tab(container, 13)).toHaveStyle({ left: "calc(var(--mc-gui) * 169)" });

    const icon = tab(container, 0)?.querySelector("[data-icon=\"stone-block\"]");
    expect(icon).not.toBeNull();
    expect(icon?.parentElement).toHaveStyle({
      left: "calc(var(--mc-gui) * 5)",
      top: "calc(var(--mc-gui) * 9)",
    });
  });
});
