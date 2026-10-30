import { RecyclerScreen } from "./index";

/**
 * RecyclerScreen 预览用例：任意物品 → 废料（原版图标近似）
*/
export function RecyclerScreenDemo() {
  return (
    <RecyclerScreen
      energy={{ max: 2000, value: 900 }}
      input={{ icon: "stone-block", tooltip: "圆石" }}
      output={{ count: 5, icon: "gunpowder", tooltip: "废料" }}
      progress={0.35}
      title="回收机"
    />
  );
}
