import { useState } from "react";

import { AnvilScreen } from "./index";

/**
 * AnvilScreen 预览用例（规格 §6.2）
*/
export function AnvilScreenDemo() {
  const [name, setName] = useState("铁剑");
  return (
    <AnvilScreen
      item={{ icon: "sword", tooltip: "铁剑" }}
      levelCost={1}
      material={{ count: 1, icon: "iron-ingot", tooltip: "铁锭" }}
      onNameChange={setName}
      result={{ icon: "sword", tooltip: "铁剑（已修复）" }}
      title="修理"
      value={name}
    />
  );
}
