import type { ComponentProps } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "../../lib/utils";

export type SliderProps = ComponentProps<typeof BaseSlider.Root>;

/**
 * MC 滑条（规格 §4 #3）：原版 20 GUI px 高，纯 #2C2C2C 轨道 + 按钮浮雕把手。
*/
export function Slider({
  "aria-label": ariaLabel,
  className,
  ...properties
}: SliderProps) {
  return (
    <BaseSlider.Root className={cn("flex h-20 w-full items-center", className)} {...properties}>
      <BaseSlider.Control className="relative flex w-full cursor-pointer touch-none items-center outline-none">
        <BaseSlider.Track className="mc-tex-slider-track h-20 w-full" />
        <BaseSlider.Thumb
          aria-label={ariaLabel}
          className="mc-tex-slider-thumb h-20 w-8 shrink-0 outline-none focus-visible:mc-outline focus-visible:outline-white"
        />
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
