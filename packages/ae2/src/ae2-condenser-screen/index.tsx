import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModProgress, ModSprite, ModTabButton, ModTitle } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_CONDENSER, AE2_ICONS } from "../ae2-layout";

export interface Ae2CondenserScreenProps {
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  mainItems?: PlayerInventoryProps["mainItems"];
  /**
  * 输出模式文案（垃圾 / 能量球 / 能量细胞）
  */
  modeLabel?: string;
  /**
  * 输出模式（贴图按钮为纯展示热区）
  */
  onModeClick?: () => void;
  onTakeOutput?: () => void;
  onTrashClick?: (item?: ScreenSlot) => void;
  output?: ScreenSlot;
  /**
  * 储能进度 0..1（已存电力 / 所需电力）
  */
  progress?: number;
  selectedIndex?: number;
  storageCell?: ScreenSlot;
  title?: ReactNode;
  trash?: ScreenSlot;
}

/**
 * 物质冷凝器界面（AE2 视觉复刻）：176×197 面板，槽框、进度轨与玩家背包
 * 全部来自 AE2 `condenser.png`；组件只叠加交互热区。
 * 版式与 AE2 1.12 `GuiCondenser` 一致（ySize 197）。
 */
export function Ae2CondenserScreen({
  className,
  hotbarItems,
  mainItems,
  modeLabel = "垃圾",
  onModeClick,
  onTakeOutput,
  onTrashClick,
  output,
  progress = 0,
  selectedIndex,
  storageCell,
  title = "物质冷凝器",
  trash,
}: Ae2CondenserScreenProps) {
  const { height, modeButton, output: outputSlot, player, progress: bar, sprite, storageCell: cellSlot, trash: trashSlot, width } = AE2_CONDENSER;

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
          item={trash}
          label="condenser-trash"
          left={trashSlot.left}
          onActivate={onTrashClick ? () => onTrashClick(trash) : undefined}
          size={trashSlot.size}
          top={trashSlot.top}
        />
        <ScreenItemSlot
          frame={false}
          item={output}
          label="condenser-output"
          left={outputSlot.left}
          onActivate={onTakeOutput}
          size={outputSlot.size}
          top={outputSlot.top}
        />
        <ScreenItemSlot
          frame={false}
          item={storageCell}
          label="condenser-storage-cell"
          left={cellSlot.left}
          size={cellSlot.size}
          top={cellSlot.top}
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
          label="储能进度"
          left={bar.left}
          progress={progress}
          top={bar.top}
          width={bar.width}
        />
        <ModTabButton
          icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />}
          label={`输出模式：${modeLabel}`}
          left={modeButton.left - 1}
          onClick={onModeClick}
          top={modeButton.top - 1}
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
