import type { ReactNode } from "react";
import { ae2SpriteMeta } from "@tennantite/textures";

import type { PlayerInventoryProps } from "@tennantite/ui";
import type { ScreenSlot } from "@tennantite/ui";
import { PlayerInventory } from "@tennantite/ui";
import { ScreenPanel } from "@tennantite/ui";
import { cn } from "@tennantite/ui";
import { ScreenItemSlot } from "@tennantite/ui";
import { padSlots } from "@tennantite/ui";
import { AE2_INSCRIBER } from "../ae2-layout";
import { ModProgress, ModSprite, ModTitle } from "@tennantite/mods-core";

export interface Ae2InscriberScreenProps {
  bottomPlate?: ScreenSlot;
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  input?: ScreenSlot;
  mainItems?: PlayerInventoryProps["mainItems"];
  onTakeOutput?: () => void;
  onUpgradeSlotClick?: (index: number, item: ScreenSlot) => void;
  output?: ScreenSlot;
  /**
  * 压印进度 0..1
  */
  progress?: number;
  selectedIndex?: number;
  title?: ReactNode;
  topPlate?: ScreenSlot;
  /**
  * 右侧升级槽（3 格，行优先）
  */
  upgrades?: ScreenSlot[];
}

/**
 * 压印器界面（AE2 视觉复刻）：177×176 面板 + 右侧 35 px 升级槽条。
 *
 * 面板、上/中/下压印槽、26×26 输出槽、连接箭头、进度条轨道与玩家背包全部来自
 * AE2 `inscriber.png`；进度填充取自贴图内的 6×18 渐变条，组件只叠加交互热区。
 * 版式与 AE2 1.12 `GuiInscriber` 一致（ySize 176、xSize 211 + 升级条）。
 */
export function Ae2InscriberScreen({
  bottomPlate,
  className,
  hotbarItems,
  input,
  mainItems,
  onTakeOutput,
  onUpgradeSlotClick,
  output,
  progress = 0,
  selectedIndex,
  title = "压印器",
  topPlate,
  upgrades,
}: Ae2InscriberScreenProps) {
  const { height, inventory, panel, progress: bar, slots, upgrades: strip, width } = AE2_INSCRIBER;
  const upgradeSlots = padSlots(upgrades ?? [], strip.slots);
  const upgradeTops = Array.from(
    { length: strip.slots },
    (_, index) => strip.slotTop + index * strip.slotSize,
  );

  return (
    <div className={cn("relative inline-block", className)}>
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={panel.height}
          left={panel.x}
          sprite={ae2SpriteMeta[AE2_INSCRIBER.sprite]}
          src={panel}
          top={panel.y}
        />
        <ModSprite
          height={strip.height}
          left={strip.left}
          sprite={ae2SpriteMeta[AE2_INSCRIBER.sprite]}
          src={{ height: strip.height, width: strip.width, x: strip.left, y: strip.top }}
          top={strip.top}
        />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ScreenItemSlot
          frame={false}
          item={topPlate}
          label="inscriber-top"
          left={slots.top.left}
          size={slots.top.size}
          top={slots.top.top}
        />
        <ScreenItemSlot
          frame={false}
          item={input}
          label="inscriber-input"
          left={slots.input.left}
          size={slots.input.size}
          top={slots.input.top}
        />
        <ScreenItemSlot
          frame={false}
          item={bottomPlate}
          label="inscriber-bottom"
          left={slots.bottom.left}
          size={slots.bottom.size}
          top={slots.bottom.top}
        />
        <ScreenItemSlot
          frame={false}
          item={output}
          label="inscriber-output"
          left={slots.output.left}
          onActivate={onTakeOutput}
          size={slots.output.size}
          top={slots.output.top}
        />
        <ModProgress
          direction="up"
          fill={(
            <ModSprite
              height={bar.fill.height}
              sprite={ae2SpriteMeta[AE2_INSCRIBER.sprite]}
              src={bar.fill}
              width={bar.fill.width}
            />
          )}
          height={bar.height}
          label="压印进度"
          left={bar.left}
          progress={progress}
          top={bar.top}
          width={bar.width}
        />
        {upgradeTops.map((top, index) => (
          <ScreenItemSlot
            frame={false}
            item={upgradeSlots[index]}
            key={top}
            label={`inscriber-upgrade-${index}`}
            left={strip.slotLeft}
            onActivate={onUpgradeSlotClick
              ? () => onUpgradeSlotClick(index, upgradeSlots[index])
              : undefined}
            size={strip.slotSize}
            top={top}
          />
        ))}
        <ModTitle left={8} top={inventory.titleTop}>物品栏</ModTitle>
        <PlayerInventory
          bare
          hotbarItems={hotbarItems}
          hotbarY={inventory.hotbarTop}
          mainItems={mainItems}
          selectedIndex={selectedIndex}
          x={7}
          y={inventory.mainTop}
        />
      </ScreenPanel>
    </div>
  );
}
