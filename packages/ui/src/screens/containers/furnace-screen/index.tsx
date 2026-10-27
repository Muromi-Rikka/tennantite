import type { ReactNode } from "react";

import type { ScreenSlot } from "../types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { gui } from "../../../lib/utils";
import { ScreenItemSlot } from "../screen-slot";

export interface FurnaceScreenProps {
  /**
  * 燃烧进度 0..1（火焰由下往上填满）
  */
  burnProgress?: number;
  className?: string;
  /**
  * 熔炼进度 0..1（箭头由左往右填满）
  */
  cookProgress?: number;
  /**
  * 燃料（下格）
  */
  fuel?: ScreenSlot;
  /**
  * 待熔炼物（上格）
  */
  input?: ScreenSlot;
  /**
  * 产物槽位点击
  */
  onTakeOutput?: () => void;
  /**
  * 产物（右侧 26×26 结果槽）
  */
  output?: ScreenSlot;
  title?: ReactNode;
}

/**
 * 熔炉界面（规格 §6）：输入 / 燃料 / 26×26 产物 + 火焰与箭头精灵裁剪进度。
 */
export function FurnaceScreen({
  burnProgress = 0,
  className,
  cookProgress = 0,
  fuel,
  input,
  onTakeOutput,
  output,
  title = "熔炉",
}: FurnaceScreenProps) {
  return (
    <ScreenPanel className={className} height={166} title={title} width={176}>
      <ScreenItemSlot item={input} label="furnace-input" left={55} top={16} />
      <ScreenItemSlot item={fuel} label="furnace-fuel" left={55} top={52} />
      <ScreenItemSlot
        item={output}
        label="furnace-output"
        left={111}
        onActivate={onTakeOutput}
        size={26}
        top={30}
      />
      <div
        aria-label="燃料燃烧进度"
        aria-valuemax={1}
        aria-valuemin={0}
        aria-valuenow={burnProgress}
        className="absolute overflow-hidden"
        role="progressbar"
        style={{ height: gui(14), left: gui(57), top: gui(36), width: gui(14) }}
      >
        <div
          className="mc-tex-flame size-full"
          style={{ clipPath: `inset(${(1 - burnProgress) * 100}% 0 0 0)` }}
        />
      </div>
      <div
        aria-label="熔炼进度"
        aria-valuemax={1}
        aria-valuemin={0}
        aria-valuenow={cookProgress}
        className="absolute overflow-hidden"
        role="progressbar"
        style={{ height: gui(16), left: gui(79), top: gui(34), width: gui(24) }}
      >
        <div
          className="mc-tex-arrow size-full"
          style={{ clipPath: `inset(0 ${(1 - cookProgress) * 100}% 0 0)` }}
        />
      </div>
      <PlayerInventory />
    </ScreenPanel>
  );
}
