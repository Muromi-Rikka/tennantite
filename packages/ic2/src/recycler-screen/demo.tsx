import { RecyclerScreen } from "./index";

/**
 * RecyclerScreen 预览用例：任意物品按概率产出废料，槽位只显示单次产物
*/
export function RecyclerScreenDemo() {
  return (
    <RecyclerScreen
      energy={{ max: 2000, value: 900 }}
      input={{ count: 1, icon: "stone-block", tooltip: "圆石" }}
      output={{ count: 1, icon: "gunpowder", tooltip: "废料" }}
      progress={0.35}
      title="回收机"
    />
  );
}
