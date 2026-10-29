import { useState } from "react";

import { CREATE_DEMO_INGOT, CREATE_DEMO_PLAYER, CREATE_DEMO_WHEAT } from "../create-demo-data";
import { CreateToolboxScreen } from "./index";

/**
 * CreateToolboxScreen 预览用例：橙色配色 + 2 个物品。
 */
export function CreateToolboxScreenDemo() {
  const [selectedColor, setSelectedColor] = useState<string | undefined>("#f9801d");
  return (
    <CreateToolboxScreen
      items={[CREATE_DEMO_INGOT, CREATE_DEMO_WHEAT]}
      onColorChange={color => setSelectedColor(color)}
      player={CREATE_DEMO_PLAYER}
      selectedColor={selectedColor}
    />
  );
}
