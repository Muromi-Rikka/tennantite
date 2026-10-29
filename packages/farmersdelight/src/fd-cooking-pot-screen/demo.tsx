import { useState } from "react";

import { FD_DEMO_ITEMS } from "../fd-demo-data";
import { FdCookingPotScreen } from "./index";

export function FdCookingPotScreenDemo() {
  const [heated, setHeated] = useState(true);
  const [recipeBookOpen, setRecipeBookOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <FdCookingPotScreen
        container={FD_DEMO_ITEMS.potion}
        heated={heated}
        ingredients={[
          FD_DEMO_ITEMS.apple,
          FD_DEMO_ITEMS.wheat,
          FD_DEMO_ITEMS.ironIngot,
          FD_DEMO_ITEMS.charcoal,
          FD_DEMO_ITEMS.emerald,
          FD_DEMO_ITEMS.gunpowder,
        ]}
        meal={FD_DEMO_ITEMS.apple}
        onRecipeBookToggle={() => { setRecipeBookOpen(value => !value); }}
        onSlotClick={() => { setHeated(value => !value); }}
        output={FD_DEMO_ITEMS.wheat}
        progress={0.6}
        recipeBookOpen={recipeBookOpen}
      />
      <p className="text-xs opacity-60">
        点击物品槽切换受热状态；点击配方书按钮切换按钮态。
      </p>
    </div>
  );
}
