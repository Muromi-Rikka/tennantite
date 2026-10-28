import type { ReactNode } from "react";

import type { ScreenSlot } from "@verdigris/ui";
import type { Ic2RedstoneMode } from "../ic2-types";

import {
  padSlots,
  PlayerInventory,
  ScreenItemSlot,
  ScreenPanel,
} from "@verdigris/ui";
import { Ic2EnergyGauge } from "../ic2-energy-gauge/index";
import { IC2_BATBOX } from "../ic2-layout";
import { Ic2Label } from "../ic2-label";
import { Ic2RedstoneButton } from "../ic2-redstone-button";
import { Ic2Title } from "../ic2-title";

export interface BatBoxScreenProps {
  /**
  * 装备槽（顺序 boots, leggings, chestplate, helmet；最多 4，不足补空）
  */
  armor?: ScreenSlot[];
  /**
  * 充电槽（放置待充电物品）
  */
  charge?: ScreenSlot;
  className?: string;
  /**
  * 放电槽（放置供能物品）
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
  /**
  * 输出功率（EU/t，默认 32）
  */
  output?: number;
  redstoneMode?: Ic2RedstoneMode;
  title?: ReactNode;
}

/**
 * 储电箱界面（1.12.2 原版贴图，BatBox）：176×196，4 个装备槽、
 * 充电 / 放电槽、红色 EU 横条、原版红石按钮与状态文字；底部接玩家背包。
 */
export function BatBoxScreen({
  armor,
  charge,
  className,
  discharge,
  energy,
  onRedstoneModeChange,
  output = 32,
  redstoneMode = "normal",
  title,
}: BatBoxScreenProps) {
  const armorSlots = padSlots(armor ?? [], IC2_BATBOX.slots.armor.count);
  return (
    <ScreenPanel
      backgroundClassName="mc-tex-ic2-batbox"
      className={className}
      height={IC2_BATBOX.height}
      width={IC2_BATBOX.width}
    >
      <Ic2Title>{title}</Ic2Title>
      {armorSlots.map((slot, index) => (
        <ScreenItemSlot
          ghostClassName={IC2_BATBOX.slots.armor.ghosts[index]}
          item={slot}
          // eslint-disable-next-line react/no-array-index-key -- 固定位置的装备槽，索引即槽位号
          key={`batbox-armor-${index}`}
          label={`batbox-armor-${index}`}
          left={IC2_BATBOX.slots.armor.left + index * IC2_BATBOX.slots.armor.step}
          top={IC2_BATBOX.slots.armor.top}
        />
      ))}
      <ScreenItemSlot
        item={charge}
        label="batbox-charge"
        left={IC2_BATBOX.slots.charge.left}
        top={IC2_BATBOX.slots.charge.top}
      />
      <ScreenItemSlot
        item={discharge}
        label="batbox-discharge"
        left={IC2_BATBOX.slots.discharge.left}
        top={IC2_BATBOX.slots.discharge.top}
      />
      <Ic2EnergyGauge
        label="EU 存储"
        left={IC2_BATBOX.energy.left}
        max={energy.max}
        tooltip
        top={IC2_BATBOX.energy.top}
        value={energy.value}
        variant={IC2_BATBOX.energy.variant}
      />
      <Ic2RedstoneButton
        left={IC2_BATBOX.button.left}
        mode={redstoneMode}
        onChange={onRedstoneModeChange}
        top={IC2_BATBOX.button.top}
      />
      <Ic2Label left={IC2_BATBOX.labels.level.left} top={IC2_BATBOX.labels.level.top}>
        能量:
      </Ic2Label>
      <Ic2Label left={IC2_BATBOX.labels.value.left} top={IC2_BATBOX.labels.value.top}>
        {` ${Math.floor(Math.min(energy.value, energy.max))}`}
      </Ic2Label>
      <Ic2Label left={IC2_BATBOX.labels.capacity.left} top={IC2_BATBOX.labels.capacity.top}>
        {`/${energy.max}`}
      </Ic2Label>
      <Ic2Label left={IC2_BATBOX.labels.output.left} top={IC2_BATBOX.labels.output.top}>
        {`输出: ${output} EU/t`}
      </Ic2Label>
      <Ic2Label left={IC2_BATBOX.labels.armor.left} top={IC2_BATBOX.labels.armor.top}>
        装备
      </Ic2Label>
      <PlayerInventory
        bare
        hotbarY={IC2_BATBOX.inventory.hotbarTop}
        x={IC2_BATBOX.inventory.left}
        y={IC2_BATBOX.inventory.top}
      />
    </ScreenPanel>
  );
}
