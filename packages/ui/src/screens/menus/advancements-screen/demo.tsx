import { AdvancementsScreen } from "./index";

/**
 * AdvancementsScreen 预览用例（规格 §6.3）
*/
export function AdvancementsScreenDemo() {
  return (
    <AdvancementsScreen
      categories={[
        {
          name: "minecraft",
          nodes: [
            {
              children: [
                {
                  description: "获得石镐",
                  done: true,
                  icon: "stone-block",
                  name: "石器时代",
                },
                {
                  description: "获得铁锭",
                  icon: "sword",
                  name: "获得升级",
                },
              ],
              done: true,
              icon: "grass-block",
              name: "计时器开始",
            },
            { description: "击杀凋灵", name: "凋零山庄" },
          ],
        },
        {
          name: "husbandry",
          nodes: [
            {
              description: "吃掉一块面包",
              done: true,
              icon: "dirt-block",
              name: "面包师",
            },
          ],
        },
      ]}
    />
  );
}
