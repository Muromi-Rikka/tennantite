import { Ic2EnergyGauge } from "./index";

/**
 * Ic2EnergyGauge 预览用例：机器闪电空 / 半满 / 满，储电箱横条半满
*/
export function Ic2EnergyGaugeDemo() {
  return (
    <div className="relative h-16 w-72">
      <Ic2EnergyGauge label="空闪电槽" left={8} max={40000} top={20} value={0} variant="bolt" />
      <Ic2EnergyGauge label="半满闪电槽" left={40} max={40000} top={20} value={18000} variant="bolt" />
      <Ic2EnergyGauge label="满闪电槽" left={72} max={40000} top={20} value={40000} variant="bolt" />
      <Ic2EnergyGauge label="半满横条" left={120} max={40000} top={22} value={18000} variant="bar" />
    </div>
  );
}
