import { MekanismDigitalMinerConfigScreen } from "../index";

export function MekanismDigitalMinerConfigScreenDemo() {
  return (
    <MekanismDigitalMinerConfigScreen
      filterCount="5"
      filters={[
        { icon: "item/upgrade/filter", id: "iron", label: "铁矿石" },
        { id: "tag", label: "#forge:ores" },
        { icon: "item/upgrade/filter", id: "mod", label: "mekanism" },
        { id: "gem", label: "钻石" },
        { id: "extra", label: "绿宝石" },
      ]}
      maxY="320"
      minY="-64"
      radius="10"
      replaceTarget={{ count: 1, icon: "stone-block", tooltip: "圆石" }}
      requireReplacement
      selectedFilterId="iron"
    />
  );
}
