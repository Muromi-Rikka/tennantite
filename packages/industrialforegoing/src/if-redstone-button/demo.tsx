import { useState } from "react";

import type { IfRedstoneMode } from "../if-markers";
import { IfRedstoneButton } from "./index";

export function IfRedstoneButtonDemo() {
  const [mode, setMode] = useState<IfRedstoneMode>("ignore");
  return (
    <div className="relative h-32 w-48">
      <IfRedstoneButton onClick={() => { setMode("with_redstone"); }} value={mode} />
    </div>
  );
}
