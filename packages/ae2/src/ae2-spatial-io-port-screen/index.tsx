import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSprite, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_SPATIAL_IO_PORT } from "../ae2-layout";
import { Ae2Text } from "../ae2-text/index";

export interface Ae2SpatialIoPortScreenProps {
  className?: string;
  /**
  * 空间区域尺寸文案（如 `3x4x3`，无效区域为“无效”）
  */
  efficiency?: ReactNode;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  input?: ScreenSlot;
  mainItems?: PlayerInventoryProps["mainItems"];
  maxPower?: ReactNode;
  onInputClick?: (item?: ScreenSlot) => void;
  onTakeOutput?: (item?: ScreenSlot) => void;
  output?: ScreenSlot;
  regionSize?: ReactNode;
  requiredPower?: ReactNode;
  selectedIndex?: number;
  storedPower?: ReactNode;
  title?: ReactNode;
}

/**
 * 空间 IO 端口界面（AE2 视觉复刻）：176×197 面板，槽框与玩家背包全部来自
 * AE2 `spatialio.png`；组件只叠加输入/输出元件槽热区与五行状态文字。
 * 版式与 AE2 1.12 `GuiSpatialIOPort` 一致（元件槽 (52,48)/(113,48)，
 * 状态文字 (13,21/31/73/83/93)）。
 */
export function Ae2SpatialIoPortScreen({
  className,
  efficiency = "0%",
  hotbarItems,
  input,
  mainItems,
  maxPower = "0 AE",
  onInputClick,
  onTakeOutput,
  output,
  regionSize = "无效",
  requiredPower = "0 AE",
  selectedIndex,
  storedPower = "0 AE",
  title = "空间 IO 端口",
}: Ae2SpatialIoPortScreenProps) {
  const {
    efficiency: efficiencyPos,
    height,
    input: inputSlot,
    maxPower: maxPowerPos,
    output: outputSlot,
    player,
    regionSize: regionSizePos,
    requiredPower: requiredPowerPos,
    sprite,
    storedPower: storedPowerPos,
    width,
  } = AE2_SPATIAL_IO_PORT;

  return (
    <div className={cn("relative inline-block", className)}>
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={height}
          left={0}
          sprite={ae2SpriteMeta[sprite]}
          src={{ height, width, x: 0, y: 0 }}
          top={0}
        />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <StatusText left={storedPowerPos.left} top={storedPowerPos.top}>
          {`已存电力: ${storedPower}`}
        </StatusText>
        <StatusText left={maxPowerPos.left} top={maxPowerPos.top}>
          {`最大电力: ${maxPower}`}
        </StatusText>
        <StatusText left={requiredPowerPos.left} top={requiredPowerPos.top}>
          {`所需电力: ${requiredPower}`}
        </StatusText>
        <StatusText left={efficiencyPos.left} top={efficiencyPos.top}>
          {`效率: ${efficiency}`}
        </StatusText>
        <StatusText left={regionSizePos.left} top={regionSizePos.top}>
          {`空间区域大小: ${regionSize}`}
        </StatusText>
        <ScreenItemSlot
          frame={false}
          item={input}
          label="spatial-io-input"
          left={inputSlot.left}
          onActivate={onInputClick ? () => onInputClick(input) : undefined}
          size={inputSlot.size}
          top={inputSlot.top}
        />
        <ScreenItemSlot
          frame={false}
          item={output}
          label="spatial-io-output"
          left={outputSlot.left}
          onActivate={onTakeOutput ? () => onTakeOutput(output) : undefined}
          size={outputSlot.size}
          top={outputSlot.top}
        />
        <ModTitle left={8} top={player.titleTop}>物品栏</ModTitle>
        <PlayerInventory
          bare
          hotbarItems={hotbarItems}
          hotbarY={player.hotbarTop}
          mainItems={mainItems}
          selectedIndex={selectedIndex}
          x={7}
          y={player.mainTop}
        />
      </ScreenPanel>
    </div>
  );
}

function StatusText({ children, left, top }: { children: ReactNode; left: number; top: number }) {
  return <Ae2Text left={left} top={top}>{children}</Ae2Text>;
}
