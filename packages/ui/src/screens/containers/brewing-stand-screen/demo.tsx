import { BrewingStandScreen } from "./index";

/**
 * BrewingStandScreen 预览用例（规格 §6.2）
*/
export function BrewingStandScreenDemo() {
  return (
    <BrewingStandScreen
      blazeFuel={{ count: 20, icon: "blaze-powder", tooltip: "烈焰粉" }}
      bottles={[{ icon: "potion", tooltip: "水瓶" }, null, { icon: "potion", tooltip: "水瓶" }]}
      brewProgress={0.6}
      ingredient={{ icon: "nether-wart", tooltip: "地狱疣" }}
      title="酿造台"
    />
  );
}
