import { FdComfortOverlay } from "./index";

export function FdComfortOverlayDemo() {
  return (
    <div className="relative size-24 bg-mc-panel-overlay">
      <FdComfortOverlay maxHealth={20} sheenFrame={0} x={0} y={0} />
      <FdComfortOverlay maxHealth={20} sheenFrame={1} x={0} y={16} />
      <FdComfortOverlay maxHealth={20} sheenFrame={2} x={0} y={32} />
    </div>
  );
}
