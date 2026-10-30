import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import {
  PlayerInventory,
  ScreenItemSlot,
  ScreenPanel,
} from "@tennantite/ui";

import type { Ic2ProgressStyle } from "../ic2-types";
import { Ic2EnergyGauge } from "../ic2-energy-gauge/index";
import { Ic2InfoIcon } from "../ic2-info-icon";
import { Ic2Label } from "../ic2-label";
import { IC2_MACHINE } from "../ic2-layout";
import { Ic2Progress } from "../ic2-progress";
import { Ic2Title } from "../ic2-title";
import { Ic2UpgradeStrip } from "../ic2-upgrade-strip";

export interface Ic2MachineScreenProps {
  /**
  * 背景纹理类（默认 IC2 通用机器背景，多台机器共用一张）
  */
  backgroundClassName?: string;
  /**
  * 额外槽位（由使用方绝对定位）
  */
  children?: ReactNode;
  className?: string;
  /**
  * 放电槽（扳手取下电池）；`hideDischarge` 时整块槽位不渲染
  */
  discharge?: ScreenSlot;
  /**
  * 放电槽位置（默认 IC2_MACHINE）
  */
  dischargePosition?: { left: number; top: number };
  /**
  * EU 能量状态（省略时不渲染 EU 闪电）
  */
  energy?: { max: number; value: number };
  /**
  * 能量表位置（默认 IC2_MACHINE；金属成型机等偏离通用布局的机器用）
  */
  energyPosition?: { left: number; top: number };
  /**
  * 隐藏放电槽（燃料槽机器改由 children 自行落位）
  */
  hideDischarge?: boolean;
  input?: ScreenSlot;
  /**
  * 输入槽位置（默认 IC2_MACHINE）
  */
  inputPosition?: { left: number; top: number };
  /**
  * 产物槽点击回调
  */
  onTakeOutput?: () => void;
  output?: ScreenSlot;
  /**
  * 玩家名（默认“玩家”，渲染在背包上方）
  */
  playerName?: ReactNode;
  progress?: number;
  /**
  * 进度填充原点（默认 IC2_MACHINE.progress[progressStyle]）
  */
  progressPosition?: { left: number; top: number };
  /**
  * 进度贴图：磨矿机 crush / 电炉 arrow / 压缩机 triangle / 提取机 drop
  */
  progressStyle: Ic2ProgressStyle;
  title?: ReactNode;
  /**
  * 升级槽（最多 4，不足补 null）
  */
  upgrades?: ScreenSlot[];
}

/**
 * IC2 机器界面共享布局（1.12.2 原版贴图）：176×166，左上信息图标、
 * 输入 / 放电 / 26×26 产物槽、右侧 4 个升级槽、红色 EU 闪电、进度条与玩家背包。
 */
export function Ic2MachineScreen({
  backgroundClassName = "mc-tex-ic2-machine",
  children,
  className,
  discharge,
  dischargePosition,
  energy,
  energyPosition,
  hideDischarge = false,
  input,
  inputPosition,
  onTakeOutput,
  output,
  playerName = "玩家",
  progress = 0,
  progressPosition,
  progressStyle,
  title,
  upgrades = [],
}: Ic2MachineScreenProps) {
  const defaultProgressPosition = IC2_MACHINE.progress[progressStyle];
  const inputLeft = inputPosition?.left ?? IC2_MACHINE.slots.input.left;
  const inputTop = inputPosition?.top ?? IC2_MACHINE.slots.input.top;
  const dischargeLeft = dischargePosition?.left ?? IC2_MACHINE.slots.discharge.left;
  const dischargeTop = dischargePosition?.top ?? IC2_MACHINE.slots.discharge.top;
  return (
    <ScreenPanel
      backgroundClassName={backgroundClassName}
      className={className}
      height={IC2_MACHINE.height}
      width={IC2_MACHINE.width}
    >
      <Ic2InfoIcon left={IC2_MACHINE.info.left} top={IC2_MACHINE.info.top} />
      <Ic2Title>{title}</Ic2Title>
      <Ic2Label left={IC2_MACHINE.inventory.nameLeft} top={IC2_MACHINE.inventory.nameTop}>
        {playerName}
      </Ic2Label>
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot"
        item={input}
        label="machine-input"
        left={inputLeft}
        top={inputTop}
      />
      {hideDischarge
        ? null
        : (
            <ScreenItemSlot
              frame
              frameClassName="mc-tex-ic2-slot"
              item={discharge}
              label="machine-discharge"
              left={dischargeLeft}
              top={dischargeTop}
            />
          )}
      <ScreenItemSlot
        frame
        frameClassName="mc-tex-ic2-slot-large"
        item={output}
        label="machine-output"
        left={IC2_MACHINE.slots.output.left}
        onActivate={onTakeOutput}
        size={IC2_MACHINE.slots.output.size}
        top={IC2_MACHINE.slots.output.top}
      />
      <Ic2UpgradeStrip upgrades={upgrades} />
      {energy
        ? (
            <Ic2EnergyGauge
              label="EU 能量"
              left={energyPosition?.left ?? IC2_MACHINE.energy.left}
              max={energy.max}
              tooltip
              top={energyPosition?.top ?? IC2_MACHINE.energy.top}
              value={energy.value}
              variant={IC2_MACHINE.energy.variant}
            />
          )
        : null}
      <Ic2Progress
        label="处理进度"
        left={progressPosition?.left ?? defaultProgressPosition.left}
        progress={progress}
        style={progressStyle}
        top={progressPosition?.top ?? defaultProgressPosition.top}
      />
      {children}
      <PlayerInventory
        frameClassName="mc-tex-ic2-slot"
        hotbarY={IC2_MACHINE.inventory.hotbarTop}
        x={IC2_MACHINE.inventory.left}
        y={IC2_MACHINE.inventory.top}
      />
    </ScreenPanel>
  );
}
