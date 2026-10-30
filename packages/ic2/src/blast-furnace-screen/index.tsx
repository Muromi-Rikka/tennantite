import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import {
  padSlots,
  PlayerInventory,
  ScreenItemSlot,
  ScreenPanel,
} from "@tennantite/ui";

import { Ic2HeatGauge } from "../ic2-heat-gauge";
import { Ic2InfoIcon } from "../ic2-info-icon";
import { Ic2Label } from "../ic2-label";
import { IC2_BLAST_FURNACE } from "../ic2-layout";
import { Ic2Progress } from "../ic2-progress";
import { Ic2Title } from "../ic2-title";
import { Ic2UpgradeStrip } from "../ic2-upgrade-strip";

const EMPTY_OUTPUTS: ScreenSlot[] = [];
const EMPTY_UPGRADES: ScreenSlot[] = [];

export interface Ic2BlastFurnaceScreenProps {
  /**
   * 压缩空气槽（进气口，万用流体单元）
   */
  cellInput?: ScreenSlot;
  /**
   * 排气槽（用尽的流体单元）
   */
  cellOutput?: ScreenSlot;
  className?: string;
  /**
   * 热量 0..1（gauge style `heatcentrifuge`，自下而上填充）
   */
  heat?: number;
  input?: ScreenSlot;
  /**
   * 产物槽（2 个，`slotgrid` rows=2）
   */
  outputs?: ScreenSlot[];
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
 * 高炉界面（1.12.2 原版贴图，`guidef/blast_furnace.xml`）：多方块工业高炉的
 * 176×166 控制面板 —— 输入 / 双产物槽、压缩空气进出槽、流体槽（上游流体槽
 * 底板未同步，以裸槽位呈现）、左侧热量竖条、熔炼箭头进度与 4 个升级槽。
 */
export function Ic2BlastFurnaceScreen({
  cellInput,
  cellOutput,
  className,
  heat = 0,
  input,
  outputs = EMPTY_OUTPUTS,
  playerName = "玩家",
  progress = 0,
  title,
  upgrades = EMPTY_UPGRADES,
}: Ic2BlastFurnaceScreenProps) {
  const slots = IC2_BLAST_FURNACE.slots;
  const ratio = Math.min(1, Math.max(0, heat));
  return (
    <ScreenPanel
      backgroundClassName="mc-tex-ic2-machine"
      className={className}
      height={IC2_BLAST_FURNACE.height}
      width={IC2_BLAST_FURNACE.width}
    >
      <Ic2InfoIcon left={3} top={3} />
      <Ic2Title>{title}</Ic2Title>
      <Ic2Label left={8} top={73}>
        {playerName}
      </Ic2Label>
      <Ic2Label left={IC2_BLAST_FURNACE.heat.label.left} top={IC2_BLAST_FURNACE.heat.label.top}>
        Heat
      </Ic2Label>
      <Ic2HeatGauge
        label="热量"
        left={IC2_BLAST_FURNACE.heat.gauge.left}
        max={100}
        top={IC2_BLAST_FURNACE.heat.gauge.top}
        value={Math.round(ratio * 100)}
      />
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot"
        item={input}
        label="machine-input"
        left={slots.input.left}
        top={slots.input.top}
      />
      {padSlots(outputs, slots.outputs.count).map((slot, index) => (
        // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
        <ScreenItemSlot
          frame
          frameClassName="mc-tex-ic2-slot"
          item={slot}
          // eslint-disable-next-line react/no-array-index-key -- 固定位置的产物槽，索引即槽位号
          key={`machine-output-${index}`}
          label={`machine-output-${index}`}
          left={slots.outputs.left}
          top={slots.outputs.top + index * slots.outputs.step}
        />
      ))}
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot"
        item={cellInput}
        label="machine-cell-input"
        left={slots.cellInput.left}
        top={slots.cellInput.top}
      />
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot"
        item={cellOutput}
        label="machine-cell-output"
        left={slots.cellOutput.left}
        top={slots.cellOutput.top}
      />
      <ScreenItemSlot
        item={null}
        label="machine-fluid"
        left={slots.fluid.left}
        top={slots.fluid.top}
      />
      <Ic2UpgradeStrip upgrades={upgrades} />
      <Ic2Progress
        label="处理进度"
        left={IC2_BLAST_FURNACE.progress.arrow.left}
        progress={progress}
        style="arrow"
        top={IC2_BLAST_FURNACE.progress.arrow.top}
      />
      <PlayerInventory
        frameClassName="mc-tex-ic2-slot"
        hotbarY={IC2_BLAST_FURNACE.inventory.hotbarTop}
        x={IC2_BLAST_FURNACE.inventory.left}
        y={IC2_BLAST_FURNACE.inventory.top}
      />
    </ScreenPanel>
  );
}
