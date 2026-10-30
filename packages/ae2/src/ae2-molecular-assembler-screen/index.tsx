import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModProgress, ModSlotGrid, ModSprite, ModTitle, ModToolbar } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_ICONS, AE2_MAC } from "../ae2-layout";

export interface Ae2MolecularAssemblerScreenProps {
  className?: string;
  craftGrid?: ScreenSlot[];
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  onCraftGridClick?: (index: number, item?: ScreenSlot) => void;
  onPatternClick?: (item: ScreenSlot) => void;
  onTakeOutput?: () => void;
  onUpgradeSlotClick?: (index: number, item?: ScreenSlot) => void;
  output?: ScreenSlot;
  pattern?: ScreenSlot;
  /**
  * 装配进度 0..1
  */
  progress?: number;
  selectedIndex?: number;
  title?: ReactNode;
  upgrades?: ScreenSlot[];
}

/**
 * 分子装配室界面（AE2 视觉复刻）：211×197 面板 + 右侧 35 宽升级槽条
 * （5 槽），槽框与玩家背包全部来自 AE2 `mac.png`；组件只叠加交互热区。
 * 版式与 AE2 1.12 `GuiMAC` 一致：3×3 装配格 (29,30)、图样槽 (126,16)、
 * 输出槽 (126,48)、竖直进度条 (148,48) 6×18（填充 src (148,201)）；
 * 红石模式按钮悬在面板左侧外（guiLeft−18）。
 */
export function Ae2MolecularAssemblerScreen({
  className,
  craftGrid,
  hotbarItems,
  mainItems,
  onCraftGridClick,
  onPatternClick,
  onTakeOutput,
  onUpgradeSlotClick,
  output,
  pattern,
  progress = 0,
  selectedIndex,
  title = "分子装配室",
  upgrades,
}: Ae2MolecularAssemblerScreenProps) {
  const {
    craftGrid: grid,
    height,
    output: outputSlot,
    panel,
    pattern: patternSlot,
    player,
    progress: bar,
    sprite,
    upgrades: strip,
    width,
  } = AE2_MAC;
  const upgradeSlots = Array.from({ length: strip.count }, (_, index) => upgrades?.[index]);

  return (
    <div className={cn("relative inline-block", className)} style={{ paddingLeft: gui(19), paddingTop: gui(6) }}>
      <ModToolbar
        items={[
          {
            icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />,
            label: "红石模式",
          },
        ]}
        left={0}
        top={8}
      />
      <ScreenPanel backgroundClassName="bg-transparent" height={height} width={width}>
        <ModSprite
          height={panel.height}
          left={0}
          sprite={ae2SpriteMeta[sprite]}
          src={{ height: panel.height, width: panel.width, x: panel.x, y: panel.y }}
          top={panel.y}
        />
        <ModTitle left={8} top={6}>{title}</ModTitle>
        <ModSlotGrid
          cellSize={grid.size}
          columns={3}
          frame={false}
          items={craftGrid}
          label={index => `mac-craft-${index}`}
          left={grid.left}
          onSlotClick={onCraftGridClick}
          rows={3}
          top={grid.top}
        />
        <ScreenItemSlot
          frame={false}
          item={pattern}
          label="mac-pattern"
          left={patternSlot.left}
          onActivate={onPatternClick ? () => onPatternClick(pattern) : undefined}
          size={patternSlot.size}
          top={patternSlot.top}
        />
        <ScreenItemSlot
          frame={false}
          item={output}
          label="mac-output"
          left={outputSlot.left}
          onActivate={onTakeOutput}
          size={outputSlot.size}
          top={outputSlot.top}
        />
        <ModProgress
          direction={bar.direction}
          fill={(
            <ModSprite
              height={bar.fill.height}
              sprite={ae2SpriteMeta[sprite]}
              src={bar.fill}
              width={bar.fill.width}
            />
          )}
          height={bar.height}
          label="装配进度"
          left={bar.left}
          progress={progress}
          top={bar.top}
          width={bar.width}
        />
        {Array.from(upgradeSlots, (item, index) => (
          // react-doctor-disable-next-line react-doctor/no-array-index-as-key —— 位置固定槽位网格，index 即稳定身份
          <ScreenItemSlot
            frame={false}
            item={item}
            key={`mac-upgrade-${index}`}
            label={`mac-upgrade-${index}`}
            left={strip.left}
            onActivate={onUpgradeSlotClick
              ? () => onUpgradeSlotClick(index, item)
              : undefined}
            size={strip.size}
            top={strip.slotTop + index * strip.size}
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
