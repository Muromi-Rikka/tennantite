import { useState } from "react";

import { CREATE_DEMO_FLOUR, CREATE_DEMO_PLAYER, CREATE_DEMO_WHEAT } from "../create-demo-data";
import { CreateMillstoneScreen } from "./index";

/**
 * 粉碎机（同一数据表 `crusher` 键）：铁矿石 → 1 粉碎粗铁（另 75% 概率再产 1）。
 */
export function CreateCrusherScreenDemo() {
  return (
    <CreateMillstoneScreen
      input={{ count: 1, icon: "iron-ore", tooltip: "铁矿石" }}
      machine="crusher"
      output={{ count: 1, icon: "iron-ingot", tooltip: "粉碎粗铁" }}
      player={CREATE_DEMO_PLAYER}
      progress={0.5}
      title="Crusher"
    />
  );
}

/**
 * CreateMillstoneScreen 预览用例：小麦 → 小麦面粉，进度 0.5。
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
