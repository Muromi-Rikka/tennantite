import { IF_DEMO_ITEMS } from "../if-demo-data";
import { IfDyeMixerScreen } from "./index";

export function IfDyeMixerScreenDemo() {
  return (
    <IfDyeMixerScreen
      blue={{ level: 0.3, slot: IF_DEMO_ITEMS.potion }}
      dyeIndex={12}
      energy={{ max: 1000, value: 520 }}
      green={{ level: 0.6, slot: IF_DEMO_ITEMS.emerald }}
      output={IF_DEMO_ITEMS.diamond}
      progress={0.5}
      red={{ level: 0.9, slot: IF_DEMO_ITEMS.apple }}
    />
  );
}
