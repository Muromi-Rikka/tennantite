import { BrewingStandScreen } from "./index";

/**
 * BrewingStandScreen 预览用例（规格 §6.2）
*/
export function BrewingStandScreenDemo() {
  return (
    <BrewingStandScreen
      blazeFuel={{ count: 20, icon: "creeper-face", tooltip: "烈焰粉" }}
      bottles={[{ icon: "diamond", tooltip: "水瓶" }, null, { icon: "diamond", tooltip: "水瓶" }]}
      brewProgress={0.6}
      ingredient={{ icon: "apple", tooltip: "地狱疣" }}
      title="酿造台"
    />
  );
}
