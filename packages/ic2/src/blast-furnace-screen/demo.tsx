import { Ic2BlastFurnaceScreen } from "./index";

/**
 * Ic2BlastFurnaceScreen 预览用例：铁锭 ×1 → 钢锭（原版图标近似），进气 / 排气
 * 万用流体单元，热量 64%。
*/
export function Ic2BlastFurnaceScreenDemo() {
  return (
    <Ic2BlastFurnaceScreen
      cellInput={{ icon: "lapis-lazuli", tooltip: "万用流体单元（空气）" }}
      cellOutput={{ icon: "lapis-lazuli", tooltip: "万用流体单元（热空气）" }}
      heat={0.64}
      input={{ icon: "iron-ingot", tooltip: "铁锭" }}
      outputs={[
        { count: 1, icon: "iron-ingot", tooltip: "钢锭" },
        { count: 1, icon: "stone-block", tooltip: "矿渣" },
      ]}
      progress={0.4}
      title="高炉"
    />
  );
}
