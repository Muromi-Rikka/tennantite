import { useState } from "react";

import { IF_DEMO_ITEMS } from "../if-demo-data";
import { IfLaserBaseScreen } from "./index";

export function IfLaserBaseScreenDemo() {
  const [depth, setDepth] = useState("64");
  return (
    <IfLaserBaseScreen
      depth={depth}
      lenses={[IF_DEMO_ITEMS.diamond, IF_DEMO_ITEMS.emerald]}
      onDepthChange={setDepth}
      outputs={[IF_DEMO_ITEMS.gunpowder, IF_DEMO_ITEMS.charcoal]}
      variant="ore"
      work={0.35}
    />
  );
}
