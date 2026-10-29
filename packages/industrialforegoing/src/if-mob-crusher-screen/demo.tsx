import { IF_DEMO_ITEMS } from "../if-demo-data";
import { IfMobCrusherScreen } from "./index";

export function IfMobCrusherScreenDemo() {
  return (
    <IfMobCrusherScreen
      area={{ particles: false, showArea: true }}
      energy={{ max: 1000, value: 700 }}
      essence={{ max: 1000, tint: "#41CD34", value: 320 }}
      mode="produce"
      outputs={[IF_DEMO_ITEMS.gunpowder, IF_DEMO_ITEMS.charcoal]}
      progress={0.3}
    />
  );
}
