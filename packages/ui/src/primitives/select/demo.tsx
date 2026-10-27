import { useState } from "react";

import { Select, SelectIcon, SelectItem, SelectList, SelectPopup, SelectTrigger, SelectValue } from "./index";

const GAMEMODES = ["生存", "创造", "冒险", "旁观"] as const;

/**
 * Select 预览用例：游戏模式选择
*/
export function SelectDemo() {
  const [mode, setMode] = useState<null | string>("生存");

  return (
    <div className="flex flex-col gap-8">
      <Select<string> onValueChange={setMode} value={mode}>
        <SelectTrigger aria-label="游戏模式">
          <SelectValue />
          <SelectIcon />
        </SelectTrigger>
        <SelectPopup aria-label="游戏模式选项">
          <SelectList>
            {GAMEMODES.map(name => (
              <SelectItem key={name} value={name}>
                {name}
              </SelectItem>
            ))}
          </SelectList>
        </SelectPopup>
      </Select>
    </div>
  );
}
