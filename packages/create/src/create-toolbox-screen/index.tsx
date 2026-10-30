import type { InventoryItem, ScreenSlot } from "@tennantite/ui";

import { ModIconButton, ModSprite } from "@tennantite/mods-core";
import { createSpriteMeta } from "@tennantite/textures";
import { cn, gui, ScreenItemSlot } from "@tennantite/ui";

import {
  CREATE_ATLAS,
  CREATE_ICONS,
  CREATE_TOOLBOX,
  CREATE_TOOLBOX_COLORS,
} from "../create-metrics";
import { CreateWindow } from "../create-window/index";

export type CreateToolboxColor = (typeof CREATE_TOOLBOX_COLORS)[number] | string;

export interface CreateToolboxScreenProps {
  className?: string;
  /**
   * 8 个隔层代表槽（每隔层实际 4 格，其余由上游隐藏，这里只渲染代表槽）
   */
  items?: ScreenSlot[];
  onColorChange?: (color: string, index: number) => void;
  onConfirm?: () => void;
  onDispose?: () => void;
  onSlotClick?: (compartment: number, item?: ScreenSlot) => void;
  player?: {
    hotbarItems?: (InventoryItem | null | undefined)[];
    mainItems?: (InventoryItem | null | undefined)[];
  };
  /**
   * 选中染料色（原版十六进制色）
   */
  selectedColor?: string;
  title?: string;
}

/**
 * Create 工具箱界面（`ToolboxScreen` 视觉复刻）：218×255 窗口（深灰底 +
 * TOOLBOX 188×171 背板在 +30 处）、顶部 8 色染料配色条（上游为
 * RadialToolboxMenu 转盘，此处按行摆放）、8 个隔层代表槽、确认/清空
 * 图标按钮与玩家背包。数据注入、无收纳逻辑。
 */
export function CreateToolboxScreen({
  className,
  items,
  onColorChange,
  onConfirm,
  onDispose,
  onSlotClick,
  player,
  selectedColor,
  title = "工具箱",
}: CreateToolboxScreenProps) {
  const toolbox = CREATE_ATLAS.toolbox;
  const colorBar = CREATE_TOOLBOX.colorBar;
  return (
    <CreateWindow
      background={(
        <ModSprite
          left={CREATE_TOOLBOX.background.left}
          sprite={createSpriteMeta[toolbox.atlas]}
          src={toolbox}
          top={CREATE_TOOLBOX.background.top}
        />
      )}
      className={className}
      height={CREATE_TOOLBOX.height}
      player={{
        hotbarItems: player?.hotbarItems,
        hotbarY: CREATE_TOOLBOX.player.hotbarY,
        mainItems: player?.mainItems,
        x: CREATE_TOOLBOX.player.x,
        y: CREATE_TOOLBOX.player.y,
      }}
      title={title}
      titleClassName="mc-text-shadow"
      titleColor="#592424"
      titleLeft={CREATE_TOOLBOX.title.left}
      titleTop={CREATE_TOOLBOX.title.top}
      width={CREATE_TOOLBOX.width}
    >
      {CREATE_TOOLBOX_COLORS.map((color, index) => (
        <button
          aria-label={`染料色 ${index}`}
          aria-pressed={selectedColor === color}
          className={cn(
            "absolute cursor-pointer border-0 p-0",
            selectedColor === color && "mc-slot-selected",
          )}
          key={color}
          onClick={onColorChange ? () => onColorChange(color, index) : undefined}
          style={{
            backgroundColor: color,
            height: gui(colorBar.size),
            imageRendering: "pixelated",
            left: gui(colorBar.left + index * colorBar.step),
            top: gui(colorBar.top),
            width: gui(colorBar.size),
          }}
          type="button"
        />
      ))}
      {CREATE_TOOLBOX.compartments.map((compartment, index) => (
        <ScreenItemSlot
          item={items?.[index]}
          key={`${compartment.left}-${compartment.top}`}
          label={`toolbox-${index}`}
          left={compartment.left}
          onActivate={onSlotClick ? () => onSlotClick(index, items?.[index]) : undefined}
          top={compartment.top}
        />
      ))}
      <ModIconButton
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: CREATE_ICONS.confirm.x, y: CREATE_ICONS.confirm.y }}
          />
        )}
        label="关闭"
        left={CREATE_TOOLBOX.buttons.confirm.left}
        onClick={onConfirm}
        top={CREATE_TOOLBOX.buttons.confirm.top}
        width={18}
      />
      <ModIconButton
        height={18}
        icon={(
          <ModSprite
            sprite={createSpriteMeta.icons}
            src={{ height: 16, width: 16, x: CREATE_ICONS.toolbox.x, y: CREATE_ICONS.toolbox.y }}
          />
        )}
        label="倒入全部"
        left={CREATE_TOOLBOX.buttons.dispose.left}
        onClick={onDispose}
        top={CREATE_TOOLBOX.buttons.dispose.top}
        width={18}
      />
    </CreateWindow>
  );
}
