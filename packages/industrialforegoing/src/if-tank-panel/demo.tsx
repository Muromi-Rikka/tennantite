import { IfTankPanel } from "./index";

export function IfTankPanelDemo() {
  return (
    <div className="relative h-48 w-56">
      <IfTankPanel input={{ icon: "potion" }} output={{ icon: "potion" }} progress={0.5} />
    </div>
  );
}
