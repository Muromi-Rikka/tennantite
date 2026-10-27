import type { ComponentProps } from "react";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { cn } from "../../lib/utils";

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>;

export type RadioProps = ComponentProps<typeof BaseRadio.Root>;

export function Radio({ className, ...properties }: RadioProps) {
  return (
    <BaseRadio.Root
      className={cn(
        "mc-tex-checkbox flex size-20 shrink-0 cursor-pointer items-center justify-center outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    >
      <BaseRadio.Indicator
        className={cn(
          "size-8 bg-white shadow-[var(--mc-gui)_var(--mc-gui)_0_0_#868686]",
          "data-unchecked:invisible",
        )}
      />
    </BaseRadio.Root>
  );
}

/**
 * MC 单选组（规格 §4 #6）：1 GUI px 黑框选项 + 8×8 白色方块指示器。
*/
export function RadioGroup({ className, ...properties }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={cn("flex flex-col gap-4 outline-none", className)}
      {...properties}
    />
  );
}
