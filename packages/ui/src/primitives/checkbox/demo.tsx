import { useState } from "react";

import { Checkbox } from "./index";

/**
 * Checkbox 预览用例：设置项列表
*/
export function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex flex-col gap-16">
      <label className="flex items-center gap-8">
        <Checkbox
          checked={checked}
          onCheckedChange={(next) => {
            setChecked(next === true);
          }}
        />
        <span className="font-readable text-mc">
          显示云：
          {checked ? "开" : "关"}
        </span>
      </label>
      <label className="flex items-center gap-8">
        <Checkbox defaultChecked={false} />
        <span className="font-readable text-mc">平滑光照</span>
      </label>
      <label className="flex items-center gap-8">
        <Checkbox disabled />
        <span className="font-readable text-mc text-mc-text-dim">全屏（禁用）</span>
      </label>
    </div>
  );
}
