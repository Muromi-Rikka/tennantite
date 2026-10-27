import { CreativeInventoryScreen } from "./index";

export function CreativeInventoryScreenDemo() {
  return <CreativeInventoryScreen items={Array.from({ length: 45 }, () => ({ count: 64, icon: "stone-block" as const }))} />;
}
