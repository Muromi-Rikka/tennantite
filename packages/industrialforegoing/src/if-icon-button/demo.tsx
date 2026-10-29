import { useState } from "react";

import { IfIconButton } from "./index";

export function IfIconButtonDemo() {
  const [state, setState] = useState(0);
  return (
    <div className="relative h-40 w-64">
      <IfIconButton
        height={14}
        label="区域"
        left={8}
        onClick={() => { setState(current => (current + 1) % 2); }}
        state={state}
        states={["showArea", "hideArea"]}
        top={8}
        width={14}
      />
      <IfIconButton
        height={18}
        label="配方"
        left={8}
        state={0}
        states={["itemBackground"]}
        top={40}
        width={18}
      />
    </div>
  );
}
