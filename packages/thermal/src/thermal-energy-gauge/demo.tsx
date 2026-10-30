import { THERMAL_ITEM_GAUGE } from "../thermal-metrics";
import { ThermalEnergyGauge, ThermalItemGauge } from "./index";

/**
 * ThermalEnergyGauge 预览用例：半满能量表与提取 85% 的染色表。
 */
export function ThermalEnergyGaugeDemo() {
  return (
    <div className="relative size-32">
      <ThermalEnergyGauge label="能量" left={10} max={400000} top={10} value={200000} />
      <ThermalEnergyGauge
        label="染色能量"
        left={40}
        max={400000}
        tint="#3c7fe0"
        top={10}
        value={340000}
      />
    </div>
  );
}

export function ThermalItemGaugeDemo() {
  return (
    <div className="relative size-32">
      <ThermalItemGauge
        height={THERMAL_ITEM_GAUGE.height}
        label="缓存容量"
        left={10}
        max={64}
        top={10}
        value={32}
        width={THERMAL_ITEM_GAUGE.width}
      />
    </div>
  );
}
