import type { ReactNode } from "react";

import { gui } from "@tennantite/ui";

/**
 * IC2 界面标题：水平居中、y=6、`#404040`、无阴影。
 */
export function Ic2Title({ children }: { children: ReactNode }) {
  return (
    <span
      className="absolute inset-x-0 text-center font-mc mc-text text-mc-ic2-text"
      style={{ top: gui(6) }}
    >
      {children}
    </span>
  );
}
