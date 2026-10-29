import type { ScreenSlot } from "@tennantite/ui";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { JeiRecipeGuiSlot } from "./index";
import { JEI_OUTPUT_SLOT_SIZE, JEI_RECIPE_GUI } from "../jei-metrics";
import { JeiRecipeGuiScreen } from "./index";

const IRON: ScreenSlot = { count: 1, icon: "iron-ingot", tooltip: "铁锭" };

const CATEGORIES = [
  { icon: { icon: "crafting-table" as const, tooltip: "合成" }, label: "合成" },
  { icon: { icon: "charcoal" as const, tooltip: "熔炼" }, label: "熔炼" },
];

const SLOTS: JeiRecipeGuiSlot[] = [
  { left: 40, slot: IRON, top: 58 },
  { left: 134, output: true, slot: IRON, top: 58 },
];

function renderGui(overrides: Partial<Parameters<typeof JeiRecipeGuiScreen>[0]> = {}) {
  return render(
    <JeiRecipeGuiScreen
      activeCategory={0}
      categories={CATEGORIES}
      onPageChange={() => {}}
      page={0}
      pageCount={2}
      progress={0.5}
      progressArrow={{ left: 104, top: 58 }}
      recipeSlots={SLOTS}
      title="合成"
      {...overrides}
    />,
  );
}

describe("jeiRecipeGuiScreen", () => {
  it("渲染标题与全部配方槽位", () => {
    renderGui();
    expect(screen.getByText("合成", { selector: "span:not(.sr-only)" })).toBeInTheDocument();
    expect(screen.getByLabelText("jei-recipe-slot-0")).toBeInTheDocument();
    expect(screen.getByLabelText("jei-recipe-slot-1")).toBeInTheDocument();
  });

  it("输出槽使用 26×26 尺寸", () => {
    const { container } = renderGui();
    const output = container.querySelector("[data-jei-sprite='output_slot']") as HTMLElement;
    expect(output.style.width).toBe(`calc(var(--mc-gui) * ${JEI_OUTPUT_SLOT_SIZE})`);
  });

  it("配方槽位按注入坐标渲染", () => {
    const { container } = renderGui();
    const slot = container.querySelector("[data-jei-sprite='slot']") as HTMLElement;
    expect(slot.style.left).toBe("calc(var(--mc-gui) * 40)");
    expect(slot.style.top).toBe("calc(var(--mc-gui) * 58)");
  });

  it("分类标签点击回调目标分类并标记选中", () => {
    const onCategoryChange = vi.fn();
    const { container } = renderGui({ onCategoryChange });
    fireEvent.click(screen.getByLabelText("jei-category-1-熔炼"));
    expect(onCategoryChange).toHaveBeenCalledWith(1);
    const selected = container.querySelector("[data-jei-sprite='tab_selected']");
    expect(selected).not.toBeNull();
  });

  it("配方翻页箭头回调目标页", () => {
    const onPageChange = vi.fn();
    renderGui({ onPageChange, page: 1, pageCount: 3 });
    fireEvent.click(screen.getByLabelText("上一配方"));
    expect(onPageChange).toHaveBeenCalledWith(0);
    fireEvent.click(screen.getByLabelText("下一配方"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("进度箭头暴露 progressbar 语义", () => {
    renderGui({ progress: 0.5 });
    expect(screen.getByRole("progressbar", { name: "配方进度" })).toHaveAttribute(
      "aria-valuenow",
      "0.5",
    );
  });

  it("传回调时渲染选项列按钮", () => {
    const onTransferRecipe = vi.fn();
    const onBookmarkRecipe = vi.fn();
    renderGui({ onBookmarkRecipe, onTransferRecipe });
    fireEvent.click(screen.getByLabelText("移入物品栏"));
    expect(onTransferRecipe).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByLabelText("加入书签"));
    expect(onBookmarkRecipe).toHaveBeenCalledOnce();
  });

  it("火焰图标按 lit 切换", () => {
    const { container: litContainer } = renderGui({ flame: { left: 82, lit: true, top: 82 } });
    expect(litContainer.querySelector("[data-jei-sprite='icons/flame']")).not.toBeNull();
    const { container } = renderGui({ flame: { left: 82, lit: false, top: 82 } });
    expect(container.querySelector("[data-jei-sprite='icons/flame_empty']")).not.toBeNull();
  });

  it("默认 176×166 与原版容器同尺寸", () => {
    const { container } = renderGui();
    const background = container.querySelector("[data-jei-sprite='gui_background_v2']") as HTMLElement;
    expect(background.style.width).toBe(`calc(var(--mc-gui) * ${JEI_RECIPE_GUI.width})`);
    expect(background.style.height).toBe(`calc(var(--mc-gui) * ${JEI_RECIPE_GUI.height})`);
  });
});
