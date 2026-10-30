import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSprite, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_QNB } from "../ae2-layout";

export interface Ae2QuantumBridgeScreenProps {
  card?: ScreenSlot;
  /**
  * 量子卡槽是否可用（放入奇点后启用，`ContainerQNB.isSlotEnabled`）
  */
  cardEnabled?: boolean;
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onSingularityClick?: (item?: ScreenSlot) => void;
  selectedIndex?: number;
  singularity?: ScreenSlot;
  title?: ReactNode;
}

/**
 * 量子链接仓界面（AE2 视觉复刻）：176×166 面板，槽框与玩家背包全部来自
 * AE2 `qbgui.png`；组件只叠加奇点槽 (80,37) 与量子卡槽 (80,55) 的交互热区。
 * 版式与 AE2 1.12 `GuiQNB` 一致（ySize 166）。
 */
export function Ae2QuantumBridgeScreen({
  card,
  cardEnabled = true,
  className,
  hotbarItems,
  mainItems,
  onSingularityClick,
  selectedIndex,
  singularity,
  title = "量子链接仓",
}: Ae2QuantumBridgeScreenProps) {
  const { card: cardSlot, height, player, singularity: singularitySlot, sprite, width } = AE2_QNB;

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
        <ScreenItemSlot
          frame={false}
          item={singularity}
          label="qnb-singularity"
          left={singularitySlot.left}
          onActivate={onSingularityClick
            ? () => onSingularityClick(singularity)
            : undefined}
          size={singularitySlot.size}
          top={singularitySlot.top}
        />
        {cardEnabled
          ? (
              <ScreenItemSlot
                frame={false}
                item={card}
                label="qnb-card"
                left={cardSlot.left}
                size={cardSlot.size}
                top={cardSlot.top}
              />
            )
          : null}
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
