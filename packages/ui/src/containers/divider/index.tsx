import type { ComponentProps, CSSProperties } from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";

import { cn } from "../../lib/utils";

export interface DividerProps extends ComponentProps<typeof BaseSeparator> {
  /**
  * 原版分隔线：普通 / 游戏内 / 强分隔
  */
  variant?: "default" | "inworld" | "strong";
}

/**
 * MC 分隔线（规格 §5 #5）：32×2 原版 separator 平铺。
 */
export function Divider({
  className,
  style,
  variant = "default",
  ...properties
}: DividerProps) {
  const sprite = separatorFor(variant);
  const dividerStyle: CSSProperties = {
    backgroundImage: sprite,
    backgroundRepeat: "repeat",
    backgroundSize: "calc(var(--mc-gui) * 32) calc(var(--mc-gui) * 2)",
    imageRendering: "pixelated",
    ...style,
  };
  return (
    <BaseSeparator
      className={cn(
        "data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
        className,
      )}
      style={dividerStyle}
      {...properties}
    />
  );
}

function separatorFor(variant: DividerProps["variant"]): string {
  switch (variant) {
    case "inworld": { return "var(--mc-gui-inworld-header-separator-png)";
    }
    case "strong": { return "var(--mc-gui-footer-separator-png)";
    }
    default: { return "var(--mc-gui-header-separator-png)";
    }
  }
}
