import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSlotGrid, ModSprite, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_GRINDSTONE } from "../ae2-layout";

export interface Ae2GrindstoneScreenProps {
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onOreSlotClick?: (index: number, item?: ScreenSlot) => void;
  onTakeOutput?: (index: number, item?: ScreenSlot) => void;
  ores?: ScreenSlot[];
  outputs?: ScreenSlot[];
  selectedIndex?: number;
  title?: ReactNode;
}

/**
 * 磨石界面（AE2 视觉复刻）：176×176 面板，槽框与玩家背包全部来自
 * AE2 `grinder.png`；组件只叠加交互热区。
 * 版式与 AE2 1.12 `GuiGrinder` 一致：矿石槽 3 格 (12,17)、中央杵槽
 * (80,40)（`SlotInaccessible`，仅展示）、产物槽 3 格 (112,63)。
 */
export function Ae2GrindstoneScreen({
  className,
  hotbarItems,
  mainItems,
  onOreSlotClick,
  onTakeOutput,
  ores,
  outputs,
  selectedIndex,
  title = "磨石",
}: Ae2GrindstoneScreenProps) {
  const { height, ores: oreRow, outputs: outputRow, pestle, player, sprite, width } = AE2_GRINDSTONE;

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
        <ModSlotGrid
          cellSize={oreRow.size}
          columns={oreRow.columns}
          frame={false}
          items={ores}
          label={(index) => `grindstone-ore-${index}`}
          left={oreRow.left}
          onSlotClick={onOreSlotClick}
          rows={1}
          top={oreRow.top}
        />
        <ScreenItemSlot
          frame={false}
          item={undefined}
          label="grindstone-pestle"
          left={pestle.left}
          size={pestle.size}
          top={pestle.top}
        />
        <ModSlotGrid
          cellSize={outputRow.size}
          columns={outputRow.columns}
          frame={false}
          items={outputs}
          label={(index) => `grindstone-output-${index}`}
          left={outputRow.left}
          onSlotClick={onTakeOutput}
          rows={1}
          top={outputRow.top}
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
