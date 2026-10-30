import { THERMAL_DEMO_SMOOTH_STONE } from "../thermal-demo-data";
import { ThermalLayoutSlot } from "./index";

export function ThermalLayoutSlotDemo() {
  return (
    <div className="relative size-16">
      <ThermalLayoutSlot item={THERMAL_DEMO_SMOOTH_STONE} label="demo-slot" left={8} top={8} />
    </div>
  );
}
