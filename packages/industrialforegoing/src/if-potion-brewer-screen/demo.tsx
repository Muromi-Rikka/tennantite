import { useState } from "react";

import { IF_DEMO_FLUIDS, IF_DEMO_ITEMS } from "../if-demo-data";
import { IfPotionBrewerScreen } from "./index";

export function IfPotionBrewerScreenDemo() {
  const [isLocked, setIsLocked] = useState(false);
  return (
    <IfPotionBrewerScreen
      blazeInput={IF_DEMO_ITEMS.gunpowder}
      bottleInput={IF_DEMO_ITEMS.potion}
      brewingInput={[
        IF_DEMO_ITEMS.wheat,
        IF_DEMO_ITEMS.apple,
        IF_DEMO_ITEMS.emerald,
      ]}
      fuel={0.5}
      isLocked={isLocked}
      onLockChange={setIsLocked}
      output={[IF_DEMO_ITEMS.potion]}
      progress={0.7}
      water={IF_DEMO_FLUIDS.water}
    />
  );
}
