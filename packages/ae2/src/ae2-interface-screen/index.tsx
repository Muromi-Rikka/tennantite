import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSlotGrid, ModSprite, ModTitle, ModToolbar } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_ICONS, AE2_INTERFACE } from "../ae2-layout";
import { Ae2PriorityTab } from "../ae2-priority-tab/index";

export interface Ae2InterfaceScreenProps {
  className?: string;
  config?: ScreenSlot[];
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onConfigSlotClick?: (index: number, item?: ScreenSlot) => void;
  onPatternSlotClick?: (index: number, item?: ScreenSlot) => void;
  onPriority?: () => void;
  onStorageSlotClick?: (index: number, item?: ScreenSlot) => void;
  onUpgradeSlotClick?: (index: number, item?: ScreenSlot) => void;
  /**
  * 图样行数（样板扩展升级：0..2 → 2 行；3..4 → 4 行，默认 4）
  */
  patternRows?: 2 | 4;
  patterns?: ScreenSlot[];
  selectedIndex?: number;
  storage?: ScreenSlot[];
  title?: ReactNode;
  upgrades?: ScreenSlot[];
}

/**
 * 接口界面（AE2 视觉复刻）：211×256 面板 + 右侧 35 宽升级槽条（4 槽），
 * 槽框与玩家背包全部来自 AE2 `interface.png`；组件只叠加交互热区。
 * 版式与 AE2 1.12 `GuiInterface` 一致：配置槽 9 格 (8,35)、存储槽 9 格
 * (8,53)、图样槽 4 行 ×9 (8,97)（后两行随样板扩展升级显示）、右上优先级
 * 标签 (154,0)，行标题 Config/StoredItems/Patterns 按 `GuiInterface.drawFG`。
 */
export function Ae2InterfaceScreen({
  className,
  config,
  hotbarItems,
  mainItems,
  onConfigSlotClick,
  onPatternSlotClick,
  onPriority,
  onStorageSlotClick,
  onUpgradeSlotClick,
  patternRows = 4,
  patterns,
  selectedIndex,
  storage,
  title = "接口",
  upgrades,
}: Ae2InterfaceScreenProps) {
  const {
    config: configRow,
    height,
    labels,
    patterns: patternGrid,
    player,
    priority,
    sprite,
    storage: storageRow,
    upgrades: strip,
    width,
  } = AE2_INTERFACE;
  const upgradeSlots = Array.from({ length: strip.count }, (_, index) => upgrades?.[index]);

  return (
    <div className={cn("relative inline-block", className)} style={{ paddingLeft: gui(19), paddingTop: gui(6) }}>
      <ModToolbar
        items={[
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />, label: "阻挡模式" },
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />, label: "合成锁定" },
          { icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.view} />, label: "接口终端" },
        ]}
        left={0}
        top={8}
      />
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={height}
          left={0}
          sprite={ae2SpriteMeta[sprite]}
          src={{ height, width, x: 0, y: 0 }}
          top={0}
        />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ModTitle left={labels.config.left} top={labels.config.top}>配置</ModTitle>
        <ModTitle left={labels.storage.left} top={labels.storage.top}>存储物品</ModTitle>
        <ModTitle left={labels.patterns.left} top={labels.patterns.top}>图样</ModTitle>
        <ModSlotGrid
          cellSize={configRow.size}
          columns={configRow.columns}
          frame={false}
          items={config}
          label={index => `interface-config-${index}`}
          left={configRow.left}
          onSlotClick={onConfigSlotClick}
          rows={1}
          top={configRow.top}
        />
        <ModSlotGrid
          cellSize={storageRow.size}
          columns={storageRow.columns}
          frame={false}
          items={storage}
          label={index => `interface-storage-${index}`}
          left={storageRow.left}
          onSlotClick={onStorageSlotClick}
          rows={1}
          top={storageRow.top}
        />
        <ModSlotGrid
          cellSize={patternGrid.size}
          columns={patternGrid.columns}
          frame={false}
          items={patterns}
          label={index => `interface-pattern-${index}`}
          left={patternGrid.left}
          onSlotClick={onPatternSlotClick}
          rows={patternRows}
          top={patternGrid.top}
        />
        {Array.from(upgradeSlots, (item, index) => (
          // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
          <ScreenItemSlot
            frame={false}
            item={item}
            key={`interface-upgrade-${index}`}
            label={`interface-upgrade-${index}`}
            left={strip.left}
            onActivate={onUpgradeSlotClick
              ? () => onUpgradeSlotClick(index, item)
              : undefined}
            size={strip.size}
            top={strip.slotTop + index * strip.size}
          />
        ))}
        <Ae2PriorityTab left={priority.left} onClick={onPriority} top={priority.top} />
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
