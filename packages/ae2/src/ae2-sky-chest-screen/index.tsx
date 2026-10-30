import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSprite, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_SKY_CHEST } from "../ae2-layout";

export interface Ae2SkyChestScreenProps {
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onSlotClick?: (index: number, item?: ScreenSlot) => void;
  selectedIndex?: number;
  title?: ReactNode;
}

const STORAGE_SLOTS = 36;

/**
 * ME 天空石箱界面（AE2 视觉复刻）：176×195 面板，槽框与玩家背包全部来自
 * AE2 `skychest.png`；组件只叠加 36 格存储的交互热区。
 * 版式与 AE2 1.12 `GuiSkyChest` 一致（ySize 195，(8,24) 起 9 列 ×4 行）。
 */
export function Ae2SkyChestScreen({
  className,
  hotbarItems,
  mainItems,
  onSlotClick,
  selectedIndex,
  title = "ME 天空石箱",
}: Ae2SkyChestScreenProps) {
  const { height, player, sprite, storage, title: titlePos, width } = AE2_SKY_CHEST;
  const slots = Array.from({ length: STORAGE_SLOTS }, (_, index) => {
    const column = index % storage.columns;
    const row = Math.floor(index / storage.columns);
    return {
      item: undefined as ScreenSlot | undefined,
      left: storage.left + column * storage.size,
      top: storage.top + row * storage.size,
    };
  });

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
        <ModTitle left={titlePos.left} top={titlePos.top}>{title}</ModTitle>
        {Array.from(slots, (slot, index) => (
          <ScreenItemSlot
            frame={false}
            item={slot.item}
            key={`skychest-${index}`}
            label={`skychest-${index}`}
            left={slot.left}
            onActivate={onSlotClick ? () => onSlotClick(index, slot.item) : undefined}
            size={storage.size}
            top={slot.top}
          />
        ))}
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
