import { Ae2InscriberScreen } from "./index";

/**
 * Ae2InscriberScreen 预览用例：逻辑电路板 + 红石 + 硅板 → 逻辑处理器。
 */
export function Ae2InscriberScreenDemo() {
  return (
    <Ae2InscriberScreen
      bottomPlate={{ count: 1, icon: "diamond", tooltip: "硅板" }}
      input={{ count: 1, icon: "redstone", tooltip: "红石" }}
      output={{ count: 1, icon: "diamond", tooltip: "逻辑处理器" }}
      progress={0.6}
      topPlate={{ count: 1, icon: "iron-ingot", tooltip: "逻辑电路板" }}
      upgrades={[{ icon: "emerald", tooltip: "加速卡" }]}
    />
  );
}
