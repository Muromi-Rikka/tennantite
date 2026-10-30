import { ModSlotGrid } from "./index";

export function ModSlotGridDemo() {
  return (
    <div className="relative h-24 w-48">
      <ModSlotGrid
        columns={2}
        items={[{ icon: "diamond" }, { icon: "coal" }]}
        labelPrefix="demo-slot"
        left={8}
        rows={2}
        top={8}
      />
    </div>
  );
}
