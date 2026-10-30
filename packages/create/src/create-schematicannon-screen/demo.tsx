import { CREATE_DEMO_PLAYER } from "../create-demo-data";
import { CreateSchematicannonScreen } from "./index";

/**
 * CreateSchematicannonScreen 预览用例：运行中、燃料过半、放置设置展开。
 */
export function CreateSchematicannonScreenDemo() {
  return (
    <CreateSchematicannonScreen
      checklistProgress={0.5}
      fuel={0.6}
      player={CREATE_DEMO_PLAYER}
      progress={0.4}
      replaceMode={1}
      showSettings
      skipMissing
      slots={{
        blueprintOutput: { count: 1, icon: "wheat", tooltip: "已打印蓝图" },
        gunpowder: { count: 8, icon: "gunpowder", tooltip: "火药" },
        listPrinter: { count: 1, icon: "wheat", tooltip: "清单书" },
        schematic: { count: 1, icon: "wheat", tooltip: "蓝图" },
      }}
      state="running"
      statusText="正在打印蓝图"
    />
  );
}
