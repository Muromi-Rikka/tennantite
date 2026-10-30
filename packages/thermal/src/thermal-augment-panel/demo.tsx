import { THERMAL_DEMO_SMOOTH_STONE } from "../thermal-demo-data";
import { ThermalAugmentPanel } from "./index";

export function ThermalAugmentPanelDemo() {
  return (
    <div className="relative h-[200px] w-[220px]">
      <ThermalAugmentPanel augments={[THERMAL_DEMO_SMOOTH_STONE]} open />
    </div>
  );
}
