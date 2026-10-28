import { Ae2InscriberScreen } from "./index";

/**
 * Ae2InscriberScreen 预览用例：铁板 + 金板 → 逻辑处理器。
 */
export function Ae2InscriberScreenDemo() {
  return (
    <Ae2InscriberScreen
      bottomPlate={{ icon: "nether-wart", tooltip: "红石" }}
      input={{ icon: "gold-ingot", tooltip: "金板" }}
      output={{ icon: "diamond", tooltip: "逻辑处理器" }}
      progress={0.6}
      topPlate={{ icon: "iron-ingot", tooltip: "铁板" }}
      upgrades={[{ icon: "emerald", tooltip: "加速卡" }]}
    />
  );
}
