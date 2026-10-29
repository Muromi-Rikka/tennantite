import { FdCookingProgress } from "./index";

export function FdCookingProgressDemo() {
  return (
    <div className="relative h-16 w-40 bg-mc-panel-overlay">
      <FdCookingProgress left={0} progress={0.35} top={0} />
      <FdCookingProgress left={40} progress={1} top={0} />
    </div>
  );
}
