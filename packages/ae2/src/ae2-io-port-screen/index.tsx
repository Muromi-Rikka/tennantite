import type { PlayerInventoryProps, ScreenSlot } from "@tennantite/ui";
import type { ReactNode } from "react";
import { ModSprite, ModTabButton, ModTitle, ModToolbar } from "@tennantite/mods-core";
import { ae2SpriteMeta } from "@tennantite/textures";
import { cn, gui, PlayerInventory, ScreenItemSlot, ScreenPanel } from "@tennantite/ui";
import { AE2_ICONS, AE2_IO_PORT } from "../ae2-layout";

export interface Ae2IoPortScreenProps {
  className?: string;
  hotbarItems?: PlayerInventoryProps["hotbarItems"];
  inputCells?: ScreenSlot[];
  mainItems?: PlayerInventoryProps["mainItems"];
  onFullnessModeClick?: () => void;
  onInputCellClick?: (index: number, item?: ScreenSlot) => void;
  onOperationModeClick?: () => void;
  onOutputCellClick?: (index: number, item?: ScreenSlot) => void;
  onRedstoneModeClick?: () => void;
  onUpgradeSlotClick?: (index: number, item?: ScreenSlot) => void;
  outputCells?: ScreenSlot[];
  selectedIndex?: number;
  title?: ReactNode;
  upgrades?: ScreenSlot[];
}

const CELL_SLOTS = 6;

/**
 * IO 端口界面（AE2 视觉复刻）：211×166 面板 + 右侧 35 宽升级槽条（3 槽），
 * 槽框与玩家背包全部来自 AE2 `io_port.png`；组件只叠加交互热区。
 * 版式与 AE2 1.12 `GuiIOPort` 一致：输入元件 2×3 (19,17)、输出元件 2×3
 * (122,17)、面板内操作模式按钮 (80,17)；红石/满度按钮悬在面板左侧外
 * (guiLeft−18)，以工具栏形式呈现。
 */
export function Ae2IoPortScreen({
  className,
  hotbarItems,
  inputCells,
  mainItems,
  onFullnessModeClick,
  onInputCellClick,
  onOperationModeClick,
  onOutputCellClick,
  onRedstoneModeClick,
  onUpgradeSlotClick,
  outputCells,
  selectedIndex,
  title = "IO 端口",
  upgrades,
}: Ae2IoPortScreenProps) {
  const {
    height,
    inputCells: inputRow,
    operationMode,
    outputCells: outputRow,
    player,
    sprite,
    toolbar,
    upgrades: strip,
    width,
  } = AE2_IO_PORT;
  const upgradeSlots = Array.from({ length: strip.count }, (_, index) => upgrades?.[index]);

  return (
    <div className={cn("relative inline-block", className)} style={{ paddingLeft: gui(19), paddingTop: gui(6) }}>
      <ModToolbar
        items={[
          {
            icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />,
            label: "满度模式",
            onClick: onFullnessModeClick,
          },
          {
            icon: <ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />,
            label: "红石模式",
            onClick: onRedstoneModeClick,
          },
        ]}
        left={0}
        top={toolbar.tops[0]}
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
        {Array.from({ length: CELL_SLOTS }, (_, index) => {
          const column = index % inputRow.columns;
          const row = Math.floor(index / inputRow.columns);
          return (
            <ScreenItemSlot
              frame={false}
              item={inputCells?.[index]}
              key={`in-${index}`}
              label={`io-port-input-${index}`}
              left={inputRow.left + column * inputRow.size}
              onActivate={onInputCellClick
                ? () => onInputCellClick(index, inputCells?.[index])
                : undefined}
              size={inputRow.size}
              top={inputRow.top + row * inputRow.size}
            />
          );
        })}
        {Array.from({ length: CELL_SLOTS }, (_, index) => {
          const column = index % outputRow.columns;
          const row = Math.floor(index / outputRow.columns);
          return (
            <ScreenItemSlot
              frame={false}
              item={outputCells?.[index]}
              key={`out-${index}`}
              label={`io-port-output-${index}`}
              left={outputRow.left + column * outputRow.size}
              onActivate={onOutputCellClick
                ? () => onOutputCellClick(index, outputCells?.[index])
                : undefined}
              size={outputRow.size}
              top={outputRow.top + row * outputRow.size}
            />
          );
        })}
        <ModTabButton
          icon={<ModSprite sprite={ae2SpriteMeta.states} src={AE2_ICONS.settings} />}
          label="操作模式"
          left={operationMode.left - 1}
          onClick={onOperationModeClick}
          top={operationMode.top - 1}
        />
        {Array.from(upgradeSlots, (item, index) => (
          <ScreenItemSlot
            frame={false}
            item={item}
            key={`io-port-upgrade-${index}`}
            label={`io-port-upgrade-${index}`}
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
