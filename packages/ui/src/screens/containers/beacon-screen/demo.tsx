import { BeaconScreen } from "./index";

/**
 * BeaconScreen 预览用例（规格 §6.2）：原版 5 主效果 + 辅助效果（生命恢复）。
*/
export function BeaconScreenDemo() {
  return (
    <BeaconScreen
      payment={{ count: 1, icon: "diamond", tooltip: "钻石" }}
      primaryOptions={[
        { icon: "effect-speed", id: "speed", label: "速度" },
        { icon: "effect-haste", id: "haste", label: "急迫" },
        { icon: "effect-resistance", id: "resistance", label: "抗性提升" },
        { icon: "effect-jump boost", id: "jump_boost", label: "跳跃提升" },
        { icon: "effect-strength", id: "strength", label: "力量" },
      ]}
      secondaryOptions={[
        { icon: "effect-regeneration", id: "regeneration", label: "生命恢复" },
      ]}
    />
  );
}
