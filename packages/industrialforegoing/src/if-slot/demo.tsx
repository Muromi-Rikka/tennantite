import { IfSlot } from "./index";

export function IfSlotDemo() {
  return (
    <div className="relative h-40 w-64">
      <IfSlot color="orange" item={{ count: 3, icon: "diamond" }} label="demo-slot" left={8} top={8} />
      <IfSlot color="cyan" label="demo-empty" left={40} top={8} />
      <IfSlot color="lime" frame="filter" item={{ icon: "wheat" }} label="demo-filter" left={8} top={40} />
    </div>
  );
}
