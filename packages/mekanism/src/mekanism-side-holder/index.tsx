import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismSideHolderProps {
  className?: string;
  /**
   * 侧条高度（GUI px）
   */
  height: number;
  /**
   * 侧条左上角 x（GUI px）
   */
  left: number;
  /**
   * 左侧 / 右侧
   */
  side: "left" | "right";
  /**
   * 默认白色
   */
  tint?: string;
  /**
   * 侧条左上角 y（GUI px）
   */
  top: number;
}

/**
 * 装备栏侧条（26×height，九宫格）。
 */
export function MekanismSideHolder({
  className,
  height,
  left,
  side,
  tint = "#ffffff",
  top,
}: MekanismSideHolderProps) {
  return (
    <MekanismSprite
      className={className}
      height={height}
      left={left}
      name={side === "left" ? "holder_left" : "holder_right"}
      tint={tint}
      top={top}
      width={26}
    />
  );
}
