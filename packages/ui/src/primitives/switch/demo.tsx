import { useState } from "react";

import { Switch } from "./index";

/**
 * Switch 预览用例
*/
export function SwitchDemo() {
  const [on, setOn] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <label className="flex items-center gap-4">
        <Switch
          checked={on}
          onCheckedChange={(next) => {
            setOn(next);
          }}
        />
        <span className="font-mc mc-text">
          难度锁定：
          {on ? "开" : "关"}
        </span>
      </label>
      <Switch aria-label="默认开" defaultChecked />
      <Switch aria-label="禁用" disabled />
    </div>
  );
}
