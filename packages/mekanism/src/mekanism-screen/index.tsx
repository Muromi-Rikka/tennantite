import type { ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { cn, gui } from "@tennantite/ui";

import { MekanismLabel } from "../mekanism-label/index";
import { MekanismPlayerInventory } from "../mekanism-player-inventory/index";
import { MekanismSprite } from "../mekanism-sprite/index";
import { MekanismTitle } from "../mekanism-title/index";

export interface MekanismScreenProps {
  children?: ReactNode;
  className?: string;
  height: number;
  inventoryLabel?: null | {
    end?: number;
    right?: ReactNode;
    text?: ReactNode;
    x: number;
    y: number;
  };
  playerInventory?: null | {
    hotbarItems?: ScreenSlot[];
    hotbarY: number;
    mainItems?: ScreenSlot[];
    onSlotClick?: (area: "hotbar" | "main", index: number) => void;
    x: number;
    y: number;
  };
  tabs?: ReactNode;
  title?: ReactNode;
  titleEnd?: number;
  titleX?: number;
  titleY?: number;
  width: number;
  windows?: ReactNode;
}

/**
 * Mekanism 面板基座：base 九宫格 + 标题 + 背包标签 + 玩家背包 + 两侧标签/窗口层。
 */
export function MekanismScreen({
  children,
  className,
  height,
  inventoryLabel,
  playerInventory,
  tabs,
  title,
  titleEnd,
  titleX = 4,
  titleY = 6,
  width,
  windows,
}: MekanismScreenProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ height: gui(height), width: gui(width) }}
    >
      <MekanismSprite height={height} name="base" width={width} />
      <div className="absolute inset-0">
        {title === undefined
          ? null
          : (
              <MekanismTitle titleEnd={titleEnd} titleX={titleX} top={titleY}>
                {title}
              </MekanismTitle>
            )}
        {inventoryLabel
          ? (
              <>
                <MekanismLabel left={inventoryLabel.x} top={inventoryLabel.y}>
                  {inventoryLabel.text ?? "背包"}
                </MekanismLabel>
                {inventoryLabel.right
                  ? (
                      <MekanismLabel
                        className="-translate-x-full"
                        left={inventoryLabel.end ?? width - 8}
                        top={inventoryLabel.y}
                      >
                        {inventoryLabel.right}
                      </MekanismLabel>
                    )
                  : null}
              </>
            )
          : null}
        {children}
        {playerInventory
          ? (
              <MekanismPlayerInventory
                hotbarItems={playerInventory.hotbarItems}
                hotbarY={playerInventory.hotbarY}
                mainItems={playerInventory.mainItems}
                onSlotClick={playerInventory.onSlotClick}
                x={playerInventory.x}
                y={playerInventory.y}
              />
            )
          : null}
      </div>
      {tabs}
      {windows}
    </div>
  );
}
