import { FD_HUD_ICON, FD_HUD_ICON_STEP } from "../fd-metrics";
import { FdIconRow } from "../icon-row";

export interface FdComfortOverlayProps {
  className?: string;
  /**
   * 生命上限（半颗心单位，默认 20）
   */
  maxHealth?: number;
  /**
   * 闪光帧（上游 `guiTicks % 50`，默认 0）
   */
  sheenFrame?: number;
  /**
   * 行左上角 x（GUI px；上游为屏幕中线 - 91）
   */
  x?: number;
  /**
   * 行左上角 y（GUI px）
   */
  y?: number;
}

/**
 * Farmer's Delight 舒适（Comfort）覆盖层：饱食度归零受伤时，心形行上扫过一道
 * 闪光。上游每 2 tick 前进一列，奇偶帧决定闪光宽 5 px 还是 9 px；拆成
 * `comfortLeft`（5×9）+ `comfortRight`（4×9）两枚同像素拼接，不做拉伸。
 */
export function FdComfortOverlay({
  className,
  maxHealth = 20,
  sheenFrame = 0,
  x = 0,
  y = 0,
}: FdComfortOverlayProps) {
  const hearts = Math.ceil(Math.min(maxHealth, 20) / 2);
  /**
   * 奇数帧闪光撑满 9 px（左片 + 右片同列）
   */
  const isWide = sheenFrame % 2 === 1;
  const sheenColumn = Math.floor(sheenFrame / 2);
  const rightColumn = isWide ? sheenColumn : sheenColumn - 1;
  const leftPiece = sheenColumn < hearts
    ? (
        <FdIconRow
          count={1}
          icon={FD_HUD_ICON.comfortLeft}
          left={x + sheenColumn * FD_HUD_ICON_STEP}
          step={FD_HUD_ICON_STEP}
          top={y}
        />
      )
    : null;
  const rightPiece = rightColumn >= 0 && rightColumn < hearts
    ? (
        <FdIconRow
          count={1}
          icon={FD_HUD_ICON.comfortRight}
          left={x + rightColumn * FD_HUD_ICON_STEP + FD_HUD_ICON.comfortLeft.width}
          step={FD_HUD_ICON_STEP}
          top={y}
        />
      )
    : null;

  return (
    <div aria-hidden="true" className={className} data-fd-overlay="comfort">
      {isWide ? leftPiece : rightPiece}
      {isWide ? rightPiece : leftPiece}
    </div>
  );
}
