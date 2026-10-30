import { IE_MACHINES, ieExpandSlots } from "../ie-machine-layout";
import { IeLayoutSlots } from "./index";

export function IeLayoutSlotsDemo() {
  const slots = ieExpandSlots(IE_MACHINES.cokeOven);
  const items = Object.fromEntries(slots.map(slot => [slot.label, { icon: "coal" as const }]));
  return (
    <div className="relative size-40">
      <IeLayoutSlots items={items} slots={slots} />
    </div>
  );
}
