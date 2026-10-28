import type { ReactNode } from "react";

import type { ScreenSlot } from "../../containers/types";
import type { Ic2RedstoneMode } from "../ic2-types";

import { PlayerInventory } from "../../../containers/player-inventory/index";
import { ScreenPanel } from "../../../containers/screen-panel/index";
import { ScreenItemSlot } from "../../containers/screen-slot";
import { EuBar } from "../eu-bar/index";
import { Ic2BoltIcon, Ic2Progress, Ic2RedstoneButton } from "../ic2-parts";

export interface Ic2MachineScreenProps {
  /**
  * 背景纹理类（默认 IC2 通用机器背景，多台机器共用一张）
  */
  backgroundClassName?: string;
  /**
  * 电池 / 充电槽（可选，渲染在右上角）
  */
  battery?: ScreenSlot;
  /**
  * 额外槽位（如升级槽），由使用方绝对定位
  */
  children?: ReactNode;
  className?: string;
  /**
  * EU 能量状态（省略时不渲染能量槽）
  */
  energy?: { max: number; value: number };
  input?: ScreenSlot;
  /**
  * 红石模式切换回调；省略时按钮为纯展示
  */
  onRedstoneModeChange?: (mode: Ic2RedstoneMode) => void;
  /**
  * 产物槽点击回调
  */
  onTakeOutput?: () => void;
  output?: ScreenSlot;
  /**
  * 机器处理进度 0..1（纵向箭头白色填充）
  */
  progress?: number;
  redstoneMode?: Ic2RedstoneMode;
  title?: ReactNode;
}

/**
 * IC2 机器界面共享布局（工业时代 2 视觉复刻）：176×166，多台机器共用一张默认
 * 机器背景（IC2 惯例），槽框由 `ScreenItemSlot frame` 自绘。经典布局：
 * 左侧 EU 能量槽 (26,25) 14×48 + 闪电图标，中列输入 (81,15) → 纵向箭头 → 输出 (81,65)，
 * 右上电池槽，右下红石模式按钮；底部接玩家背包。
 */
export function Ic2MachineScreen({
  backgroundClassName = "mc-tex-ic2-machine",
  battery,
  children,
  className,
  energy,
  input,
  onRedstoneModeChange,
  onTakeOutput,
  output,
  progress = 0,
  redstoneMode = "normal",
  title,
}: Ic2MachineScreenProps) {
  return (
    <ScreenPanel
      backgroundClassName={backgroundClassName}
      className={className}
      height={166}
      title={title}
      width={176}
    >
      {energy
        ? (
            <>
              <EuBar
                height={48}
                label="EU 能量"
                left={26}
                max={energy.max}
                tooltip
                top={25}
                value={energy.value}
                width={14}
              />
              <Ic2BoltIcon left={17} top={44} />
            </>
          )
        : null}
      <ScreenItemSlot frame item={input} label="machine-input" left={81} top={15} />
      {battery
        ? <ScreenItemSlot frame item={battery} label="machine-battery" left={143} top={15} />
        : null}
      <ScreenItemSlot
        frame
        item={output}
        label="machine-output"
        left={81}
        onActivate={onTakeOutput}
        top={65}
      />
      <Ic2Progress
        direction="down"
        height={24}
        label="处理进度"
        left={83}
        progress={progress}
        top={37}
        width={13}
      />
      <Ic2RedstoneButton
        left={148}
        mode={redstoneMode}
        onChange={onRedstoneModeChange}
        top={57}
      />
      {children}
      <PlayerInventory />
    </ScreenPanel>
  );
}
