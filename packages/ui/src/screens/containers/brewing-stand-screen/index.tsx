import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

/**
 * 3 个药水瓶位左上角（GUI px，步进 23）
 */
const BOTTLE_LEFTS = [55, 78, 101];

export interface BrewingStandScreenProps {
  /**
  * 酿造燃料（烈焰粉，左上 (16,16)）
  */
  blazeFuel?: ScreenSlot;
  /**
  * 下方 3 个药水瓶位
  */
  bottles?: ScreenSlot[];
  /**
  * 酿造进度 0..1（气泡与箭头自上而下填满）
  */
  brewProgress?: number;
  className?: string;
  /**
  * 顶部原料槽（(78,16)）
  */
  ingredient?: ScreenSlot;
  title?: ReactNode;
}

/**
 * 酿造台界面（规格 §6）：燃料 / 原料 / 3 瓶位 + 12×29 气泡与 9×28 箭头裁剪进度。
 */
export function BrewingStandScreen({
  blazeFuel,
  bottles = [],
  brewProgress = 0,
  className,
  ingredient,
  title = "酿造台",
}: BrewingStandScreenProps) {
  const clip = `inset(${(1 - brewProgress) * 100}% 0 0 0)`;

  return (
    <ScreenPanel className={className} height={166} title={title} width={176}>
      <ScreenItemSlot item={blazeFuel} label="brewing-fuel" left={16} top={16} />
      <ScreenItemSlot item={ingredient} label="brewing-ingredient" left={78} top={16} />
      {BOTTLE_LEFTS.map((left, index) => (
        <ScreenItemSlot
          item={bottles[index]}
          key={left}
          label={`brewing-bottle-${index}`}
          left={left}
          top={50}
        />
      ))}
      <div
        aria-label="酿造进度"
        aria-valuemax={1}
        aria-valuemin={0}
        aria-valuenow={brewProgress}
        className="absolute overflow-hidden"
        role="progressbar"
        style={{ height: gui(29), left: gui(64), top: gui(18), width: gui(12) }}
      >
        <div className="mc-tex-bubbles size-full" style={{ clipPath: clip }} />
      </div>
      <div
        aria-hidden="true"
        className="absolute overflow-hidden"
        style={{ height: gui(28), left: gui(97), top: gui(19), width: gui(9) }}
      >
        <div className="mc-tex-brew-arrow size-full" style={{ clipPath: clip }} />
      </div>
      <PlayerInventory />
    </ScreenPanel>
  );
}
