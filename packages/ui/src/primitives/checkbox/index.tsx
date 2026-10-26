import type { ComponentProps } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { cn } from "../../lib/utils";

export type CheckboxProps = ComponentProps<typeof BaseCheckbox.Root>;

/**
 * MC 复选框（规格 §4 #4）：石槽 + 白色勾选标记，用于设置项。
*/
export function Checkbox({ className, ...properties }: CheckboxProps) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "mc-tex-slot flex size-24 shrink-0 cursor-pointer items-center justify-center outline-none",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    >
      <BaseCheckbox.Indicator className="font-readable text-mc leading-none text-mc-text-main mc-text-shadow">
        ✔
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
