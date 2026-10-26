import { Hotbar } from "./index";

/**
 * Hotbar 预览用例（规格 §6.1）
*/
export function HotbarDemo() {
  return (
    <Hotbar
      items={[
        { count: 64, icon: "stone-block", tooltip: "石头 ×64" },
        { icon: "grass-block" },
        { count: 12, icon: "diamond", tooltip: "钻石 ×12" },
        { icon: "sword", tooltip: "铁剑" },
        { count: 5, icon: "apple", tooltip: "苹果 ×5" },
        {},
        { icon: "xp-orb" },
        {},
        { icon: "creeper-face" },
      ]}
      selectedIndex={2}
    />
  );
}
