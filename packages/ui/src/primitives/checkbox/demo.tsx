import { useState } from "react";

import { Checkbox } from "./index";

/**
 * Checkbox 预览用例：设置项列表
*/
export function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex flex-col gap-8">
      <label className="flex items-center gap-4">
        <Checkbox
          checked={checked}
          onCheckedChange={(next) => {
            setChecked(next === true);
          }}
        />
        <span className="font-mc mc-text">
          显示云：
          {checked ? "开" : "关"}
        </span>
      </label>
      <label className="flex items-center gap-4">
        <Checkbox defaultChecked={false} />
        <span className="font-mc mc-text">平滑光照</span>
      </label>
      <label className="flex items-center gap-4">
        <Checkbox disabled />
        <span className="font-mc mc-text text-mc-text-dim">全屏（禁用）</span>
      </label>
    </div>
  );
}
