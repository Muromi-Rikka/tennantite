import { IE_MACHINES } from "../ie-machine-layout";
import { IeProgressBars } from "./index";

export function IeProgressBarsDemo() {
  const layout = IE_MACHINES.arcFurnace.progressBars;
  return (
    <div className="relative size-40">
      <IeProgressBars
        dataAttribute="data-ie-progress"
        layout={layout}
        values={Array.from({ length: layout?.count ?? 0 }, (_, index) => (index + 1) / 12)}
      />
    </div>
  );
}
