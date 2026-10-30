import { Ic2UpgradeStrip } from "./index";

export function Ic2UpgradeStripDemo() {
  return (
    <div className="relative size-40">
      <Ic2UpgradeStrip upgrades={[{ icon: "diamond" }, { icon: "coal" }]} />
    </div>
  );
}
