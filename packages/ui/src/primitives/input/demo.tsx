import { useState } from "react";

import { Input } from "./index";

/**
 * Input 预览用例：聊天框 + 受控值
*/
export function InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-160 flex-col gap-8">
      <Input placeholder="按 T 聊天…" />
      <Input
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder="铁砧改名"
        value={value}
      />
      <Input disabled placeholder="禁用态" />
    </div>
  );
}
