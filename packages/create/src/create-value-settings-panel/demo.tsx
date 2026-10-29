import { useState } from "react";

import { CreateValueSettingsPanel } from "./index";

/**
 * CreateValueSettingsPanel 预览用例：0–32 区间，当前 16。
 */
export function CreateValueSettingsPanelDemo() {
  const [value, setValue] = useState(16);
  return (
    <CreateValueSettingsPanel
      hint="滚动调整数值"
      max={32}
      min={0}
      onChange={setValue}
      title="数量"
      value={value}
    />
  );
}
