import { CrafterScreen } from "./index";

export function CrafterScreenDemo() {
  return <CrafterScreen items={[{ count: 1, icon: "stone-block" }, { count: 1, icon: "stone-block" }]} output={{ icon: "stone-block" }} />;
}
