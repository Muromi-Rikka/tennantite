import { Ae2PatternEncodingTerminalScreen } from "./index";

/**
 * Ae2PatternEncodingTerminalScreen 预览用例：合成模式 → 处理模式的双底图，
 * 3×3 合成格已填、空图样待编码。
 */
export function Ae2PatternEncodingTerminalScreenDemo() {
  return (
    <div className="flex flex-wrap gap-12">
      <Ae2PatternEncodingTerminalScreen
        craftGrid={[
          { icon: "iron-ingot", tooltip: "铁锭" },
          { icon: "iron-ingot", tooltip: "铁锭" },
          { icon: "gold-ingot", tooltip: "金锭" },
        ]}
        craftResult={{ icon: "diamond", tooltip: "合成结果" }}
        entriesLabel="1,024 项"
        hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
        items={Array.from({ length: 30 }, (_, index) => ({ icon: index % 3 === 0 ? "gold-ingot" : (index % 3 === 1 ? "iron-ingot" : "diamond") }))}
        mainItems={Array.from({ length: 27 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        mode="crafting"
        patternIn={{ icon: "charcoal", tooltip: "空图样" }}
        patternOut={{ icon: "emerald", tooltip: "已编码图样" }}
      />
      <Ae2PatternEncodingTerminalScreen
        entriesLabel="512 项"
        hotbarItems={Array.from({ length: 9 }, (_, index) => ({ icon: index % 2 ? "charcoal" : "iron-ingot" }))}
        items={Array.from({ length: 24 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        mainItems={Array.from({ length: 27 }, (_, index) => ({ icon: index % 2 ? "gold-ingot" : "iron-ingot" }))}
        mode="processing"
        outputs={[
          { icon: "iron-ingot", tooltip: "处理产物 1" },
          { icon: "gold-ingot", tooltip: "处理产物 2" },
          { icon: "diamond", tooltip: "处理产物 3" },
        ]}
        patternIn={{ icon: "charcoal", tooltip: "空图样" }}
        patternOut={{ icon: "emerald", tooltip: "已编码图样" }}
      />
    </div>
  );
}
