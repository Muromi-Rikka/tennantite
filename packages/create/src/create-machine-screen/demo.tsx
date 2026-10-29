import { useState } from "react";

import { CREATE_DEMO_FLOUR, CREATE_DEMO_PLAYER, CREATE_DEMO_WHEAT } from "../create-demo-data";
import { CreateMillstoneScreen } from "./index";

/**
 * 粉碎机（同一数据表 `crusher` 键）。
 */
export function CreateCrusherScreenDemo() {
  return (
    <CreateMillstoneScreen
      input={{ count: 8, icon: "iron-ingot", tooltip: "铁矿石" }}
      machine="crusher"
      output={{ count: 10, icon: "iron-ingot", tooltip: "铁碎石" }}
      player={CREATE_DEMO_PLAYER}
      progress={0.5}
      title="Crusher"
    />
  );
}

/**
 * CreateMillstoneScreen 预览用例：磨石，进度 0.5。
 */
export function CreateMillstoneScreenDemo() {
  const [progress] = useState(0.5);
  return (
    <CreateMillstoneScreen
      input={CREATE_DEMO_WHEAT}
      machine="millstone"
      output={CREATE_DEMO_FLOUR}
      player={CREATE_DEMO_PLAYER}
      progress={progress}
    />
  );
}
