import { CreateStockKeeperScreen } from "./index";

/**
 * CreateStockKeeperScreen 预览用例：两个分类 + 部分滚动的物品网格。
 */
export function CreateStockKeeperScreenDemo() {
  return (
    <CreateStockKeeperScreen
      address="仓库 3 号"
      bodyRows={5}
      categories={[
        {
          id: "food",
          items: [
            { count: 64, icon: "wheat" },
            { count: 128, icon: "apple" },
            { count: 32, icon: "gold-ingot" },
          ],
          name: "食材",
        },
        {
          id: "materials",
          items: [
            { count: 512, icon: "iron-ingot" },
            { count: 64, icon: "gunpowder" },
            { count: 16, icon: "diamond" },
          ],
          name: "材料",
        },
      ]}
      order={[
        { count: 64, icon: "wheat" },
        { count: 16, icon: "diamond" },
      ]}
      scroll={0.2}
    />
  );
}
