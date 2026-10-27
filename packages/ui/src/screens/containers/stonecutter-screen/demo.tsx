import { StonecutterScreen } from "./index";

export function StonecutterScreenDemo() {
  return <StonecutterScreen input={{ icon: "stone-block" }} output={{ icon: "stone-block" }} recipes={[{ id: "stairs" }, { id: "slab" }]} />;
}
