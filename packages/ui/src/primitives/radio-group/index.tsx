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
        "mc-tex-slot flex size-24 shrink-0 cursor-pointer items-center justify-center outline-none",
        "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...properties}
    >
      <BaseRadio.Indicator
        className={cn(
          "size-8 bg-white outline-1 outline-black",
          "data-unchecked:invisible",
        )}
      />
    </BaseRadio.Root>
  );
}

/**
 * MC 单选组（规格 §4 #6）：石槽选项 + 白色方块指示器。
*/
export function RadioGroup({ className, ...properties }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      className={cn("flex flex-col gap-8 outline-none", className)}
      {...properties}
    />
  );
}
