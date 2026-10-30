import { SmithingScreen } from "./index";

/**
 * SmithingScreen 预览用例（规格 §6.2）：下界合金升级
*/
export function SmithingScreenDemo() {
  return (
    <SmithingScreen
      addition={{ count: 1, icon: "netherite-ingot", tooltip: "下界合金锭" }}
      base={{ icon: "diamond-chestplate", tooltip: "钻石胸甲" }}
      output={{ count: 1, icon: "netherite-chestplate", tooltip: "下界合金胸甲" }}
      template={{ icon: "netherite-upgrade-smithing-template", tooltip: "下界合金升级锻造模板" }}
      title="锻造台"
    />
  );
}
