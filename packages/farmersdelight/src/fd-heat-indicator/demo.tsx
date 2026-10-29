import { FdHeatIndicator } from "./index";

export function FdHeatIndicatorDemo() {
  return (
    <div className="relative h-12 w-24">
      <FdHeatIndicator heated />
      <FdHeatIndicator heated={false} left={24} />
    </div>
  );
}
