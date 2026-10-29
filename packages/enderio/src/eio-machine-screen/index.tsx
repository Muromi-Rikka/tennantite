import type { EioSpriteName } from "@tennantite/textures";
import type { ReactNode } from "react";
import { gui, PlayerInventory, ScreenPanel } from "@tennantite/ui";

import type { EioMachineKey } from "../eio-machine-layout";
import { EIO_TEXT_COLOR } from "../eio-metrics";
import { EioSprite } from "../eio-sprite/index";

export interface EioMachineScreenProps {
  background: EioSpriteName;
  /**
   * 背景贴图可见高度（电容组 166，其余等于 height）
   */
  backgroundHeight: number;
  children?: ReactNode;
  className?: string;
  height: number;
  /**
   * 背包标题（默认「物品栏」）
   */
  inventoryLabel?: ReactNode;
  labels?: { inventoryTop: number; titleTop: number };
  machine: EioMachineKey;
  player: { hotbarY: number; left: number; top: number };
  title?: ReactNode;
  width: number;
}

/**
 * Ender IO 机器界面基座：整幅背景贴图（左上角裁剪）+ 居中标题 /
 * 背包标签 + 玩家背包。槽位 / 进度 / 能量由子组件注入。
 */
export function EioMachineScreen({
  background,
  backgroundHeight,
  children,
  className,
  height,
  inventoryLabel = "物品栏",
  labels,
  machine,
  player,
  title,
  width,
}: EioMachineScreenProps) {
  return (
    <ScreenPanel
      backgroundClassName="bg-transparent"
      className={className}
      data-eio-machine={machine}
      height={height}
      width={width}
    >
      <EioSprite
        crop={{ height: backgroundHeight, width, x: 0, y: 0 }}
        height={backgroundHeight}
        name={background}
        width={width}
      />
      {labels
        ? (
            <>
              <span
                className="absolute font-mc mc-text whitespace-pre"
                style={{
                  color: EIO_TEXT_COLOR,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  top: gui(labels.titleTop),
                }}
              >
                {title}
              </span>
              <span
                className="absolute font-mc mc-text whitespace-pre"
                style={{ color: EIO_TEXT_COLOR, left: gui(8), top: gui(labels.inventoryTop) }}
              >
                {inventoryLabel}
              </span>
            </>
          )
        : null}
      {children}
      <PlayerInventory
        bare
        hotbarY={player.hotbarY}
        x={player.left}
        y={player.top}
      />
    </ScreenPanel>
  );
}
