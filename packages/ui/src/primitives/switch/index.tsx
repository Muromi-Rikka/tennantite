import type { ComponentProps } from "react";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "../../lib/utils";

export type SwitchProps = ComponentProps<typeof BaseSwitch.Root>;

/**
 * MC 开关（规格 §4 #5）：槽位凹槽轨道 + 20×20 按钮浮雕把手，用于快速开关。
*/
export function Switch({ className, ...properties }: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        "mc-tex-slot flex h-20 w-40 shrink-0 cursor-pointer items-center p-0 outline-none",
        "focus-visible:mc-outline focus-visible:outline-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    >
      <BaseSwitch.Thumb className="mc-tex-btn size-20 data-checked:translate-x-20" />
    </BaseSwitch.Root>
  );
}
