import type { IeSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";

import { PlayerInventory, ScreenPanel } from "@tennantite/ui";

import { IeLabel } from "../ie-label/index";
import { IeSprite } from "../ie-sprite/index";

export interface IeMachineScreenProps {
  /**
   * 背景贴图；省略时由调用方自绘（上游无独立 GUI 纹理的重建屏）
   */
  background?: IeSpriteName;
  children?: ReactNode;
  className?: string;
  height: number;
  /**
   * 背包标题（默认「物品栏」）
   */
  inventoryLabel?: ReactNode;
  inventoryLabelTop: number;
  player: { hotbarY: number; left: number; top: number };
  /**
   * 玩家背包是否绘制原版槽框；上游贴图已烘焙槽位，默认不画（重建屏需开启）
   */
  playerFrames?: boolean;
  title: ReactNode;
  width: number;
}

/**
 * IE 机器界面基座（`IEContainerScreen`）：整幅背景贴图 + 橙色标题 (8,6)
 * + 橙色背包标题（imageHeight - 91）+ 玩家背包。槽位/进度/能量由子组件注入。
 */
export function IeMachineScreen({
  background,
  children,
  className,
  height,
  inventoryLabel = "物品栏",
  inventoryLabelTop,
  player,
  playerFrames = false,
  title,
  width,
}: IeMachineScreenProps) {
  return (
    <ScreenPanel
      backgroundClassName={background ? "bg-transparent" : undefined}
      className={className}
      height={height}
      width={width}
    >
      {background
        ? (
            <IeSprite
              height={height}
              left={0}
              name={background}
              src={{ height, width, x: 0, y: 0 }}
              top={0}
              width={width}
            />
          )
        : null}
      <IeLabel left={8} top={6}>{title}</IeLabel>
      <IeLabel left={8} top={inventoryLabelTop}>{inventoryLabel}</IeLabel>
      {children}
      <PlayerInventory
        bare={!playerFrames}
        hotbarY={player.hotbarY}
        x={player.left}
        y={player.top}
      />
    </ScreenPanel>
  );
}
