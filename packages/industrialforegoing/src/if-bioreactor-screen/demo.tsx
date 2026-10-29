import { useState } from "react";

import { IF_DEMO_FLUIDS, IF_DEMO_ITEMS } from "../if-demo-data";
import { IfBioreactorScreen } from "./index";

export function IfBioreactorScreenDemo() {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <IfBioreactorScreen
      biofuel={IF_DEMO_FLUIDS.biofuel}
      efficiency={0.72}
      energy={{ max: 1000, value: 850 }}
      inputs={[IF_DEMO_ITEMS.wheat, IF_DEMO_ITEMS.apple, IF_DEMO_ITEMS.wheat]}
      isLocked={isLocked}
      onLockChange={setIsLocked}
      progress={0.55}
      water={IF_DEMO_FLUIDS.water}
    />
  );
}
