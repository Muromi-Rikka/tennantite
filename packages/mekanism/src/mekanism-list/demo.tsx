import type { MekanismListRow } from "../mekanism-list/index";
import { MekanismList } from "../mekanism-list/index";

const MODULE_ROWS: MekanismListRow[] = [
  { icon: "item/upgrade/speed", id: "speed", label: "速度升级" },
  { icon: "item/upgrade/energy", id: "energy", label: "能量升级" },
  { icon: "item/upgrade/filter", id: "filter", label: "过滤升级" },
  { id: "muffling", label: "消音升级" },
  { icon: "item/upgrade/anchor", id: "anchor", label: "锚点升级" },
  { icon: "item/upgrade/chemical", id: "chemical", label: "化学升级" },
];

const FILTER_ROWS: MekanismListRow[] = [
  { icon: "item/upgrade/filter", id: "tag", label: "标签过滤器" },
  { icon: "item/upgrade/filter", id: "item", label: "物品过滤器" },
  { icon: "item/upgrade/filter", id: "mod", label: "模组过滤器" },
  { id: "material", label: "材质过滤器" },
];

export function MekanismListDemo() {
  return (
    <div className="relative h-44 w-96">
      <MekanismList left={0} rows={MODULE_ROWS} scroll={0.2} selectedId="filter" top={0} visibleRows={4} width={120} />
      <MekanismList left={140} rows={FILTER_ROWS} top={0} variant="filter" visibleRows={3} width={170} />
    </div>
  );
}
