import type { ReactNode } from "react";

import type { ScreenSlot } from "../../containers/types";
import type { Ic2RedstoneMode } from "../ic2-types";
import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { ScreenItemSlot } from "../../containers/screen-slot";
import { EuBar } from "../eu-bar/index";
import { Ic2BoltIcon, Ic2ChargeMarker, Ic2RedstoneButton } from "../ic2-parts";

export interface BatBoxScreenProps {
  /**
  * 充电槽（放置待充电物品，"+" 标记）
  */
  charge?: ScreenSlot;
  className?: string;
  /**
  * 放电槽（放置供能物品，"−" 标记）
  */
  discharge?: ScreenSlot;
  /**
  * EU 存储状态
  */
  energy: { max: number; value: number };
  /**
  * 红石模式切换回调；省略时按钮为纯展示
  */
  onRedstoneModeChange?: (mode: Ic2RedstoneMode) => void;
  redstoneMode?: Ic2RedstoneMode;
  title?: ReactNode;
}

/**
 * 储电箱界面（工业时代 2 视觉复刻，BatBox）：176×166，左侧大号 EU 能量槽，
 * 右侧充电（+）/ 放电（−）槽位与红石模式按钮；底部接玩家背包。
 */
export function BatBoxScreen({
  charge,
  className,
  discharge,
  energy,
  onRedstoneModeChange,
  redstoneMode = "normal",
  title,
}: BatBoxScreenProps) {
  return (
    <ScreenPanel
      backgroundClassName="mc-tex-ic2-machine-batbox"
      className={className}
      height={166}
      title={title}
      width={176}
    >
      <EuBar
        height={62}
        label="EU 存储"
        left={26}
        max={energy.max}
        tooltip
        top={15}
        value={energy.value}
        width={14}
      />
      <Ic2BoltIcon left={17} top={42} />
      <Ic2ChargeMarker kind="plus" left={99} top={20} />
      <ScreenItemSlot frame item={charge} label="batbox-charge" left={121} top={15} />
      <Ic2ChargeMarker kind="minus" left={99} top={56} />
      <ScreenItemSlot frame item={discharge} label="batbox-discharge" left={121} top={51} />
      <Ic2RedstoneButton
        left={148}
        mode={redstoneMode}
        onChange={onRedstoneModeChange}
        top={57}
      />
      <PlayerInventory />
    </ScreenPanel>
  );
}
