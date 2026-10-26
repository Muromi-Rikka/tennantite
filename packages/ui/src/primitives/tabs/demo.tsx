import { useState } from "react";

import { Tabs, TabsList, TabsPanel, TabsTab } from "./index";

const CATEGORIES = ["方块", "物品", "红石"] as const;

/**
 * Tabs 预览用例：配方书分类
*/
export function TabsDemo() {
  const [category, setCategory] = useState("方块");

  return (
    <Tabs onValueChange={setCategory} value={category}>
      <TabsList aria-label="配方分类">
        {CATEGORIES.map(name => (
          <TabsTab key={name} value={name}>
            {name}
          </TabsTab>
        ))}
      </TabsList>
      <TabsPanel value="方块">工作台 / 熔炉 / 箱子…</TabsPanel>
      <TabsPanel value="物品">火把 / 梯子 / 栅栏…</TabsPanel>
      <TabsPanel value="红石">中继器 / 比较器 / 活塞…</TabsPanel>
    </Tabs>
  );
}
