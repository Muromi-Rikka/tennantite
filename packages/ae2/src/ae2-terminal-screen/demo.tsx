import { Ae2TerminalScreen } from "./index";

/**
 * Ae2TerminalScreen 预览用例：6 行终端，原版图标近似 AE2 物品。
 */
export function Ae2TerminalScreenDemo() {
  return (
    <Ae2TerminalScreen
      entriesLabel="1-54"
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
        { count: 8, icon: "nether-wart", tooltip: "红石" },
        { count: 64, icon: "stone-block", tooltip: "石头" },
        { count: 12, icon: "emerald", tooltip: "绿宝石" },
      ]}
      mainItems={[
        { count: 64, icon: "stone-block", tooltip: "石头" },
        { count: 64, icon: "iron-ingot", tooltip: "铁锭" },
        { count: 64, icon: "diamond", tooltip: "钻石" },
      ]}
      searchPlaceholder="搜索…"
    />
  );
}
