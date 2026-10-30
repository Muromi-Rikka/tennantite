import { StonecutterScreen } from "./index";

/**
 * StonecutterScreen 预览用例（规格 §6.2）：石头 → 石砖
*/
export function StonecutterScreenDemo() {
  return (
    <StonecutterScreen
      input={{ count: 1, icon: "stone-block", tooltip: "石头" }}
      output={{ count: 1, icon: "stone-bricks", tooltip: "石砖" }}
      recipes={[
        { icon: { count: 1, icon: "stone-bricks", tooltip: "石砖" }, id: "stone_bricks" },
      ]}
      selectedRecipe="stone_bricks"
      title="切石机"
    />
  );
}
