import type { ComponentProps } from "react";
import { Slider as BaseSlider } from "@base-ui/react/slider";
import { cn } from "../../lib/utils";

export type SliderProps = ComponentProps<typeof BaseSlider.Root>;

/**
 * MC 滑条（规格 §4 #3）：石纹轨道 + 像素把手，用于音量 / 难度 / 灵敏度。
*/
export function Slider({
  "aria-label": ariaLabel,
  className,
  ...properties
}: SliderProps) {
  return (
    <BaseSlider.Root className={cn("flex h-32 w-full items-center", className)} {...properties}>
      <BaseSlider.Control className="flex w-full cursor-pointer touch-none items-center outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white">
        <BaseSlider.Track className="mc-tex-slider-track w-full" />
        <BaseSlider.Thumb
          aria-label={ariaLabel}
          className="mc-tex-slider-thumb h-24 w-16 shrink-0 outline-none"
        />
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
