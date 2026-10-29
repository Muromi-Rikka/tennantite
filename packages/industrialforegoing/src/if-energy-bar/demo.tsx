import { IfEnergyBar } from "./index";

export function IfEnergyBarDemo() {
  return (
    <div className="relative h-40 w-32">
      <IfEnergyBar max={1000} value={620} />
    </div>
  );
}
