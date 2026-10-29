import { useState } from "react";

import { IF_DEMO_ITEMS } from "../if-demo-data";
import { IfDissolutionChamberScreen } from "./index";

export function IfDissolutionChamberScreenDemo() {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <IfDissolutionChamberScreen
      energy={{ max: 1000, value: 620 }}
      inputFluid={{ max: 1000, tint: "#41CD34", value: 480 }}
      inputs={[
        IF_DEMO_ITEMS.diamond,
        IF_DEMO_ITEMS.wheat,
        IF_DEMO_ITEMS.emerald,
        IF_DEMO_ITEMS.gunpowder,
      ]}
      isLocked={isLocked}
      onLockChange={setIsLocked}
      output={IF_DEMO_ITEMS.potion}
      outputFluid={{ max: 1000, tint: "#B24CD8", value: 260 }}
      progress={0.45}
    />
  );
}
