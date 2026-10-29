import { FdHungerOverlay } from "./index";

export function FdHungerOverlayDemo() {
  return (
    <div className="relative h-12 w-24">
      <FdHungerOverlay foodLevel={4} x={0} y={0} />
      <FdHungerOverlay foodLevel={13} naturalHealing x={0} y={16} />
    </div>
  );
}
