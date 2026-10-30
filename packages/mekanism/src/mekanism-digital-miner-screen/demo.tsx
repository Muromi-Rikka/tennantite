import type { ScreenSlot } from "@tennantite/ui";
import { MekanismDigitalMinerScreen } from "../index";

const MINER_SLOT: ScreenSlot = { count: 64, icon: "iron-ore", tooltip: "铁矿石 ×64" };

export function MekanismDigitalMinerScreenDemo() {
  return (
    <MekanismDigitalMinerScreen
      energy={{ max: 10000000, value: 6400000 }}
      energySlot={{ count: 1, icon: "lapis-lazuli", tooltip: "能量平板" }}
      searchText="搜索完成"
      slots={{ "main-0": MINER_SLOT, "main-1": MINER_SLOT, "main-2": MINER_SLOT, "main-9": MINER_SLOT }}
      startActive={false}
      statusText="低电力"
      stopActive
      switches={{ eject: true, silk: true }}
      toMineText="12,480"
    />
  );
}
