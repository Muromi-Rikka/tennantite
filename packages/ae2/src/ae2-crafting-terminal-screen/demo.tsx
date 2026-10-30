import { Ae2CraftingTerminalScreen } from "./index";

/**
 * Ae2CraftingTerminalScreen 预览用例：12 行终端（对齐参考截图版式），
 * 合成区留空，物品栏注入常用物品。
 */
export function Ae2CraftingTerminalScreenDemo() {
  return (
    <Ae2CraftingTerminalScreen
      hotbarItems={[
        { icon: "stone-block", tooltip: "石头" },
        { count: 64, icon: "iron-ingot", tooltip: "铁锭" },
        { count: 16, icon: "gold-ingot", tooltip: "金锭" },
        { icon: "diamond", tooltip: "钻石" },
      ]}
      items={[
        { count: 64, icon: "diamond", tooltip: "钻石" },
        { count: 32, icon: "iron-ingot", tooltip: "铁锭" },
        { count: 16, icon: "gold-ingot", tooltip: "金锭" },
        { count: 64, icon: "lapis-lazuli", tooltip: "青金石" },
        { count: 8, icon: "redstone", tooltip: "红石" },
        { count: 64, icon: "stone-block", tooltip: "石头" },
        { count: 12, icon: "emerald", tooltip: "绿宝石" },
      ]}
      mainItems={[
        { count: 64, icon: "stone-block", tooltip: "石头" },
        { count: 64, icon: "iron-ingot", tooltip: "铁锭" },
        { count: 64, icon: "diamond", tooltip: "钻石" },
      ]}
      rows={12}
      searchPlaceholder="搜索…"
    />
  );
}
