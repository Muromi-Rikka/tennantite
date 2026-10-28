import type { ReactNode } from "react";

import type { ScreenSlot } from "../../containers/types";
import { cn, gui } from "../../../lib/utils";
import { MekanismLabel, MekanismTitle } from "../mekanism-parts/index";
import { MekanismSlot } from "../mekanism-slot/index";
import { MekanismSprite } from "../mekanism-sprite/index";

export interface MekanismPlayerInventoryProps {
  className?: string;
  hotbarItems?: ScreenSlot[];
  hotbarY: number;
  mainItems?: ScreenSlot[];
  onSlotClick?: (area: "hotbar" | "main", index: number) => void;
  x: number;
  y: number;
}

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
 * Mekanism 玩家背包：3×9 主背包 + 1×9 快捷栏，使用 Mekanism 槽框。
 */
export function MekanismPlayerInventory({
  className,
  hotbarItems,
  hotbarY,
  mainItems,
  onSlotClick,
  x,
  y,
}: MekanismPlayerInventoryProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {Array.from({ length: 27 }, (_, index) => {
        const column = index % 9;
        const row = Math.floor(index / 9);
        return (
          <MekanismSlot
            item={mainItems?.[index] ?? null}
            key={`main-${index}`}
            label={`main-${index}`}
            left={x + column * 18}
            onActivate={onSlotClick ? () => onSlotClick("main", index) : undefined}
            top={y + row * 18}
            type="normal"
          />
        );
      })}
      {Array.from({ length: 9 }, (_, index) => (
        <MekanismSlot
          item={hotbarItems?.[index] ?? null}
          key={`hotbar-${index}`}
          label={`hotbar-${index}`}
          left={x + index * 18}
          onActivate={onSlotClick ? () => onSlotClick("hotbar", index) : undefined}
          top={hotbarY}
          type="normal"
        />
      ))}
    </div>
  );
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
