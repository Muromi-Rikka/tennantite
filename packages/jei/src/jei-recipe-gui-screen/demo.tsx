import type { JeiRecipeGuiSlot } from "./index";
import {
  JEI_DEMO_DIAMOND,
  JEI_DEMO_GOLD_INGOT,
  JEI_DEMO_IRON_INGOT,
  JEI_DEMO_IRON_ORE,
} from "../jei-demo-data";
import { JEI_INGREDIENT_CELL } from "../jei-metrics";
import { JeiRecipeGuiScreen } from "./index";

const CATEGORIES = [
  { icon: { icon: "crafting-table" as const, tooltip: "合成" }, label: "合成" },
  { icon: { icon: "charcoal" as const, tooltip: "熔炼" }, label: "熔炼" },
];

/**
 * JeiRecipeGuiScreen 预览用例（合成）：3×3 输入格 + 进度箭头 + 26×26 输出槽。
 */
export function JeiRecipeGuiScreenDemo() {
  return (
    <JeiRecipeGuiScreen
      activeCategory={0}
      categories={CATEGORIES}
      flame={{ left: 82, lit: true, top: 82 }}
      onBookmarkRecipe={() => {}}
      onCategoryChange={() => {}}
      onPageChange={() => {}}
      onSlotClick={() => {}}
      onTransferRecipe={() => {}}
      page={0}
      pageCount={2}
      progress={0.65}
      progressArrow={{ left: 104, top: 58 }}
      recipeSlots={craftingLayout()}
      title="合成"
    />
  );
}

/**
 * 熔炼配方：单输入格 + 火焰 + 输出槽。
 */
export function JeiRecipeGuiSmeltingDemo() {
  return (
    <JeiRecipeGuiScreen
      activeCategory={1}
      categories={CATEGORIES}
      flame={{ left: 82, lit: false, top: 82 }}
      page={0}
      pageCount={1}
      progress={0.3}
      progressArrow={{ left: 104, top: 58 }}
      recipeSlots={smeltingLayout()}
      title="熔炼"
    />
  );
}

/**
 * 合成配方布局：3×3 输入格 + 26×26 输出槽。
 */
function craftingLayout(): JeiRecipeGuiSlot[] {
  const grid = [
    JEI_DEMO_IRON_INGOT,
    null,
    JEI_DEMO_GOLD_INGOT,
    null,
    JEI_DEMO_DIAMOND,
    null,
    JEI_DEMO_IRON_ORE,
    null,
    JEI_DEMO_IRON_INGOT,
  ];
  const originX = 40;
  const originY = 40;
  const slots: JeiRecipeGuiSlot[] = grid.map((slot, index) => ({
    left: originX + (index % 3) * JEI_INGREDIENT_CELL,
    slot,
    top: originY + Math.floor(index / 3) * JEI_INGREDIENT_CELL,
  }));
  slots.push({
    left: 134,
    output: true,
    slot: { count: 4, icon: "iron-ingot", tooltip: "铁块" },
    top: 58,
  });
  return slots;
}

/**
 * 熔炼配方布局：单输入格 + 输出槽。
 */
function smeltingLayout(): JeiRecipeGuiSlot[] {
  return [
    { left: 40, slot: JEI_DEMO_IRON_ORE, top: 58 },
    { left: 134, output: true, slot: JEI_DEMO_IRON_INGOT, top: 58 },
  ];
}
