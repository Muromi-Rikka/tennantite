import { HorseScreen } from "./index";

/**
 * HorseScreen 预览用例（规格 §6.2）：鞍 + 铁马铠，箱子内装小麦
*/
export function HorseScreenDemo() {
  return (
    <HorseScreen
      armor={{ count: 1, icon: "iron-horse-armor", tooltip: "铁马铠" }}
      chest
      chestItems={[{ count: 64, icon: "wheat", tooltip: "小麦 ×64" }]}
      saddle={{ count: 1, icon: "saddle", tooltip: "鞍" }}
      title="马"
    />
  );
}
