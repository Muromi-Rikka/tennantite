import { Ic2HeatGauge } from "./index";

export function Ic2HeatGaugeDemo() {
  return (
    <div className="relative size-16">
      <Ic2HeatGauge label="热量" left={8} max={1000} top={8} value={600} />
    </div>
  );
}
