import { ThermalEnergyGauge } from "./index";

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
