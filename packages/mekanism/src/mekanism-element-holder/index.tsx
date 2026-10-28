import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismElementHolderProps {
  className?: string;
  height: number;
  left: number;
  top: number;
  width: number;
}

/**
 * 侧边凹槽底板（九宫格 border 1）。
 */
export function MekanismElementHolder({
  className,
  height,
  left,
  top,
  width,
}: MekanismElementHolderProps) {
  return (
    <MekanismSprite
      className={className}
      height={height}
      left={left}
      name="element_holder"
      top={top}
      width={width}
    />
  );
}
