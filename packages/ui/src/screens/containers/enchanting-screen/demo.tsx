import { EnchantingScreen } from "./index";

/**
 * EnchantingScreen 预览用例（规格 §6.2）
*/
export function EnchantingScreenDemo() {
  return (
    <EnchantingScreen
      availableLevel={30}
      item={{ icon: "sword", tooltip: "铁剑" }}
      lapis={{ count: 16, icon: "lapis-lazuli", tooltip: "青金石" }}
      options={[
        { lapisCost: 1, level: 1, xpCost: 2 },
        { label: "锋利 III", lapisCost: 2, level: 2, xpCost: 11 },
        { label: "锋利 IV", lapisCost: 3, level: 3, xpCost: 30 },
      ]}
      title="附魔"
    />
  );
}
