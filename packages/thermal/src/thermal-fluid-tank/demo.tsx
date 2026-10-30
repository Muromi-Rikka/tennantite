import { THERMAL_FLUID_STORAGE } from "../thermal-metrics";
import { ThermalFluidTank } from "./index";

export function ThermalFluidTankDemo() {
  return (
    <div className="relative h-24 w-16">
      <ThermalFluidTank
        state={{ amount: 2000, capacity: 4000, tint: "#3f76e4" }}
        tank={{
          frame: "elements/storage_fluid_medium",
          height: THERMAL_FLUID_STORAGE.medium.height,
          left: 8,
          overlay: "elements/overlay_fluid_medium",
          top: 8,
          width: THERMAL_FLUID_STORAGE.medium.width,
        }}
      />
    </div>
  );
}
