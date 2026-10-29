import { useState } from "react";

import { FdRecipeBookButton } from "./index";

export function FdRecipeBookButtonDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-12 w-24">
      <FdRecipeBookButton left={0} onToggle={() => setOpen(value => !value)} open={open} top={0} />
    </div>
  );
}
