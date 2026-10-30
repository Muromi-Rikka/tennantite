import { THERMAL_PROGRESS_ARROW } from "../thermal-metrics";
import { ThermalSpriteProgress } from "./index";

export function ThermalSpriteProgressDemo() {
  return (
    <div className="relative h-16 w-40">
      <ThermalSpriteProgress
        direction="right"
        fillCrop={THERMAL_PROGRESS_ARROW.fillCrop}
        height={THERMAL_PROGRESS_ARROW.height}
        label="处理进度"
        left={8}
        progress={0.5}
        sprite="elements/progress_arrow_right"
        top={8}
        trackCrop={THERMAL_PROGRESS_ARROW.trackCrop}
        width={THERMAL_PROGRESS_ARROW.width}
      />
    </div>
  );
}
