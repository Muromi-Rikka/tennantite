import type { ComponentProps } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "../../lib/utils";

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

/**
 * MC 开关（规格 §4 #5）：凹槽轨道 + 石纹把手，用于快速开关。
*/
export function Switch({ className, ...properties }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "mc-tex-slot flex h-28 w-56 shrink-0 cursor-pointer items-center p-2 outline-none",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    >
      <BaseSwitch.Thumb className="mc-tex-btn h-20 w-24" />
    </BaseSwitch.Root>
  );
}
