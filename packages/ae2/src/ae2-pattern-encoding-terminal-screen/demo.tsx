import { Ae2PatternEncodingTerminalScreen } from "./index";

/**
 * Ae2PatternEncodingTerminalScreen 预览用例：合成模式 → 处理模式的双底图。
 * 合成模式为 4 木板 → 工作台；处理模式为铁矿石 → 铁锭。
 */
export function Ae2PatternEncodingTerminalScreenDemo() {
  const planks = { count: 1, icon: "oak-planks" as const };
  return (
    <div className="flex flex-wrap gap-12">
      <Ae2PatternEncodingTerminalScreen
        craftGrid={[planks, planks, null, planks, planks, null, null, null, null]}
        craftResult={{ count: 1, icon: "crafting-table", tooltip: "工作台" }}
        entriesLabel="1,024 项"
        hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
        items={Array.from({ length: 30 }, (_, index) => ({ icon: index % 3 === 0 ? "gold-ingot" : (index % 3 === 1 ? "iron-ingot" : "diamond") }))}
        mainItems={Array.from({ length: 27 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        mode="crafting"
        patternIn={{ icon: "charcoal", tooltip: "空图样" }}
        patternOut={{ icon: "emerald", tooltip: "已编码图样" }}
      />
      <Ae2PatternEncodingTerminalScreen
        craftGrid={[{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }, null, null, null, null, null, null, null, null]}
        entriesLabel="512 项"
        hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
        items={Array.from({ length: 24 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        mainItems={Array.from({ length: 27 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        mode="processing"
        outputs={[
          { count: 1, icon: "iron-ingot", tooltip: "铁锭" },
          null,
          null,
        ]}
        patternIn={{ icon: "charcoal", tooltip: "空图样" }}
        patternOut={{ icon: "emerald", tooltip: "已编码图样" }}
      />
    </div>
  );
}
