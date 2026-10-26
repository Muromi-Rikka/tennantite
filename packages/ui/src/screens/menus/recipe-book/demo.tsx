import { RecipeBook } from "./index";

/** RecipeBook 预览用例（规格 §6.3） */
export function RecipeBookDemo() {
  return (
    <RecipeBook
      categories={[
        {
          name: "建筑方块",
          recipes: [
            { output: { count: 4, icon: "stone-block" }, unlocked: true },
            { output: { count: 1, icon: "grass-block" }, unlocked: true },
            { unlocked: false },
            { output: { count: 16, icon: "dirt-block" }, unlocked: true },
          ],
        },
        {
          name: "工具",
          recipes: [
            { output: { icon: "sword" }, unlocked: true },
            { unlocked: false },
          ],
        },
      ]}
    />
  );
}
