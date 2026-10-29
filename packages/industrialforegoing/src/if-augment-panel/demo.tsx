import { IfAugmentPanel } from "./index";

export function IfAugmentPanelDemo() {
  return (
    <div className="relative h-48 w-56">
      <IfAugmentPanel
        items={[
          { icon: "diamond" },
          { icon: "emerald" },
          undefined,
          { icon: "sword" },
        ]}
      />
    </div>
  );
}
