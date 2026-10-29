import { useState } from "react";

import { CREATE_DEMO_INGOT, CREATE_DEMO_PLAYER } from "../create-demo-data";
import { CreateFilterScreen } from "./index";

/**
 * CreateFilterScreen 预览用例：白名单 + AND + 不比对 NBT。
 */
export function CreateFilterScreenDemo() {
  const [mode, setMode] = useState<"and" | "or">("and");
  const [match, setMatch] = useState<"allow" | "deny">("allow");
  const [respectData, setRespectData] = useState(false);
  return (
    <CreateFilterScreen
      items={[CREATE_DEMO_INGOT]}
      match={match}
      mode={mode}
      onMatchChange={setMatch}
      onModeChange={setMode}
      onRespectDataChange={setRespectData}
      player={CREATE_DEMO_PLAYER}
      respectData={respectData}
    />
  );
}
