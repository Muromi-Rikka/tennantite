import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import {
  PlayerInventory,
  ScreenItemSlot,
  ScreenPanel,
} from "@tennantite/ui";

import { Ic2EnergyGauge } from "../ic2-energy-gauge/index";
import { Ic2InfoIcon } from "../ic2-info-icon";
import { Ic2Label } from "../ic2-label";
import { IC2_INDUSTRIAL_FURNACE } from "../ic2-layout";
import { Ic2Progress } from "../ic2-progress";
import { Ic2Title } from "../ic2-title";
import { Ic2UpgradeStrip } from "../ic2-upgrade-strip";

export interface InductionFurnaceScreenProps {
  className?: string;
  /**
   * 放电槽（扳手取下电池）
   */
  discharge?: ScreenSlot;
  /**
   * EU 能量状态
   */
  energy: { max: number; value: number };
  /**
   * 热量（XML `%base.getHeat()%`，0..100）
   */
  heat?: number;
  inputA?: ScreenSlot;
  inputB?: ScreenSlot;
  /**
   * 产物槽点击回调
   */
  onTakeOutputA?: () => void;
  onTakeOutputB?: () => void;
  outputA?: ScreenSlot;
  outputB?: ScreenSlot;
  /**
   * 玩家名（默认“玩家”）
   */
  playerName?: ReactNode;
  /**
   * 处理进度 0..1
   */
  progress?: number;
  title?: ReactNode;
  /**
   * 升级槽（最多 4，不足补 null）
   */
  upgrades?: ScreenSlot[];
}

/**
 * 感应炉界面（1.12.2 原版贴图，`guidef/induction_furnace.xml`）：双输入 /
 * 双产物无框槽位（上游 `textures/gui/overlay/induction_furnace_*` 底板未同步，
 * 以裸槽位呈现）、左侧热量文字、放电槽、4 个升级槽、红色 EU 闪电与熔炼箭头进度。
 */
export function InductionFurnaceScreen({
  className,
  discharge,
  energy,
  heat = 0,
  inputA,
  inputB,
  onTakeOutputA,
  onTakeOutputB,
  outputA,
  outputB,
  playerName = "玩家",
  progress = 0,
  title,
  upgrades = [],
}: InductionFurnaceScreenProps) {
  const slots = IC2_INDUSTRIAL_FURNACE.slots;
  return (
    <ScreenPanel
      backgroundClassName="mc-tex-ic2-machine"
      className={className}
      height={IC2_INDUSTRIAL_FURNACE.height}
      width={IC2_INDUSTRIAL_FURNACE.width}
    >
      <Ic2InfoIcon left={3} top={3} />
      <Ic2Title>{title}</Ic2Title>
      <Ic2Label left={8} top={73}>
        {playerName}
      </Ic2Label>
      <Ic2Label left={IC2_INDUSTRIAL_FURNACE.heat.label.left} top={IC2_INDUSTRIAL_FURNACE.heat.label.top}>
        热量:
      </Ic2Label>
      <Ic2Label left={IC2_INDUSTRIAL_FURNACE.heat.value.left} top={IC2_INDUSTRIAL_FURNACE.heat.value.top}>
        {` ${heat}`}
      </Ic2Label>
      <ScreenItemSlot
        item={inputA}
        label="machine-input-a"
        left={slots.inputA.left}
        top={slots.inputA.top}
      />
      <ScreenItemSlot
        item={inputB}
        label="machine-input-b"
        left={slots.inputB.left}
        top={slots.inputB.top}
      />
      <ScreenItemSlot
        item={outputA}
        label="machine-output-a"
        left={slots.outputA.left}
        onActivate={onTakeOutputA}
        top={slots.outputA.top}
      />
      <ScreenItemSlot
        item={outputB}
        label="machine-output-b"
        left={slots.outputB.left}
        onActivate={onTakeOutputB}
        top={slots.outputB.top}
      />
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot"
        item={discharge}
        label="machine-discharge"
        left={slots.discharge.left}
        top={slots.discharge.top}
      />
      <Ic2UpgradeStrip
        position={{ left: slots.upgrades.left, top: slots.upgrades.top }}
        upgrades={upgrades}
      />
      <Ic2EnergyGauge
        label="EU 能量"
        left={55}
        max={energy.max}
        tooltip
        top={37}
        value={energy.value}
      />
      <Ic2Progress
        label="处理进度"
        left={IC2_INDUSTRIAL_FURNACE.progress.arrow.left}
        progress={progress}
        style="arrow"
        top={IC2_INDUSTRIAL_FURNACE.progress.arrow.top}
      />
      <PlayerInventory
        frameClassName="mc-tex-ic2-slot"
        hotbarY={IC2_INDUSTRIAL_FURNACE.inventory.hotbarTop}
        x={IC2_INDUSTRIAL_FURNACE.inventory.left}
        y={IC2_INDUSTRIAL_FURNACE.inventory.top}
      />
    </ScreenPanel>
  );
}
