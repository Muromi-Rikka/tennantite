import { useState } from "react";

import { IfTextField } from "./index";

export function IfTextFieldDemo() {
  const [value, setValue] = useState("64");
  return (
    <div className="relative h-32 w-64">
      <IfTextField label="深度" left={8} onChange={setValue} top={8} value={value} />
    </div>
  );
}
